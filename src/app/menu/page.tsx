"use client";

import { useState } from "react";

// Define the type for a single menu item
type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  optionGroups?: {
    title: string;
    options: { label: string; price: number }[];
  }[];
  category?: 'main' | 'grill' | 'small-chops';
};

// Define the type for a cart item
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  option: string;
  image: string;
};

// Define the type for a cart option
interface CartOption {
  group: string;
  option: string;
  price: number;
}

// Define the type for order info
type OrderInfo = {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderItems: CartItem[];
  totalPrice: number;
  orderNumber: string;
};

// Function to generate order number
const generateOrderNumber = () => {
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return "AZ-" + random;
};

// Define menu items with images and structured options
const menu: MenuItem[] = [
  // Main Menu Items
  {
    id: 1,
    name: "Stir Fry Spaghetti",
    price: 1500,
    image: "/images/spaghetti.png",
    category: 'main',
    optionGroups: [
      {
        title: "Protein",
        options: [
          { label: "None", price: 0 },
          { label: "Half Chicken", price: 1500 },
          { label: "Full Chicken", price: 3000 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Jollof Rice",
    price: 2500,
    image: "/images/jollof-rice.png",
    category: 'main',
    optionGroups: [
      {
        title: "Protein",
        options: [
          { label: "None", price: 0 },
          { label: "Chicken", price: 2500 },
          { label: "Turkey", price: 4000 },
        ],
      },
      {
        title: "Side Dishes",
        options: [
          { label: "None", price: 0 },
          { label: "Extra Plantain", price: 1000 },
          { label: "Salad", price: 1000 },
          { label: "Salad and Plantain", price: 2000 },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Yam and Egg",
    price: 3000,
    image: "/images/yam-egg.png",
    category: 'main',
    optionGroups: [
      {
        title: "Protein",
        options: [
          { label: "None", price: 0 },
          { label: "Chicken", price: 2500 },
          { label: "Turkey", price: 4000 },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Ewa Agoyin, Ponmo & Eja Kika",
    price: 3000,
    image: "/images/ewa-agoyin.png",
    category: 'main',
    optionGroups: [
      {
        title: "Side Dish",
        options: [
          { label: "None", price: 0 },
          { label: "Plantain", price: 1000 },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Rice and Beans",
    price: 2000,
    image: "/images/rice-beans.png",
    category: 'main',
    optionGroups: [
      {
        title: "Side Dish",
        options: [
          { label: "None", price: 0 },
          { label: "Extra Plantain", price: 1000 },
        ],
      },
      {
        title: "Protein",
        options: [
          { label: "None", price: 0 },
          { label: "Chicken", price: 2500 },
          { label: "Turkey", price: 4000 },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "White Rice",
    price: 1000,
    image: "/images/white-rice.png",
    category: 'main',
    optionGroups: [
      {
        title: "Sauce",
        options: [
          { label: "Plain Sauce", price: 0 },
          { label: "Fish Sauce", price: 1000 },
        ],
      },
      {
        title: "Protein",
        options: [
          { label: "None", price: 0 },
          { label: "Chicken", price: 2500 },
          { label: "Turkey", price: 4000 },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Fried Rice",
    price: 2000,
    image: "/images/fried-rice.png",
    category: 'main',
    optionGroups: [
      {
        title: "Protein",
        options: [
          { label: "None", price: 0 },
          { label: "Chicken", price: 2500 },
          { label: "Turkey", price: 4000 },
        ],
      },
      {
        title: "Side Dishes",
        options: [
          { label: "None", price: 0 },
          { label: "Extra Plantain", price: 1000 },
          { label: "Salad", price: 1000 },
          { label: "Salad and Plantain", price: 2000 },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Jollof Rice and Fried Rice",
    price: 2000,
    image: "/images/jollof-fried.png",
    category: 'main',
    optionGroups: [
      {
        title: "Protein",
        options: [
          { label: "None", price: 0 },
          { label: "Chicken", price: 2500 },
          { label: "Turkey", price: 4000 },
        ],
      },
      {
        title: "Side Dishes",
        options: [
          { label: "None", price: 0 },
          { label: "Extra Plantain", price: 1000 },
          { label: "Salad", price: 1000 },
          { label: "Salad and Plantain", price: 2000 },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Shawarma",
    price: 2000,
    image: "/images/shawarma.png",
    category: 'main',
    optionGroups: [
      {
        title: "Type",
        options: [
          { label: "Chicken with one sausage", price: 2000 },
          { label: "Chicken with double sausage", price: 2500 },
          { label: "Beef with one sausage", price: 2000 },
          { label: "Beef with double sausage", price: 2500 },
        ],
      },
    ],
  },
  // Grill Menu Items
  {
    id: 10,
    name: "Barbeque Chicken",
    price: 3000,
    image: "/images/barbeque-chicken.png",
    category: 'grill',
    optionGroups: [
      {
        title: "Side",
        options: [
          { label: "Chips", price: 1000 },
          { label: "Pepper", price: 0 },
          { label: "Ketchup", price: 0 },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Barbeque Turkey",
    price: 5000,
    image: "/images/barbeque-turkey.png",
    category: 'grill',
    optionGroups: [
      {
        title: "Side",
        options: [
          { label: "Chips", price: 1000 },
          { label: "Pepper", price: 0 },
          { label: "Ketchup", price: 0 },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Barbeque Catfish",
    price: 4000,
    image: "/images/barbeque-fish.png",
    category: 'grill',
    optionGroups: [
      {
        title: "Size",
        options: [
          { label: "Small", price: 0 },
          { label: "Medium", price: 1000 },
          { label: "Large", price: 2000 },
        ],
      },
      {
        title: "Side",
        options: [
          { label: "Ketchup", price: 0 },
          { label: "Pepper", price: 0 },
        ],
      },
    ],
  },
  {
    id: 13,
    name: "Barbeque Croaker",
    price: 7000,
    image: "/images/barbeque-croaker.png",
    category: 'grill',
    optionGroups: [
      {
        title: "Options",
        options: [
          { label: "Ketchup", price: 0 },
          { label: "Pepper", price: 0 },
        ],
      },
    ],
  },
  // Small Chops and Events Items
  {
    id: 14,
    name: "Puff Puff",
    price: 1000,
    image: "/images/item.png",
    category: 'small-chops',
  },
  {
    id: 15,
    name: "Samosa",
    price: 1000,
    image: "/images/item1.png",
    category: 'small-chops',
  },
  {
    id: 16,
    name: "Spring Rolls",
    price: 1000,
    image: "/images/item2.png",
    category: 'small-chops',
  },
  {
    id: 17,
    name: "Chicken Kebabs",
    price: 1000,
    image: "/images/item3.png",
    category: 'small-chops',
  },
  {
    id: 18,
    name: "Meat Pies",
    price: 1000,
    image: "/images/item4.png",
    category: 'small-chops',
  },
  {
    id: 19,
    name: "Fish Rolls",
    price: 1000,
    image: "/images/item5.png",
    category: 'small-chops',
  },
  {
    id: 20,
    name: "Scotch Eggs",
    price: 1000,
    image: "/images/item6.png",
    category: 'small-chops',
  },
  {
    id: 21,
    name: "Plantain Chips",
    price: 1000,
    image: "/images/item7.png",
    category: 'small-chops',
  },
  {
    id: 22,
    name: "Doughnuts",
    price: 1000,
    image: "/images/item8.png",
    category: 'small-chops',
  },
];

interface MenuPageProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onShowCart: () => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ cart, setCart, onShowCart }) => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: { [key: string]: string };
  }>({});

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.option === item.option
      );
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      }
      return [...prevCart, item];
    });
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleOptionChange = (
    itemId: number,
    groupTitle: string,
    optionLabel: string
  ) => {
    setSelectedOptions(prev => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [groupTitle]: optionLabel,
      },
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    let totalItemPrice = item.price;
    const itemOptions: CartOption[] = [];

    if (item.optionGroups && item.category !== 'small-chops') {
      item.optionGroups.forEach(group => {
        const selectedLabel =
          selectedOptions[item.id]?.[group.title] || group.options[0].label;
        const selectedOption = group.options.find(
          opt => opt.label === selectedLabel
        );

        if (selectedOption) {
          if (item.name === "Shawarma") {
            totalItemPrice = selectedOption.price;
          } else {
            totalItemPrice += selectedOption.price;
          }

          itemOptions.push({
            group: group.title,
            option: selectedOption.label,
            price: selectedOption.price,
          });
        }
      });
    }

    const optionString = itemOptions
      .map(opt => `${opt.group}: ${opt.option}`)
      .join(", ");

    addToCart({
      id: item.id,
      name: item.name,
      price: totalItemPrice,
      quantity,
      option: optionString,
      image: item.image,
    });

    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
    setSelectedOptions(prev => {
      const newOptions = { ...prev };
      delete newOptions[item.id];
      return newOptions;
    });
  };

  const renderInteractiveItem = (item: MenuItem) => {
    const currentPrice =
      item.price +
      (item.optionGroups?.reduce((total, group) => {
        const selectedLabel =
          selectedOptions[item.id]?.[group.title] || group.options[0].label;
        const selectedOption = group.options.find(
          opt => opt.label === selectedLabel
        );
        return total + (selectedOption ? selectedOption.price : 0);
      }, 0) || 0);

    return (
      <li
        key={item.id}
        className="p-8 rounded-2xl menu-item-card flex flex-col items-center text-center"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover rounded-lg mb-4 shadow-inner-gold"
        />
        <h2 className="text-3xl font-['Playfair_Display'] font-semibold mb-2 text-[#4A4A4A]">
          {item.name}
        </h2>
        <p className="text-2xl font-bold text-[#D4A017] mb-4">
          ₦{currentPrice}
        </p>

        {item.optionGroups &&
          item.optionGroups.map(group => (
            <div key={group.title} className="w-full mb-4">
              <p className="font-semibold text-[#666] mb-1">
                {group.title}:
              </p>
              <select
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-200"
                onChange={e =>
                  handleOptionChange(item.id, group.title, e.target.value)
                }
                value={
                  selectedOptions[item.id]?.[group.title] ||
                  group.options[0].label
                }
              >
                {group.options.map(option => (
                  <option key={option.label} value={option.label}>
                    {option.label +
                      (option.price > 0
                        ? " (+₦" + option.price + ")"
                        : "")}
                  </option>
                ))}
              </select>
            </div>
          ))}

        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => handleQuantityChange(item.id, -1)}
            className="bg-[#D4A017] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl hover:bg-[#B88C14] transition-colors"
          >
            -
          </button>
          <span className="text-xl font-semibold w-8 text-center">
            {quantities[item.id] || 1}
          </span>
          <button
            onClick={() => handleQuantityChange(item.id, 1)}
            className="bg-[#D4A017] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl hover:bg-[#B88C14] transition-colors"
          >
            +
          </button>
        </div>

        <button
          onClick={() => handleAddToCart(item)}
          className="btn-gold-neon-capsule"
        >
          Add to Cart
        </button>
      </li>
    );
  };

  const renderSmallChopsItem = (item: MenuItem) => {
    return (
      <li
        key={item.id}
        className="p-8 rounded-2xl menu-item-card flex flex-col items-center text-center"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover rounded-lg shadow-inner-gold"
        />
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F4E3] text-[#1A1A1A] font-cormorant antialiased">
      <div
        className="fixed inset-0 z-0 opacity-70"
        style={{
          backgroundImage: "url('/images/gold-floral-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      ></div>
      <div className="fixed inset-0 z-0 bg-[#F8F4E3] opacity-30"></div>

      <nav className="fixed top-0 left-0 w-full bg-[#F8F4E3]/90 backdrop-blur-sm z-20 shadow-lg border-b border-[#D4A017]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="group">
            <img
              src="/images/logo.png"
              alt="IkeOluwa Logo"
              className="w-16 h-16 object-contain"
            />
          </a>
          <div className="space-x-8 text-lg font-['Cormorant_Garamond'] font-medium text-[#4A4A4A]">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/menu" className="nav-link">
              Menu
            </a>
            <a href="/reservations" className="nav-link">
              Reservations
            </a>
            <a href="/about" className="nav-link">
              About
            </a>
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-16 px-6 sm:px-12 md:px-24">
        <div className="flex justify-center mb-12">
          <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#D4A017] drop-shadow-md">
            Our Menu
          </h1>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {menu.filter(item => item.category === 'main').map(renderInteractiveItem)}
        </ul>

        <div className="flex justify-center mb-12">
          <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#D4A017] drop-shadow-md">
            Grills
          </h1>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {menu.filter(item => item.category === 'grill').map(renderInteractiveItem)}
        </ul>

        <div className="flex justify-center mb-12">
          <h1 className="text-5xl md:text-6xl font-['Playfair_Display'] font-bold text-[#D4A017] drop-shadow-md">
            Small Chops and Events
          </h1>
        </div>
        <p className="text-center text-lg text-[#4A4A4A] mb-8 max-w-2xl mx-auto">
          Our selection of small chops and event items. Contact us for custom orders and pricing.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menu.filter(item => item.category === 'small-chops').map(renderSmallChopsItem)}
        </ul>
      </main>

      {cart.length > 0 && (
        <button
          onClick={onShowCart}
          className="fixed bottom-6 right-6 bg-[#D4A017] text-[#1A1A1A] px-6 py-4 rounded-full shadow-lg hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-110 z-50"
        >
          <span className="font-['Cormorant_Garamond'] font-bold">
            🛒 View Cart ({cart.length})
          </span>
        </button>
      )}

      <footer className="bg-[#F8F4E3] py-12 relative border-t border-t-[#D4A017]/30 patterned-cream-bg">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-[#333] font-['Cormorant_Garamond'] mb-4">
            IkeOluwa Grills & Chops © 2025 | Lagos, Nigeria
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://instagram.com" className="social-link">
              Instagram
            </a>
            <a href="https://facebook.com" className="social-link">
              Facebook
            </a>
            <a href="https://twitter.com" className="social-link">
              Twitter
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .font-playfair {
          font-family: "Playfair Display", serif;
        }
        .font-cormorant {
          font-family: "Cormorant Garamond", serif;
        }
        .nav-link {
          @apply text-[#4A4A4A] hover:text-[#D4A017] transition-colors duration-300 relative;
        }
        .nav-link::after {
          content: "";
          @apply absolute bottom-[-5px] left-0 w-full h-[1px] bg-[#D4A017] scale-x-0 transition-transform duration-300 origin-left;
        }
        .nav-link:hover::after {
          @apply scale-x-100;
        }
        .btn-gold-neon-capsule {
          @apply px-12 py-4 bg-[#111] text-[#D4A017] font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105;
          border: 2px solid #D4A017;
          box-shadow: 0 0 8px #D4A017, inset 0 0 4px #D4A017;
        }
        .btn-gold-neon-capsule:hover {
          box-shadow: 0 0 15px #FFD700, inset 0 0 7px #FFD700;
          background-color: #000;
        }
        .menu-item-card {
          background-color: #F8F4E3;
          border: 1px solid #D4A017;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1),
            inset 0 0 10px rgba(255, 215, 0, 0.2);
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .menu-item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15),
            inset 0 0 15px rgba(255, 215, 0, 0.3);
        }
        .menu-item-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(255, 255, 255, 0.2) 100%
          );
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        .shadow-inner-gold {
          box-shadow: inset 0 0 8px rgba(212, 160, 23, 0.5);
        }
        .social-link {
          @apply text-[#4A4A4A] hover:text-[#D4A017] transition-colors duration-300 text-sm md:text-base;
        }
        @media (max-width: 640px) {
          .nav-link {
            font-size: 0.8rem;
            margin: 0 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

interface CartPageProps {
  cart: CartItem[];
  onGoBack: () => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

const CartPage: React.FC<CartPageProps> = ({
  cart,
  onGoBack,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F4E3] text-[#1A1A1A] font-cormorant antialiased flex flex-col items-center py-20">
      <div
        className="fixed inset-0 z-0 opacity-70"
        style={{
          backgroundImage: "url('/images/gold-floral-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      ></div>
      <div className="fixed inset-0 z-0 bg-[#F8F4E3] opacity-30"></div>

      <div className="relative z-10 p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 border border-[#D4A017] bg-[#F8F4E3]">
        <h2 className="text-5xl font-['Playfair_Display'] font-bold mb-6 text-center text-[#D4A017]">
          Your Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-center text-xl">Your cart is empty.</p>
        ) : (
          <ul className="space-y-6">
            {cart.map((item, index) => {
              let parsedOptions: CartOption[] = [];
              try {
                if (item.option && item.option.trim() !== "") {
                  parsedOptions = JSON.parse(item.option);
                }
              } catch {
                parsedOptions = item.option
                  ? [{ group: "Options", option: item.option, price: 0 }]
                  : [];
              }
              return (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4 shadow-inner-gold"
                    />
                    <div className="text-left flex-1">
                      <p className="font-['Playfair_Display'] text-xl font-semibold">
                        {item.name}
                      </p>
                      {parsedOptions.length > 0 && (
                        <div className="mt-1 text-sm text-gray-600">
                          {parsedOptions.map((opt, i) => (
                            <span key={i} className="block">
                              {opt.group}: {opt.option} (+₦{opt.price})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(index, -1)}
                        className="bg-[#D4A017] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl hover:bg-[#B88C14] transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, 1)}
                        className="bg-[#D4A017] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl hover:bg-[#B88C14] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-lg font-bold">
                        ₦{item.price * item.quantity}
                      </p>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-6 text-right">
          <span className="text-2xl font-bold">
            Total: ₦{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
          </span>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <button onClick={onGoBack} className="btn-gold-neon-capsule">
            Back to Menu
          </button>
          {cart.length > 0 && (
            <button
              onClick={onProceedToCheckout}
              className="btn-gold-neon-capsule"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface CheckoutFormProps {
  cart: CartItem[];
  onConfirmOrder: (info: OrderInfo) => void;
  onGoBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cart,
  onConfirmOrder,
  onGoBack,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validatePhone = (phoneNumber: string) => {
    return /^\d{11}$/.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !phone || !address) {
      setError("All fields are mandatory.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Please enter a valid 11-digit phone number.");
      return;
    }

    setLoading(true);

    const orderNumber = generateOrderNumber();

    const orderDetails: OrderInfo = {
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      orderItems: cart,
      totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      orderNumber: orderNumber,
    };

    const emailRecipient = "adejaretalabi@gmail.com";
    const phoneRecipient = "08132791933";

    const orderMessage =
      "New Order Details:\n" +
      "Order Number: " +
      orderDetails.orderNumber +
      "\n" +
      "Name: " +
      orderDetails.customerName +
      "\n" +
      "Phone: " +
      orderDetails.customerPhone +
      "\n" +
      "Address: " +
      orderDetails.customerAddress +
      "\n" +
      "Time: " +
      new Date().toLocaleString() +
      "\n" +
      "---\n" +
      "Order Summary:\n" +
      orderDetails.orderItems
        .map(
          item =>
            "- " +
            item.name +
            " x" +
            item.quantity +
            " (₦" +
            item.price * item.quantity +
            ")"
        )
        .join("\n") +
      "\n" +
      "---\n" +
      "Total: ₦" +
      orderDetails.totalPrice;

    try {
      console.log("Simulating sending email to:", emailRecipient);
      console.log("Simulating sending SMS to:", phoneRecipient);
      console.log("Order Details:", orderMessage);

      await new Promise(resolve => setTimeout(resolve, 2000));
      onConfirmOrder(orderDetails);
    } catch (err) {
      console.error("Failed to place order:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F4E3] text-[#1A1A1A] font-cormorant antialiased flex flex-col items-center py-20">
      <div
        className="fixed inset-0 z-0 opacity-70"
        style={{
          backgroundImage: "url('/images/gold-floral-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      ></div>
      <div className="fixed inset-0 z-0 bg-[#F8F4E3] opacity-30"></div>

      <div className="relative z-10 p-8 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 border border-[#D4A017] bg-[#F8F4E3]">
        <h2 className="text-5xl font-['Playfair_Display'] font-bold mb-6 text-center text-[#D4A017]">
          Checkout
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold mb-1 text-[#4A4A4A]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-lg font-semibold mb-1 text-[#4A4A4A]"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-lg font-semibold mb-1 text-[#4A4A4A]"
            >
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-200"
              rows={4}
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="button"
              onClick={onGoBack}
              className="btn-gold-neon-capsule-secondary"
              disabled={loading}
            >
              Back to Cart
            </button>
            <button
              type="submit"
              className="btn-gold-neon-capsule"
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .btn-gold-neon-capsule-secondary {
          @apply px-12jiangsu
12 py-4 bg-transparent text-[#D4A017] font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105;
          border: 2px solid #D4A017;
          box-shadow: 0 0 8px rgba(212, 160, 23, 0.5),
            inset 0 0 4px rgba(212, 160, 23, 0.5);
        }
        .btn-gold-neon-capsule-secondary:hover {
          background-color: rgba(212, 160, 23, 0.1);
        }
        .btn-gold-neon-capsule {
          @apply px-12 py-4 bg-[#111] text-[#D4A017] font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105;
          border: 2px solid #D4A017;
          box-shadow: 0 0 8px #D4A017, inset 0 0 4px #D4A017;
        }
        .btn-gold-neon-capsule:hover {
          box-shadow: 0 0 15px #FFD700, inset 0 0 7px #FFD700;
          background-color: #000;
        }
      `}</style>
    </div>
  );
};

interface CheckoutSuccessModalProps {
  orderInfo: OrderInfo | null;
  onGoBack: () => void;
}

const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  orderInfo,
  onGoBack,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/80 flex items-center justify-center p-4">
      <div className="bg-[#F8F4E3] rounded-lg p-8 shadow-2xl border-2 border-[#D4A017] text-center max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-3xl font-['Playfair_Display'] font-bold text-[#D4A017] mb-4">
          Order Placed!
        </h3>
        <p className="text-[#4A4A4A] mb-6">
          Thank you for your order! Your payment will be collected upon delivery.
        </p>
        {orderInfo && (
          <>
            <div className="text-left space-y-4 mb-6">
              <div className="bg-[#D4A017]/10 p-4 rounded-lg border border-[#D4A017]/30">
                <h4 className="text-xl font-bold text-[#D4A017] mb-2">
                  Order Number
                </h4>
                <p className="text-2xl font-mono font-bold text-[#1A1A1A]">
                  {orderInfo.orderNumber}
                </p>
              </div>
              <h4 className="text-xl font-bold text-[#D4A017]">
                Customer Information
              </h4>
              <p>
                <strong>Name:</strong> {orderInfo.customerName}
              </p>
              <p>
                <strong>Contact:</strong> {orderInfo.customerPhone}
              </p>
              <p>
                <strong>Delivery Address:</strong> {orderInfo.customerAddress}
              </p>
            </div>
            <div className="text-left space-y-2 mb-6">
              <h4 className="text-xl font-bold text-[#D4A017]">Meal Details</h4>
              {orderInfo.orderItems.map((item, index) => {
                let parsedOptions: CartOption[] = [];
                try {
                  if (item.option && item.option.trim() !== "") {
                    parsedOptions = JSON.parse(item.option);
                  }
                } catch {
                  parsedOptions = item.option
                    ? [{ group: "Options", option: item.option, price: 0 }]
                    : [];
                }
                return (
                  <div key={index} className="border-b border-gray-300 pb-2">
                    <p className="font-semibold">
                      {item.name} x{item.quantity} - ₦{item.price * item.quantity}
                    </p>
                    {parsedOptions.length > 0 && (
                      parsedOptions.map((opt, i) => (
                        <p key={i} className="ml-4 text-sm text-gray-600">
                          {opt.group}: {opt.option} (+₦{opt.price})
                        </p>
                      ))
                    )}
                  </div>
                );
              })}
              <p className="text-lg font-bold mt-4">
                Total: ₦{orderInfo.totalPrice}
              </p>
            </div>
          </>
        )}
        <button onClick={onGoBack} className="btn-gold-neon-calsule">
          Got It
        </button>
      </div>
      <style jsx>{`
        .btn-gold-neon-capsule {
          @apply px-12 py-4 bg-[#111] text-[#D4A017] font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105;
          border: 2px solid #D4A017;
          box-shadow: 0 0 8px #D4A017, inset 0 0 4px #D4A017;
        }
        .btn-gold-neon-capsule:hover {
          box-shadow: 0 0 15px #FFD700, inset 0 0 7px #FFD700;
          background-color: #000;
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState("menu");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const newQuantity = newCart[index].quantity + delta;
      if (newQuantity > 0) {
        newCart[index].quantity = newQuantity;
      } else {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const handleProceedToCheckout = () => {
    setCurrentPage("checkout");
  };

  const handleConfirmOrder = (info: OrderInfo) => {
    setOrderInfo(info);
    setCart([]);
    setShowSuccessModal(true);
  };

  const handleGoBackFromModal = () => {
    setShowSuccessModal(false);
    setOrderInfo(null);
    setCurrentPage("menu");
  };

  return (
    <>
      {currentPage === "menu" && (
        <MenuPage
          cart={cart}
          setCart={setCart}
          onShowCart={() => setCurrentPage("cart")}
        />
      )}
      {currentPage === "cart" && (
        <CartPage
          cart={cart}
          onGoBack={() => setCurrentPage("menu")}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}
      {currentPage === "checkout" && (
        <CheckoutForm
          cart={cart}
          onConfirmOrder={handleConfirmOrder}
          onGoBack={() => setCurrentPage("cart")}
        />
      )}
      {showSuccessModal && (
        <CheckoutSuccessModal
          orderInfo={orderInfo}
          onGoBack={handleGoBackFromModal}
        />
      )}
    </>
  );
}