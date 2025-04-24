from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user
import bcrypt
import jwt
import datetime
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()


app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv(SecretKey)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
login_manager = LoginManager(app)
CORS(app)  # Enable CORS to allow requests from React frontend

# old without paying
# client = OpenAI(api_key='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')

client = OpenAI(api_key=os.getenv(OpenAikey))

# User Model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)


# SIGNUP endpoint
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        full_name = data.get('full_name')
        email = data.get('email')
        password = data.get('password')

        # Validate input fields
        if not full_name or not email or not password:
            return jsonify({'error': 'All fields are required'}), 400

        # Check if email already exists
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 400

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Add the new user to the database
        new_user = User(full_name=full_name, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201

    except Exception as e:
        # Log the error and return a generic message
        print(f"Error in /signup: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# Login endpoint


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        # Generate JWT token
        payload = {
            'user_id': user.id,
            'email': user.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expiration time
        }
        token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({'message': 'Login successful', 'token': token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


# Image Generation endpoint
# OpenAI configuration
@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get('prompt')

    if not prompt or len(prompt) < 10:
        return jsonify({'error': 'Prompt must be at least 10 characters long'}), 400

    try:
        # Generate the image using OpenAI's API

        response = client.images.generate(
            model="dall-e-3",  # Use the DALL-E 3 model
            prompt=prompt,  # The prompt passed from the user
            size="1024x1024",  # Image size
            quality="standard",  # Quality (optional)
            n=1,  # Number of images
        )




        # Extract the URL of the generated image

        # image_urls = response.data[0].url

        # Extract the URLs of the generated images
        image_urls = [image.url for image in response.data]

        # image_urls = ['https://cdn.pixabay.com/photo/2024/05/30/05/54/nature-8797824_960_720.png']
        print(image_urls)

        # Return the image URL to the frontend

        return jsonify({'image_urls': image_urls}), 200
      

    except Exception as e:
        print(f"Error during image generation: {str(e)}")
        return jsonify({'error': 'Failed to generate image', 'details': str(e)}), 500


# @app.route('/list-models', methods=['GET'])
# def list_models():
    try:
        # Correct method call based on API documentation
        response = client.list_models()
        
        # Assuming the response contains a list of models
        models = [model.name for model in response.models]
        return jsonify({'models': models}), 200
    except AttributeError as e:
        print(f"AttributeError: {e}")
        return jsonify({'error': 'Failed to list models', 'details': 'Invalid method or configuration'}), 500
    except Exception as e:
        print(f"Error listing models: {e}")
        return jsonify({'error': 'Failed to list models', 'details': str(e)}), 500

if __name__ == '__main__':
    # Create database tables
    with app.app_context():
        db.create_all()
    app.run(debug=True)


