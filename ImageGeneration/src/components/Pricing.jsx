import React from "react";

const PricingPage = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "$5",
      features: ["Generate 10 images", "Standard quality", "Email support"],
      button: "Get Started",
    },
    {
      title: "Pro Plan",
      price: "$15",
      features: ["Generate 50 images", "High quality", "Priority support"],
      button: "Get Started",
    },
    {
      title: "Enterprise Plan",
      price: "$50",
      features: [
        "Generate unlimited images",
        "Premium quality",
        "Dedicated support",
      ],
      button: "Get Started",
    },
  ];

  return (
    <div
      className="min-h-[88vh] text-white overflow-hidden pt-[100px]" // Add padding-top to account for the header
      style={{
        backgroundImage: "linear-gradient(60deg, #008EA4, black)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Choose Your Plan
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800">{plan.title}</h2>
              <p className="text-4xl font-bold text-blue-500 my-4">
                {plan.price}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300">
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
