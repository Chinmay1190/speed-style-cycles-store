
import { Shield, Zap, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All our motorcycles undergo rigorous quality checks and come with warranty."
  },
  {
    icon: Zap,
    title: "Superior Performance",
    description: "Experience unmatched speed, power and handling with our premium superbikes."
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Get your dream bike delivered quickly with our expedited shipping options."
  },
  {
    icon: Star,
    title: "Expert Support",
    description: "Our motorcycle experts are available to assist you with any queries or concerns."
  }
];

export function Features() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg text-center border border-gray-200 dark:border-gray-800 hover:border-bikeRed hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex justify-center">
                <feature.icon className="feature-icon h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
