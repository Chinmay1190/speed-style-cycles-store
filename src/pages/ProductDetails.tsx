
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductBySlug, getProductsByCategory, formatPrice } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, ShoppingCart, Share2, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
            <Button onClick={() => navigate("/products")}>Browse Products</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = getProductsByCategory(product.category.id).filter(
    (p) => p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Product link copied to clipboard.",
    });
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-bikeRed">
              Home
            </Link>{" "}
            <span className="text-gray-400 mx-2">/</span>
            <Link
              to={`/category/${product.category.slug}`}
              className="text-gray-600 dark:text-gray-400 hover:text-bikeRed"
            >
              {product.category.name}
            </Link>{" "}
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-200">{product.name}</span>
          </div>

          {/* Product Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    className={`flex-shrink-0 border-2 rounded-md overflow-hidden w-20 h-20 ${
                      selectedImage === index
                        ? "border-bikeRed"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center">
                  <Link
                    to={`/brand/${product.brand.id}`}
                    className="text-sm text-bikeRed hover:underline"
                  >
                    {product.brand.name}
                  </Link>
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      Only {product.stock} left
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Out of Stock
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

                <div className="flex items-center mt-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < product.rating
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} out of 5
                  </span>
                </div>
              </div>

              <div className="border-t border-b py-4">
                <div className="flex items-end">
                  {product.salePrice ? (
                    <>
                      <span className="text-3xl font-bold text-bikeRed">
                        {formatPrice(product.salePrice)}
                      </span>
                      <span className="text-xl line-through text-gray-400 ml-3">
                        {formatPrice(product.price)}
                      </span>
                      <span className="ml-2 bg-bikeRed text-white text-sm px-2 py-0.5 rounded">
                        Save {Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-bikeRed">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="mr-4">Quantity:</span>
                  <div className="flex border border-gray-300 dark:border-gray-600 rounded">
                    <button
                      className="px-3 py-1 border-r border-gray-300 dark:border-gray-600"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={product.stock === 0}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="w-12 text-center bg-transparent"
                      disabled={product.stock === 0}
                    />
                    <button
                      className="px-3 py-1 border-l border-gray-300 dark:border-gray-600"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={product.stock === 0 || quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex-1 animated-button"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleWishlist}>
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="specs" className="mb-16">
            <TabsList className="mb-4">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b pb-2">
                    <span className="font-medium w-1/2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="w-1/2">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="features" className="border rounded-lg p-6">
              <ul className="list-disc pl-6 space-y-2">
                <li>Electronic Fuel Injection System</li>
                <li>Advanced ABS (Anti-lock Braking System)</li>
                <li>LED Lighting System for Better Visibility</li>
                <li>Digital Instrument Cluster with Navigation Support</li>
                <li>Dual-Channel ABS for Enhanced Safety</li>
                <li>Adjustable Suspension System for Optimal Riding Experience</li>
                <li>Bluetooth Connectivity for Smartphone Integration</li>
                <li>Multiple Riding Modes for Different Terrains</li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="border rounded-lg p-6">
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < product.rating
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-lg font-medium">{product.rating} out of 5</span>
                </div>

                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Rahul Sharma</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < 5 ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Absolutely love this bike! The power delivery is smooth, and it handles like a dream on the highways. The build quality is excellent too.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Priya Patel</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4 ? "text-yellow-400" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Great bike with excellent performance. The only issue I faced was with the seat comfort on long rides, but otherwise it's perfect.
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="w-full">Load More Reviews</Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetails;
