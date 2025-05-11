
import { Brand, Category, Product } from "./types";

export const brands: Brand[] = [
  {
    id: "1",
    name: "Yamaha",
    logo: "/placeholder.svg",
    description: "Revs your heart – Yamaha's motorcycle range combines cutting-edge technology with sleek design."
  },
  {
    id: "2",
    name: "Honda",
    logo: "/placeholder.svg",
    description: "Power of Dreams – Honda crafts motorcycles that combine reliability with innovative engineering."
  },
  {
    id: "3",
    name: "Kawasaki",
    logo: "/placeholder.svg",
    description: "Let the good times roll – Kawasaki's high-performance bikes deliver unmatched thrill and power."
  },
  {
    id: "4",
    name: "Suzuki",
    logo: "/placeholder.svg",
    description: "Way of Life – Suzuki motorcycles blend performance, style, and value in perfect harmony."
  },
  {
    id: "5",
    name: "Ducati",
    logo: "/placeholder.svg",
    description: "Borderless passion – Ducati produces racing-inspired motorcycles with Italian design excellence."
  },
  {
    id: "6",
    name: "Harley-Davidson",
    logo: "/placeholder.svg",
    description: "Freedom for the soul – Harley-Davidson creates iconic motorcycles for the ultimate riding experience."
  },
  {
    id: "7",
    name: "BMW",
    logo: "/placeholder.svg",
    description: "Make life a ride – BMW Motorrad represents premium quality and innovative technology."
  },
  {
    id: "8",
    name: "Triumph",
    logo: "/placeholder.svg",
    description: "For the ride – Triumph combines British heritage with modern engineering for exceptional motorcycles."
  },
  {
    id: "9",
    name: "KTM",
    logo: "/placeholder.svg",
    description: "Ready to race – KTM delivers high-performance motorcycles with aggressive styling and cutting-edge tech."
  },
  {
    id: "10",
    name: "TVS",
    logo: "/placeholder.svg",
    description: "Touching lives, delivering joy – TVS creates motorcycles that offer performance, quality, and value."
  }
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Sport Bikes",
    slug: "sport-bikes"
  },
  {
    id: "2",
    name: "Cruisers",
    slug: "cruisers"
  },
  {
    id: "3",
    name: "Adventure Bikes",
    slug: "adventure-bikes"
  },
  {
    id: "4",
    name: "Naked Bikes",
    slug: "naked-bikes"
  },
  {
    id: "5",
    name: "Touring Bikes",
    slug: "touring-bikes"
  },
  {
    id: "6",
    name: "Off-Road Bikes",
    slug: "off-road-bikes"
  },
  {
    id: "7",
    name: "Electric Bikes",
    slug: "electric-bikes"
  }
];

// Generate 70+ products
const createProducts = (): Product[] => {
  const products: Product[] = [];
  
  // Helper to get random number in range
  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // Helper to get random boolean with specified probability
  const getRandomBool = (probability = 0.5): boolean => {
    return Math.random() < probability;
  };
  
  // Helper to get random array item
  const getRandomItem = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  // Product name templates by category
  const productTemplates = {
    "1": [ // Sport Bikes
      "{brand} Fireblade {year}",
      "{brand} Ninja {year}",
      "{brand} GSX-R {series}",
      "{brand} YZF-R{series}",
      "{brand} Panigale V{series}",
      "{brand} CBR {series}RR",
    ],
    "2": [ // Cruisers
      "{brand} Road King {year}",
      "{brand} Shadow {series}",
      "{brand} Vulcan {series}",
      "{brand} Thunderbird {year}",
      "{brand} Fat Boy {year}",
      "{brand} Boulevard {series}",
    ],
    "3": [ // Adventure Bikes
      "{brand} GS {series}",
      "{brand} Africa Twin {year}",
      "{brand} Tiger {series}",
      "{brand} Himalayan {year}",
      "{brand} Adventure {series}",
      "{brand} Ténéré {series}",
    ],
    "4": [ // Naked Bikes
      "{brand} Z{series}",
      "{brand} Street Triple {series}",
      "{brand} MT-{series}",
      "{brand} Monster {series}",
      "{brand} Duke {series}",
      "{brand} CB{series}R",
    ],
    "5": [ // Touring Bikes
      "{brand} Gold Wing {year}",
      "{brand} Electra Glide {year}",
      "{brand} FJR{series}",
      "{brand} K {series} GT",
      "{brand} Multistrada {series}",
      "{brand} Versys {series}",
    ],
    "6": [ // Off-Road Bikes
      "{brand} CRF {series}",
      "{brand} KLX {series}",
      "{brand} EXC {series}",
      "{brand} WR {series}F",
      "{brand} DR-Z {series}",
      "{brand} RM-Z {series}",
    ],
    "7": [ // Electric Bikes
      "{brand} LiveWire {year}",
      "{brand} Zero SR {series}",
      "{brand} Energica Ego {year}",
      "{brand} Vector {year}",
      "{brand} EVision {series}",
      "{brand} Ultraviolette F{series}",
    ],
  };
  
  // Generate products
  for (let i = 1; i <= 72; i++) {
    // Pick random category and brand
    const category = getRandomItem(categories);
    const brand = getRandomItem(brands);
    
    // Generate name based on templates
    const templates = productTemplates[category.id as keyof typeof productTemplates];
    let name = getRandomItem(templates);
    
    // Replace placeholders in name
    name = name.replace("{brand}", brand.name);
    name = name.replace("{year}", (2020 + getRandomInt(0, 4)).toString());
    name = name.replace("{series}", getRandomInt(100, 1200).toString());
    
    // Generate price between ₹90,000 and ₹30,00,000 in rupees
    const basePrice = getRandomInt(90000, 3000000);
    const onSale = getRandomBool(0.3); // 30% chance of being on sale
    const salePrice = onSale ? Math.floor(basePrice * 0.85) : undefined; // 15% discount
    
    // Specifications based on category
    const specifications = {
      engine: `${getRandomInt(150, 1300)}cc ${getRandomBool() ? "V-Twin" : getRandomBool() ? "Inline-4" : "Single Cylinder"}`,
      power: `${getRandomInt(15, 220)} bhp`,
      torque: `${getRandomInt(15, 170)} Nm`,
      transmission: `${getRandomInt(5, 6)}-Speed Manual`,
      weight: `${getRandomInt(150, 350)} kg`,
      fuelCapacity: `${getRandomInt(10, 25)} liters`,
      seatHeight: `${getRandomInt(750, 900)} mm`,
      topSpeed: `${getRandomInt(120, 340)} km/h`
    };
    
    // Create proper slug
    const slug = `${brand.name.toLowerCase()}-${name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase()}-${i}`;
    
    products.push({
      id: i.toString(),
      name,
      slug,
      price: basePrice,
      salePrice,
      description: `Experience the thrill of riding with the ${name}. This ${category.name.toLowerCase()} combines power, style, and cutting-edge technology for an unmatched riding experience. Built with precision engineering and premium materials, it delivers exceptional performance on every journey.`,
      images: [
        {
          id: `${i}-1`,
          url: `/placeholder.svg`,
          alt: name
        },
        {
          id: `${i}-2`,
          url: `/placeholder.svg`,
          alt: `${name} side view`
        },
        {
          id: `${i}-3`,
          url: `/placeholder.svg`,
          alt: `${name} front view`
        }
      ],
      brand,
      category,
      featured: getRandomBool(0.1), // 10% chance of being featured
      stock: getRandomInt(0, 30),
      rating: getRandomInt(1, 5),
      specifications,
      new: getRandomBool(0.2), // 20% chance of being new
      bestseller: getRandomBool(0.15), // 15% chance of being bestseller
      onSale
    });
  }
  
  return products;
};

export const products = createProducts();

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

// Helper function to get new arrivals
export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.new);
};

// Helper function to get bestsellers
export const getBestsellers = (): Product[] => {
  return products.filter(product => product.bestseller);
};

// Helper function to get products on sale
export const getOnSaleProducts = (): Product[] => {
  return products.filter(product => product.onSale);
};

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category.id === categoryId);
};

// Helper function to get products by brand
export const getProductsByBrand = (brandId: string): Product[] => {
  return products.filter(product => product.brand.id === brandId);
};

// Helper function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

// Helper function to get product by id
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to format price in Indian Rupees
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
