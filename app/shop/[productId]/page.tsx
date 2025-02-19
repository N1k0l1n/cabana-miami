// app/shop/[productId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "../../contexts/CartContext";
import { useParams } from "next/navigation";
import { X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useProductStore from "../../store/productStore";
import { CartIcon } from "@/components/cart-icon";
import { QuickCheckoutPopup } from "@/components/quick-checkout-popup";

export default function ProductPage() {
  const { productId } = useParams();
  const { products, isLoading, error, fetchProducts, getProductById } =
    useProductStore();
  const { addToCart, cart, total } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  const id = Array.isArray(productId) ? productId[0] : productId;
  const product = getProductById(id);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity: 1,
      image: product.images[0],
    });
  };

  const handleGoBack = () => {
    window.history.back();
  };

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center text-xl text-red-500">Error: {error}</div>
    );
  }
  if (!product) {
    return (
      <div className="text-center text-xl text-red-500">Product not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Persistent Cart Icon */}
      <div className="fixed top-4 right-4 z-50">
        <CartIcon
          itemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onClick={() => setIsCartOpen(true)}
        />
      </div>

      {/* Main Product Detail Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Column: Product Image */}
          <div className="relative md:w-1/2">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-auto object-cover rounded-lg shadow"
            />
            {/* Back Button Overlay */}
            <button
              onClick={handleGoBack}
              className="absolute top-4 left-4 bg-gray-800 bg-opacity-50 text-white px-3 py-2 rounded-md hover:bg-opacity-75"
            >
              <ArrowLeft size={20} className="inline-block mr-2" />
              Back
            </button>
          </div>

          {/* Right Column: Product Information */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="mb-8">
              {product.salePrice ? (
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-red-600">
                    ${product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-xl line-through text-gray-500">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-lg text-gray-700 mb-8">{product.description}</p>

            <button
              onClick={handleAddToCart}
              className="w-full bg-yellow-400 hover:bg-yellow-700 text-white py-4 rounded-md text-xl font-semibold transition-colors mb-8"
            >
              Add to Cart
            </button>

            {product.materials && (
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Materials:</span>{" "}
                {product.materials}
              </p>
            )}
            {product.dimensions && (
              <p className="text-gray-600">
                <span className="font-medium">Dimensions:</span>{" "}
                {product.dimensions}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Your Cart
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={24} />
                </button>
              </div>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b border-gray-200"
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
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            ${item.price.toLocaleString()} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6">
                    <p className="text-xl font-bold text-gray-900">
                      Total: ${total.toLocaleString()}
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                      className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-md transition-colors"
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
