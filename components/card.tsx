import React, { useState } from 'react';
import Image from 'next/image';
import ProductImg from '../public/product.jpg';

function Card() {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  const handlePopupClose = () => {
    setIsButtonClicked(false);
  };

  const handleAddToCart = () => {
    // Add logic to add the product to the cart
    console.log(`Added ${quantity} items to the cart`);
    setIsButtonClicked(false);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div
      className="max-w-xs rounded overflow-hidden m-auto mt-12 shadow-lg relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          className="w-full"
          src={ProductImg}
          alt="Sunset in the mountains"
          width={500}
          height={500}
        />
        {isHovered && !isButtonClicked && (
          <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleButtonClick}
            >
              View More
            </button>
          </div>
        )}
      </div>
      {isButtonClicked && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg max-w-4xl ">
            <div className="flex justify-end mb-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handlePopupClose}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex">
              <div className="w-1/2 mr-4">
                <Image
                  className="w-full rounded"
                  src={ProductImg}
                  alt="Sunset in the mountains"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-1/2">
                <h2 className="text-2xl font-bold mb-4">Detailed Description</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  aliquet leo eu nisi posuere, id varius augue laoreet. Proin non
                  vestibulum justo.
                </p>
                <p className="mt-4">
                  Additional details about the image can go here.
                </p>
                <div className="mt-6 flex items-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 flex rounded mr-4"
                    onClick={handleAddToCart}
                  >
                    <svg
                      className="w-6 h-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                    Add to Cart
                  </button>
                  <div className="flex items-center">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleDecreaseQuantity}
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="px-6 py-4 flex justify-between">
        <div className="font-bold text-xl mb-2">Clothe</div>
        <p className="text-gray-700 text-base">$50</p>
      </div>
    </div>
  );
}

export default Card;
