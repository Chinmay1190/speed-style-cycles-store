
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, getNewArrivals, getBestsellers, getOnSaleProducts } from "@/lib/data";

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'bestseller' | 'sale'>('featured');
  
  const featuredProducts = getFeaturedProducts().slice(0, 8);
  const newProducts = getNewArrivals().slice(0, 8);
  const bestsellerProducts = getBestsellers().slice(0, 8);
  const saleProducts = getOnSaleProducts().slice(0, 8);
  
  const tabs = [
    { id: 'featured', label: 'Featured', products: featuredProducts },
    { id: 'new', label: 'New Arrivals', products: newProducts },
    { id: 'bestseller', label: 'Bestsellers', products: bestsellerProducts },
    { id: 'sale', label: 'On Sale', products: saleProducts },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Collection</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our carefully selected motorcycles for every riding style and preference.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-full m-1 transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-bikeRed text-white"
                  : "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tabs.find(tab => tab.id === activeTab)?.products.map((product) => (
            <div key={product.id} className="transition-all duration-500 animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
