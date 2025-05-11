
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, brands, categories, formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, Search, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    categories: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    // Apply filters from URL params
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const query = searchParams.get("q");

    if (brand) setSelectedBrands(brand.split(","));
    if (category) setSelectedCategories(category.split(","));
    if (sort) setSortBy(sort);
    if (minPrice && maxPrice) setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    if (query) setSearchQuery(query);

    // Reset page when filters change
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    // Filter products
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.name.toLowerCase().includes(query) ||
          product.category.name.toLowerCase().includes(query)
      );
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand.id)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category.id)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        (product.salePrice || product.price) >= priceRange[0] &&
        (product.salePrice || product.price) <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "priceAsc":
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "priceDesc":
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "newest":
        // In a real application, we would sort by date added
        // For this demo, we'll sort by id (higher id = newer)
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no specific sort
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedBrands, selectedCategories, priceRange, sortBy, searchQuery]);

  // Update URL params when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    
    if (selectedBrands.length > 0) params.brand = selectedBrands.join(",");
    if (selectedCategories.length > 0) params.category = selectedCategories.join(",");
    if (sortBy !== "featured") params.sort = sortBy;
    if (priceRange[0] > 0 || priceRange[1] < 3000000) {
      params.minPrice = priceRange[0].toString();
      params.maxPrice = priceRange[1].toString();
    }
    if (searchQuery) params.q = searchQuery;
    
    setSearchParams(params, { replace: true });
  }, [selectedBrands, selectedCategories, sortBy, priceRange, searchQuery, setSearchParams]);

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([0, 3000000]);
    setSortBy("featured");
    setSearchQuery("");
    setSearchParams({});
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled by the useEffect
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages = [];
    
    // Previous button
    pages.push(
      <Button
        key="prev"
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3"
      >
        <ChevronUp className="h-4 w-4 rotate-270" />
      </Button>
    );
    
    // Show first page
    if (currentPage > 3) {
      pages.push(
        <Button
          key="1"
          variant={currentPage === 1 ? "default" : "outline"}
          onClick={() => handlePageChange(1)}
          className="px-3"
        >
          1
        </Button>
      );
      
      // Ellipsis if needed
      if (currentPage > 4) {
        pages.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>
        );
      }
    }
    
    // Show pages around current page
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      // Skip if already added (first page)
      if (i === 1 && currentPage > 3) continue;
      
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className="px-3"
        >
          {i}
        </Button>
      );
    }
    
    // Ellipsis if needed
    if (currentPage < totalPages - 3) {
      pages.push(
        <span key="ellipsis2" className="px-2">
          ...
        </span>
      );
      
      // Show last page
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          onClick={() => handlePageChange(totalPages)}
          className="px-3"
        >
          {totalPages}
        </Button>
      );
    }
    
    // Next button
    pages.push(
      <Button
        key="next"
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3"
      >
        <ChevronDown className="h-4 w-4 rotate-90" />
      </Button>
    );
    
    return pages;
  };

  const FiltersComponent = () => (
    <div className="space-y-6">
      <div className="pb-4 border-b">
        <button
          onClick={clearFilters}
          className="text-sm text-bikeRed hover:underline flex items-center"
        >
          <X className="h-4 w-4 mr-1" />
          Clear all filters
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="pb-4 border-b">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection("price")}
        >
          <h3 className="font-medium">Price Range</h3>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider 
              defaultValue={[0, 3000000]} 
              max={3000000} 
              step={10000} 
              value={priceRange}
              onValueChange={handlePriceChange}
              className="mt-6"
            />
            <div className="flex items-center justify-between">
              <div className="bg-muted px-3 py-1 rounded text-sm">
                {formatPrice(priceRange[0])}
              </div>
              <div className="bg-muted px-3 py-1 rounded text-sm">
                {formatPrice(priceRange[1])}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="pb-4 border-b">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection("brands")}
        >
          <h3 className="font-medium">Brands</h3>
          {expandedSections.brands ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        {expandedSections.brands && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={() => toggleBrand(brand.id)}
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="text-sm cursor-pointer"
                >
                  {brand.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="pb-4 border-b">
        <div
          className="flex items-center justify-between cursor-pointer mb-4"
          onClick={() => toggleSection("categories")}
        >
          <h3 className="font-medium">Categories</h3>
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm cursor-pointer"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">All Motorcycles</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="w-full lg:w-1/4 hidden lg:block">
              <FiltersComponent />
            </div>

            {/* Products & Search */}
            <div className="w-full lg:w-3/4">
              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit" className="bg-bikeRed hover:bg-red-700">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border rounded-md bg-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Top Rated</option>
                  </select>

                  {/* Filter Button - Mobile */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <div className="py-4">
                        <h2 className="text-lg font-bold mb-4">Filters</h2>
                        <FiltersComponent />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedBrands.length > 0 ||
                selectedCategories.length > 0 ||
                priceRange[0] > 0 ||
                priceRange[1] < 3000000) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedBrands.map((brandId) => {
                    const brand = brands.find((b) => b.id === brandId);
                    return (
                      <Button
                        key={brandId}
                        variant="secondary"
                        size="sm"
                        className="flex items-center"
                        onClick={() => toggleBrand(brandId)}
                      >
                        {brand?.name}
                        <X className="h-4 w-4 ml-1" />
                      </Button>
                    );
                  })}

                  {selectedCategories.map((categoryId) => {
                    const category = categories.find((c) => c.id === categoryId);
                    return (
                      <Button
                        key={categoryId}
                        variant="secondary"
                        size="sm"
                        className="flex items-center"
                        onClick={() => toggleCategory(categoryId)}
                      >
                        {category?.name}
                        <X className="h-4 w-4 ml-1" />
                      </Button>
                    );
                  })}

                  {(priceRange[0] > 0 || priceRange[1] < 3000000) && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex items-center"
                      onClick={() => setPriceRange([0, 3000000])}
                    >
                      Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      <X className="h-4 w-4 ml-1" />
                    </Button>
                  )}

                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center"
                    onClick={clearFilters}
                  >
                    Clear All
                  </Button>
                </div>
              )}

              {/* Products Grid */}
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > productsPerPage && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2">
                    {renderPagination()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
