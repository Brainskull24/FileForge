import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pricingPlans } from "../../data/homeConfigs";

const PricingTeaser = () => {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular ? "border-blue-500 shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-gray-900">
                  {plan.price}
                  {plan.price !== "Custom" && (
                    <span className="text-lg text-gray-500">/month</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                {/* <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={()=>{

                  }}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : (plan.name === "Pro" ? "Get Started": "Current Plan")}
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              navigate("/pricing");
            }}
          >
            View Full Pricing Details
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
