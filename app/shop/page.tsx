// app/shop/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Search, Tag, SortAsc } from "lucide-react";
import { LuxuryHeader } from "@/components/luxury-header";
import { AnimatedAddToCartButton } from "@/components/animated-add-to-cart-button";
import { CartIcon } from "@/components/cart-icon";
import { QuickCheckoutPopup } from "@/components/quick-checkout-popup";
import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import useProductStore, { Product } from "../store/productStore";

export default function Shop() {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cart, addToCart, total } = useCart();
  const [menuHeight, setMenuHeight] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  // Calculate the header height for spacing
  useEffect(() => {
    const updateMenuHeight = () => {
      const menu = document.getElementById("luxury-header");
      if (menu) {
        setMenuHeight(menu.offsetHeight);
      }
    };
    updateMenuHeight();
    window.addEventListener("resize", updateMenuHeight);
    return () => window.removeEventListener("resize", updateMenuHeight);
  }, []);

  // Derive the list of categories from fetched products
  const categories = [
    "All",
    ...new Set(products.flatMap((product) => product.categories)),
  ];

  // Filter and sort the products based on user input
  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" ||
          product.categories.includes(selectedCategory)) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "priceLowHigh") return a.price - b.price;
      if (sortBy === "priceHighLow") return b.price - a.price;
      return 0;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: product.images[0],
    });
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <LuxuryHeader />
      <main style={{ paddingTop: `${menuHeight}px` }} className="pb-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl text-luxury-700 text-center mb-8 pt-8"
          >
            Our Collection
          </motion.h1>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-luxury-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold text-luxury-700"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-500"
                size={20}
              />
            </div>

            {/* Category & Sort Filters */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-luxury-300 text-luxury-700 py-2 pl-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gold w-full"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Tag
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-500"
                  size={20}
                />
              </div>
              
              {/* Sort By Filter */}
              <div className="relative w-full md:w-64">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-luxury-300 text-luxury-700 py-2 pl-4 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gold w-full"
                >
                  <option value="featured">Featured</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>
                <SortAsc
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxury-500"
                  size={20}
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="text-center">Loading products...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error: {error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    <Link href={`/shop/${product.id}`} passHref>
                      <div className="relative h-64">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          width={500}
                          height={500}
                          className="object-cover w-full h-full"
                        />
                        {addedToCart === product.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-4 right-4 bg-gold text-white px-4 py-2 rounded-full"
                          >
                            Added to Cart!
                          </motion.div>
                        )}
                      </div>
                      <div className="p-6">
                        <h2 className="font-serif text-xl text-luxury-700 mb-2">
                          {product.name}
                        </h2>
                        <p className="text-luxury-500 mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {product.materials && (
                          <p className="text-sm text-luxury-500 mb-2">
                            <span className="font-semibold">Materials:</span>{" "}
                            {product.materials}
                          </p>
                        )}

                        {product.dimensions && (
                          <p className="text-sm text-luxury-500 mb-4">
                            <span className="font-semibold">Dimensions:</span>{" "}
                            {product.dimensions}
                          </p>
                        )}

                        <div className="flex justify-between items-center">
                          <div>
                            {product.salePrice ? (
                              <>
                                <span className="text-lg font-bold text-red-500">
                                  ${product.salePrice.toLocaleString()}
                                </span>
                                <span className="text-sm text-luxury-500 line-through ml-2">
                                  ${product.price.toLocaleString()}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-luxury-700">
                                ${product.price.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <AnimatedAddToCartButton
                              onClick={() => handleAddToCart(product)}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <button
                    className="px-4 py-2 bg-luxury-300 text-luxury-700 rounded disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="px-4 py-2 bg-luxury-300 text-luxury-700 rounded disabled:opacity-50"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Shopping Cart */}
      <CartIcon
        itemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onClick={() => setIsCartOpen(true)}
      />

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-2xl text-luxury-700">
                  Your Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-luxury-500 hover:text-luxury-700"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-luxury-500">Your cart is empty</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-luxury-200"
                    >
                      <div className="flex items-center">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                        <div className="ml-4">
                          <h3 className="font-serif text-luxury-700">
                            {item.name}
                          </h3>
                          <p className="text-sm text-luxury-500">
                            ${item.price.toLocaleString()} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <p className="text-xl font-bold text-luxury-700">
                      Total: ${total.toLocaleString()}
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full mt-4 bg-gold text-luxury-700 py-3 rounded-full hover:bg-soft-gold transition-colors text-lg font-semibold"
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickCheckoutPopup
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
