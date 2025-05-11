
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShippingInfo, PaymentMethod } from "@/lib/types";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "credit",
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = ["name", "email", "phone", "address", "city", "state", "postalCode"];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof ShippingInfo]);
    
    if (missingFields.length > 0) {
      toast({
        variant: "destructive",
        title: "Please fill in all required fields",
        description: `Missing: ${missingFields.join(", ")}`,
      });
      return;
    }
    
    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
      toast({
        variant: "destructive",
        title: "Invalid email address",
        description: "Please enter a valid email address.",
      });
      return;
    }
    
    // Simple phone validation for India (10 digits)
    if (!/^\d{10}$/.test(shippingInfo.phone)) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
      });
      return;
    }
    
    // Move to payment step
    setStep("payment");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { type } = paymentMethod;
    
    // Validate based on payment method
    if (type === "credit" || type === "debit") {
      const { cardNumber, nameOnCard, expiryDate, cvv } = paymentMethod;
      
      if (!cardNumber || !nameOnCard || !expiryDate || !cvv) {
        toast({
          variant: "destructive",
          title: "Please fill in all card details",
        });
        return;
      }
      
      // Basic card validation
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        toast({
          variant: "destructive",
          title: "Invalid card number",
          description: "Card number should be 16 digits.",
        });
        return;
      }
      
      if (!/^\d{3,4}$/.test(cvv)) {
        toast({
          variant: "destructive",
          title: "Invalid CVV",
          description: "CVV should be 3 or 4 digits.",
        });
        return;
      }
    } else if (type === "upi") {
      if (!paymentMethod.upiId) {
        toast({
          variant: "destructive",
          title: "Please enter UPI ID",
        });
        return;
      }
      
      // Basic UPI validation
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(paymentMethod.upiId)) {
        toast({
          variant: "destructive",
          title: "Invalid UPI ID",
          description: "Please enter a valid UPI ID (e.g., username@bankname).",
        });
        return;
      }
    }
    
    // Process payment
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Move to confirmation step
      setStep("confirmation");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };
  
  const handleOrderComplete = () => {
    // Clear the cart
    clearCart();
    
    // Navigate to success page
    navigate("/order-success");
  };

  if (cart.items.length === 0 && step !== "confirmation") {
    navigate("/cart");
    return null;
  }

  const renderShippingForm = () => (
    <form onSubmit={handleShippingSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={shippingInfo.name}
            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
            placeholder="john@example.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={shippingInfo.phone}
            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
            placeholder="10-digit phone number"
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            placeholder="Street address"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
            placeholder="City"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={shippingInfo.state}
            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
            placeholder="State"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={shippingInfo.postalCode}
            onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
            placeholder="Postal code"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={shippingInfo.country}
            onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
            placeholder="Country"
            disabled
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </Button>
        <Button type="submit" className="animated-button">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
  
  const renderPaymentForm = () => (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      <div>
        <Label className="mb-3 block">Select Payment Method</Label>
        <RadioGroup
          value={paymentMethod.type}
          onValueChange={(value) => setPaymentMethod({ ...paymentMethod, type: value as PaymentMethod["type"] })}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit" id="credit" />
            <Label htmlFor="credit">Credit Card</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="debit" id="debit" />
            <Label htmlFor="debit">Debit Card</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi">UPI</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod">Cash on Delivery</Label>
          </div>
        </RadioGroup>
      </div>
      
      {(paymentMethod.type === "credit" || paymentMethod.type === "debit") && (
        <div className="border p-4 rounded-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentMethod.cardNumber}
              onChange={(e) => setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input
              id="nameOnCard"
              placeholder="John Doe"
              value={paymentMethod.nameOnCard}
              onChange={(e) => setPaymentMethod({ ...paymentMethod, nameOnCard: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={paymentMethod.expiryDate}
                onChange={(e) => setPaymentMethod({ ...paymentMethod, expiryDate: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="password"
                placeholder="123"
                maxLength={4}
                value={paymentMethod.cvv}
                onChange={(e) => setPaymentMethod({ ...paymentMethod, cvv: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}
      
      {paymentMethod.type === "upi" && (
        <div className="border p-4 rounded-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              placeholder="username@bankname"
              value={paymentMethod.upiId}
              onChange={(e) => setPaymentMethod({ ...paymentMethod, upiId: e.target.value })}
            />
          </div>
        </div>
      )}
      
      {paymentMethod.type === "cod" && (
        <div className="border p-4 rounded-md">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Pay with cash upon delivery. Please note that a nominal convenience fee may apply.
          </p>
        </div>
      )}
      
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep("shipping")}
        >
          Back to Shipping
        </Button>
        <Button 
          type="submit" 
          className="animated-button"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Complete Order"}
        </Button>
      </div>
    </form>
  );
  
  const renderOrderConfirmation = () => (
    <div className="space-y-8 text-center">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Thank you for your order. We've sent the order confirmation to {shippingInfo.email}.
        </p>
      </div>
      
      <div className="border p-6 rounded-lg bg-gray-50 dark:bg-gray-800 text-left max-w-md mx-auto">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Order Number</span>
            <span className="font-medium">ORD-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Order Date</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Shipping Address</span>
            <span className="font-medium">
              {shippingInfo.address.substring(0, 15)}...
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
            <span className="font-medium">
              {paymentMethod.type === "credit" ? "Credit Card" :
               paymentMethod.type === "debit" ? "Debit Card" :
               paymentMethod.type === "upi" ? "UPI" : "Cash on Delivery"}
            </span>
          </div>
          
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
            <span className="font-bold">{formatPrice(cart.totalAmount * 1.18)}</span>
          </div>
        </div>
      </div>
      
      <Button onClick={handleOrderComplete} className="animated-button">
        Continue Shopping
      </Button>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {/* Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              <div className={`flex flex-col items-center ${step === "shipping" ? "text-bikeRed" : "text-gray-600 dark:text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === "shipping" ? "border-bikeRed" : "border-gray-300 dark:border-gray-600"}`}>
                  1
                </div>
                <span className="mt-2">Shipping</span>
              </div>
              
              <div className={`w-20 h-0.5 ${step !== "shipping" ? "bg-bikeRed" : "bg-gray-300 dark:bg-gray-600"}`}></div>
              
              <div className={`flex flex-col items-center ${step === "payment" ? "text-bikeRed" : step === "confirmation" ? "text-gray-600 dark:text-gray-400" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === "payment" ? "border-bikeRed" : step === "confirmation" ? "border-gray-300 dark:border-gray-600" : "border-gray-300 dark:border-gray-700"}`}>
                  2
                </div>
                <span className="mt-2">Payment</span>
              </div>
              
              <div className={`w-20 h-0.5 ${step === "confirmation" ? "bg-bikeRed" : "bg-gray-300 dark:bg-gray-600"}`}></div>
              
              <div className={`flex flex-col items-center ${step === "confirmation" ? "text-bikeRed" : "text-gray-400"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step === "confirmation" ? "border-bikeRed" : "border-gray-300 dark:border-gray-700"}`}>
                  3
                </div>
                <span className="mt-2">Confirmation</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={`lg:col-span-2 ${step === "confirmation" ? "lg:col-span-3" : ""}`}>
              {step === "shipping" && renderShippingForm()}
              {step === "payment" && renderPaymentForm()}
              {step === "confirmation" && renderOrderConfirmation()}
            </div>
            
            {step !== "confirmation" && (
              <div className="lg:col-span-1 h-fit">
                <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="max-h-60 overflow-y-auto mb-4">
                    {cart.items.map((item) => (
                      <div key={item.product.id} className="flex items-center py-2 border-b">
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4 flex-grow">
                          <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                          <div className="flex justify-between text-sm">
                            <span>Qty: {item.quantity}</span>
                            <span>
                              {formatPrice(
                                (item.product.salePrice || item.product.price) * item.quantity
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
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
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
