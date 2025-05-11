
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product.slug}`}>
      <div className="bike-card group h-full flex flex-col">
        <div className="bike-card-image">
          <img
            src={product.images[0].url}
            alt={product.images[0].alt}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          {product.onSale && (
            <span className="bike-badge">Sale</span>
          )}
          {product.new && (
            <span className="bike-badge bg-green-500">New</span>
          )}
          {product.bestseller && (
            <span className="bike-badge bg-amber-500">Bestseller</span>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {product.brand.name}
            </span>
            <h3 className="font-semibold line-clamp-2 text-gray-800 dark:text-gray-100 group-hover:text-bikeRed transition-colors duration-200">
              {product.name}
            </h3>
          </div>
          <div className="mt-auto">
            <div className="flex items-baseline mb-2">
              {product.salePrice ? (
                <>
                  <span className="price-tag mr-2">{formatPrice(product.salePrice)}</span>
                  <span className="text-gray-400 line-through text-sm">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="price-tag">{formatPrice(product.price)}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
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
                <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">
                  ({product.rating})
                </span>
              </div>
              <Button
                size="icon"
                variant="outline"
                onClick={handleAddToCart}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
