import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useTrail, a } from '@react-spring/web'
import AOS from "aos";
import "aos/dist/aos.css";

interface Product {
  id: number;
  title: string;
  price: number;
}

const productData = [
  { id: 1, title: 'Product 1', price: 50 },
  { id: 2, title: 'Product 2', price: 100 },
  { id: 3, title: 'Product 3', price: 150 },
  { id: 4, title: 'Product 4', price: 200 },
  { id: 5, title: 'Product 5', price: 250 },
  { id: 6, title: 'Product 6', price: 300 },
  { id: 7, title: 'Product 7', price: 350 },
  { id: 8, title: 'Product 8', price: 400 },
  { id: 9, title: 'Product 9', price: 450 },
];

function Card() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      setFilteredProducts(productData); // Initially, display all products
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    // Filter products based on the search term
    const filtered = productData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);
  
  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
  };

  const handleCardLeave = () => {
    setHoveredIndex(-1);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  const handlePopupClose = () => {
    setIsButtonClicked(false);
    setHoveredIndex(-1);
  };

  const handleAddToCart = () => {
    window.alert(`Added ${quantity} items to the cart`);
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

  const glowProps = useSpring({
    boxShadow: hoveredIndex !== -1 ? '0 0 20px rgba(0, 0, 255, 0.8)' : '0 0 0 rgba(0, 0, 255, 0)',
  });
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);


  if (isLoading) {
    return (
      <div className="flex flex-col">
        <div className="flex my-8 m-auto items-center justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 pr-8 border rounded-xl m-auto focus:outline-none focus:border-red-500"
            />
            <svg
              className="absolute right-2 top-2 w-5 h-5 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-5-5m-1.535-1.536a10 10 0 111.536-1.535"
              ></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap justify-around gap-4 relative">
          {filteredProducts.map((product, index) => (
            <animated.div
              key={product.id}
              className={`w-full sm:w-1/2 md:w-1/4 animate-pulse lg:w-1/4 xl:w-1/4 p-4 relative border rounded transition duration-300`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              style={hoveredIndex === index ? glowProps : {}}
            >
              <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center"></div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mt-4 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </animated.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex my-8 m-auto items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 pr-8 border rounded-xl m-auto focus:outline-none focus:border-red-500"
          />
          <svg
            className="absolute right-2 top-2 w-5 h-5 text-gray-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-5-5m-1.535-1.536a10 10 0 111.536-1.535"
            ></path>
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap justify-around gap-4 relative">
        {filteredProducts.map((product, index) => (
          <animated.div
            key={product.id}
            className={`w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4 relative border rounded transition duration-300`}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
            style={hoveredIndex === index ? glowProps : {}}
          >
            <div className="relative">
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                <h2 className="text-2xl font-bold text-center">{product.title}</h2>
              </div>
              {hoveredIndex === index && (
                <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center z-10">
                  <div className="mt-4">
                    <button
                      className="bg-blue-900 mt-14 z-5 text-white px-4 py-2 rounded"
                      onClick={handleButtonClick}
                    >
                      View More
                    </button>
                  </div>
                </div>
              )}
            </div>


            
            {isButtonClicked && hoveredIndex === index && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-20" >
                <div className="bg-white p-6 rounded shadow-lg max-w-4xl transition-opacity" data-aos="zoom-in" data-aos-duration='400'>
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
                  <div >
                    <h2 className="text-2xl font-bold mb-4" data-aos="zoom-in" data-aos-duration='600'>Detailed Description</h2>
                    <p data-aos="zoom-in" data-aos-duration='800'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      aliquet leo eu nisi posuere, id varius augue laoreet. Proin non
                      vestibulum justo.
                    </p>
                    <p className="mt-4" data-aos="zoom-in" data-aos-duration='1000'>Additional details about the product can go here.</p>
                    <div className="mt-10 flex items-center">
                      <button
                        className="bg-blue-800 text-white px-4 py-2 flex rounded mr-4"
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
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="px-6 py-4 flex justify-between">
              <div className="font-bold text-xl mb-2">{product.title}</div>
              <p className="text-gray-700 text-base">${product.price}</p>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}

export default Card;
