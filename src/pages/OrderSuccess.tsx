
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const OrderSuccess = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  // If the cart is not empty, redirect to homepage
  // This prevents accessing the success page directly
  useEffect(() => {
    if (cart.items.length > 0) {
      navigate("/");
    }
  }, [cart.items.length, navigate]);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-8 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">Order Successful!</h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-400 animate-fade-in">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            
            <div className="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800 mb-8 text-left animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4">What happens next?</h2>
              
              <ol className="list-decimal list-inside space-y-4">
                <li>
                  <span className="font-medium">Order Confirmation Email:</span> You'll receive an email with your order details shortly.
                </li>
                <li>
                  <span className="font-medium">Order Processing:</span> Our team will process your order within 24 hours.
                </li>
                <li>
                  <span className="font-medium">Shipping Notification:</span> We'll send you another email once your order ships with tracking information.
                </li>
                <li>
                  <span className="font-medium">Delivery:</span> Your superbike will be delivered to your doorstep.
                </li>
              </ol>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="hover:bg-transparent">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button asChild className="animated-button">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderSuccess;
