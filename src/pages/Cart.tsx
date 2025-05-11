
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ChevronLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          {cart.items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="flex justify-center mb-6">
                <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-medium mb-4">Your cart is empty</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild className="animated-button">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 hidden md:grid grid-cols-8 gap-4">
                    <div className="col-span-4">Product</div>
                    <div className="col-span-1 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-1 text-right">Total</div>
                  </div>

                  <div className="divide-y">
                    {cart.items.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-4 grid grid-cols-1 md:grid-cols-8 gap-4 items-center"
                      >
                        {/* Product */}
                        <div className="col-span-1 md:col-span-4 flex items-center space-x-4">
                          <Link to={`/product/${item.product.slug}`}>
                            <img
                              src={item.product.images[0].url}
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          </Link>
                          <div>
                            <Link
                              to={`/product/${item.product.slug}`}
                              className="font-medium hover:text-bikeRed transition-colors"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.product.brand.name}
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="md:col-span-1 md:text-center">
                          <div className="flex justify-between md:block">
                            <span className="md:hidden">Price:</span>
                            <span className="font-medium">
                              {formatPrice(
                                item.product.salePrice || item.product.price
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-2 md:text-center">
                          <div className="flex justify-between md:justify-center items-center">
                            <span className="md:hidden">Quantity:</span>
                            <div className="flex border border-gray-200 dark:border-gray-700 rounded-md">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.product.id,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                                className="px-2 py-1 border-r border-gray-200 dark:border-gray-700"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleUpdateQuantity(
                                    item.product.id,
                                    Math.max(1, parseInt(e.target.value) || 1)
                                  )
                                }
                                className="w-12 text-center bg-transparent"
                              />
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.product.id,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 py-1 border-l border-gray-200 dark:border-gray-700"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="md:col-span-1 md:text-right">
                          <div className="flex justify-between md:block">
                            <span className="md:hidden">Total:</span>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {formatPrice(
                                  (item.product.salePrice || item.product.price) *
                                    item.quantity
                                )}
                              </span>
                              <button
                                onClick={() => handleRemoveItem(item.product.id)}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <Button
                    variant="outline"
                    asChild
                    className="hover:bg-transparent"
                  >
                    <Link to="/products" className="flex items-center">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={handleClearCart}
                    className="flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium">{formatPrice(cart.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax (18% GST)</span>
                      <span className="font-medium">{formatPrice(cart.totalAmount * 0.18)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-bikeRed">{formatPrice(cart.totalAmount * 1.18)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 animated-button"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>

                  <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">We accept:</p>
                    <div className="flex space-x-2">
                      <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
