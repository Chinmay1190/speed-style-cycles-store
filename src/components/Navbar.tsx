
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, User, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/lib/data";

export function Navbar() {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-md"
          : "bg-white/50 dark:bg-black/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold transition-transform hover:scale-105 text-bikeRed"
          >
            SpeedBikes
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-bikeRed transition-colors duration-200"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="hover:text-bikeRed transition-colors duration-200 flex items-center">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-bikeRed"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/products"
              className="hover:text-bikeRed transition-colors duration-200"
            >
              All Bikes
            </Link>
            <Link
              to="/deals"
              className="hover:text-bikeRed transition-colors duration-200"
            >
              Deals
            </Link>
            <Link
              to="/contact"
              className="hover:text-bikeRed transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {cart.totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 animate-bounce"
                >
                  {cart.totalItems}
                </Badge>
              )}
            </Link>

            <Button variant="ghost" size="icon" asChild>
              <Link to="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-bikeRed">Menu</h2>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    <Link
                      to="/"
                      className="py-2 border-b border-gray-200 dark:border-gray-700 hover:text-bikeRed transition-colors"
                    >
                      Home
                    </Link>
                    <div className="py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="mb-2 font-medium">Categories</h3>
                      <div className="pl-4 space-y-2">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/category/${category.slug}`}
                            className="block hover:text-bikeRed transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <Link
                      to="/products"
                      className="py-2 border-b border-gray-200 dark:border-gray-700 hover:text-bikeRed transition-colors"
                    >
                      All Bikes
                    </Link>
                    <Link
                      to="/deals"
                      className="py-2 border-b border-gray-200 dark:border-gray-700 hover:text-bikeRed transition-colors"
                    >
                      Deals
                    </Link>
                    <Link
                      to="/contact"
                      className="py-2 border-b border-gray-200 dark:border-gray-700 hover:text-bikeRed transition-colors"
                    >
                      Contact
                    </Link>
                    <Link
                      to="/account"
                      className="py-2 border-b border-gray-200 dark:border-gray-700 hover:text-bikeRed transition-colors"
                    >
                      My Account
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
