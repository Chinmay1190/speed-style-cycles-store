
import { Link } from "react-router-dom";
import { categories } from "@/lib/data";
import { ChevronRight } from "lucide-react";

export function CategoryShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find your perfect ride based on your preferences and riding style.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="relative group overflow-hidden rounded-lg"
            >
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <img
                  src="/placeholder.svg"
                  alt={category.name}
                  className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                <div className="p-4 w-full">
                  <h3 className="text-white font-medium text-lg">{category.name}</h3>
                  <p className="text-white/80 text-sm flex items-center mt-1 group-hover:text-bikeRed transition-colors">
                    Shop Now
                    <ChevronRight className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
