import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCarts(cartItems);
  }, []);

  const calculateSubtotal = () => {
    return carts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const taxes = subtotal * 0.1; // Assuming 10% tax rate for example purposes
  const total = subtotal + taxes;

  const handleIncrement = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCarts(updatedCart);
  };

  const handleDecrement = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCarts(updatedCart);
  };

  const removeProduct = (id) => {
    const updatedCart = carts.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCarts(updatedCart);
  };

  if (!carts.length) {
    return (
      <div className="h-[55vh] flex justify-center items-center text-4xl">
        Cart is Empty
      </div>
    );
  }

  return (
    <div className="bg-gray-100 h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-3/4">
            {carts.map((cart) => (
              <div
                key={cart.id}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4"
                            src={cart.image}
                            alt={cart.title}
                          />
                          <span className="font-semibold">{cart.title}</span>
                        </div>
                      </td>
                      <td className="py-4">${cart.price.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="border rounded-md py-2 px-4 mr-2 cursor-pointer"
                            onClick={() => handleDecrement(cart.id)}
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {cart.quantity}
                          </span>
                          <button
                            className="border rounded-md py-2 px-4 ml-2 cursor-pointer"
                            onClick={() => handleIncrement(cart.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                        ${(cart.price * cart.quantity).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  className="bg-orange-700 text-white mx-5 py-2 px-4 rounded-lg w-30 text-center mt-4 mb-2 cursor-pointer"
                  onClick={() => removeProduct(cart.id)}
                >
                  Remove item
                </div>
                <Link
                  to="/products/categories"
                  className="bg-orange-700 text-white py-2 px-4 rounded-lg w-full text-center mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            ))}
          </div>
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <button className="bg-orange-700 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
