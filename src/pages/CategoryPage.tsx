
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory, categories } from "@/lib/data";
import { ChevronRight } from "lucide-react";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  
  const category = categories.find(cat => cat.slug === slug);
  const products = slug ? getProductsByCategory(category?.id || "") : [];
  
  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [slug]);

  if (!category) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
            <p className="mb-6">The category you're looking for doesn't exist.</p>
            <Link to="/products" className="text-bikeRed hover:underline">
              Browse All Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Banner */}
          <div className="relative h-64 md:h-80 mb-12 rounded-lg overflow-hidden bg-gradient-to-r from-bikeBlack to-gray-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {category.name}
                </h1>
                <div className="flex items-center justify-center text-sm">
                  <Link to="/" className="hover:text-bikeRed transition-colors">
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <Link to="/products" className="hover:text-bikeRed transition-colors">
                    Products
                  </Link>
                  <ChevronRight className="h-4 w-4 mx-2" />
                  <span>{category.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products List */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800 animate-pulse mb-2"></div>
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 animate-pulse mb-4"></div>
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-xl font-medium mb-4">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                There are no products available in this category at the moment.
              </p>
              <Link
                to="/products"
                className="text-bikeRed hover:underline"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
