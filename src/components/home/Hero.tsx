
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Experience Pure Power",
      subtitle: "Discover the thrill of riding with our premium superbikes",
      cta: "Shop Now",
      image: "/placeholder.svg",
      link: "/products",
    },
    {
      title: "Ultimate Performance",
      subtitle: "Feel the adrenaline with cutting-edge engineering and design",
      cta: "View Collection",
      image: "/placeholder.svg",
      link: "/category/sport-bikes",
    },
    {
      title: "Special Offers",
      subtitle: "Limited time deals on selected premium motorcycles",
      cta: "See Deals",
      image: "/placeholder.svg",
      link: "/deals",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden hero-gradient">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-6 text-gray-200 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {slide.subtitle}
              </p>
              <Button 
                size="lg" 
                asChild 
                className="animated-button" 
                style={{ animationDelay: "0.4s" }}
              >
                <Link to={slide.link}>
                  {slide.cta} 
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-w-full max-h-80 md:max-h-96 object-contain animate-float"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-bikeRed w-8"
                : "bg-gray-400 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
