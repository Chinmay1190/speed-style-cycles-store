
import { brands } from "@/lib/data";

export function BrandShowcase() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop By Brands</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We partner with the world's leading motorcycle manufacturers to bring you the best bikes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow duration-300"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
