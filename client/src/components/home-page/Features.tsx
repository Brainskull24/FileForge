import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { features } from "../../data/homeConfigs";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for file processing and encoding in one platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-blue-600">
                    <feature.icon />
                  </div>
                  {feature.badge && (
                    <Badge variant={feature.badge.variant} className="text-xs">
                      {feature.badge.text}
                    </Badge>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
