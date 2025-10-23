"use client";

import emailjs from '@emailjs/browser';
import { useState, useEffect } from "react";


type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  optionGroups?: {
    title: string;
    options: { label: string; price: number }[];
  }[];
  category?: "main" | "grill" | "small-chops";
};


type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  option: string;
  image: string;
};


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


const backgroundImages = [
  "/images/bg1.png",
  "/images/bg2.png",
  "/images/bg3.png",
  "/images/bg4.png",
];


const generateOrderNumber = () => {
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `AZ-${random}`;
};


const menu: MenuItem[] = [

  {
    id: 1,
    name: "Stir Fry Spaghetti",
    price: 1500,
    image: "/images/spaghetti.png",
    category: "main",
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
    category: "main",
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
    category: "main",
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
    category: "main",
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
    category: "main",
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
    category: "main",
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
    category: "main",
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
    category: "main",
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
    category: "main",
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
  
  {
    id: 10,
    name: "Barbeque Chicken",
    price: 3000,
    image: "/images/barbeque-chicken.png",
    category: "grill",
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
    category: "grill",
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
    category: "grill",
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
    category: "grill",
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
 
  {
    id: 14,
    name: "Puff Puff",
    price: 1000,
    image: "/images/item.png",
    category: "small-chops",
  },
  {
    id: 15,
    name: "Samosa",
    price: 1000,
    image: "/images/item1.png",
    category: "small-chops",
  },
  {
    id: 16,
    name: "Spring Rolls",
    price: 1000,
    image: "/images/item2.png",
    category: "small-chops",
  },
  {
    id: 17,
    name: "Chicken Kebabs",
    price: 1000,
    image: "/images/item3.png",
    category: "small-chops",
  },
  {
    id: 18,
    name: "Meat Pies",
    price: 1000,
    image: "/images/item4.png",
    category: "small-chops",
  },
  {
    id: 19,
    name: "Fish Rolls",
    price: 1000,
    image: "/images/item5.png",
    category: "small-chops",
  },
  {
    id: 20,
    name: "Scotch Eggs",
    price: 1000,
    image: "/images/item6.png",
    category: "small-chops",
  },
  {
    id: 21,
    name: "Plantain Chips",
    price: 1000,
    image: "/images/item7.png",
    category: "small-chops",
  },
  {
    id: 22,
    name: "Doughnuts",
    price: 1000,
    image: "/images/item8.png",
    category: "small-chops",
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
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.option === item.option
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
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleOptionChange = (
    itemId: number,
    groupTitle: string,
    optionLabel: string
  ) => {
    setSelectedOptions((prev) => ({
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

    if (item.optionGroups && item.category !== "small-chops") {
      item.optionGroups.forEach((group) => {
        const selectedLabel =
          selectedOptions[item.id]?.[group.title] || group.options[0].label;
        const selectedOption = group.options.find(
          (opt) => opt.label === selectedLabel
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
      .map((opt) => `${opt.group}: ${opt.option}`)
      .join(", ");

    addToCart({
      id: item.id,
      name: item.name,
      price: totalItemPrice,
      quantity,
      option: optionString,
      image: item.image,
    });

    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
    setSelectedOptions((prev) => {
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
          (opt) => opt.label === selectedLabel
        );
        return total + (selectedOption ? selectedOption.price : 0);
      }, 0) || 0);

    return (
      <div
        key={item.id}
        className="shiny-gold-card-bg rounded-lg p-4 flex flex-col items-center text-center"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 sm:h-40 object-cover rounded-md mb-3"
        />
        <h2 className="text-lg sm:text-xl font-cormorant font-semibold text-[#1A1A1A] mb-2">
          {item.name}
        </h2>
        <p className="text-base sm:text-lg font-bold text-[#D4A017] mb-3">
          ₦{currentPrice}
        </p>

        {item.optionGroups &&
          item.optionGroups.map((group) => (
            <div key={group.title} className="w-full mb-3">
              <p className="font-lora text-[#666] text-xs sm:text-sm mb-1">
                {group.title}:
              </p>
              <select
                className="w-full pl-3 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#D4A017] appearance-none sm:text-sm sm:py-3"
                onChange={(e) =>
                  handleOptionChange(item.id, group.title, e.target.value)
                }
                value={
                  selectedOptions[item.id]?.[group.title] || group.options[0].label
                }
              >
                {group.options.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label +
                      (option.price > 0 ? ` (+₦${option.price})` : "")}
                  </option>
                ))}
              </select>
            </div>
          ))}

        <div className="flex items-center space-x-3 mb-3">
          <button
            onClick={() => handleQuantityChange(item.id, -1)}
            className="btn-gold-outline rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs sm:text-sm"
          >
            -
          </button>
          <span className="text-base sm:text-lg font-semibold w-8 text-center text-[#1A1A1A]">
            {quantities[item.id] || 1}
          </span>
          <button
            onClick={() => handleQuantityChange(item.id, 1)}
            className="btn-gold-outline rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs sm:text-sm"
          >
            +
          </button>
        </div>

        <button
          onClick={() => handleAddToCart(item)}
          className="btn-gold font-lora text-xs sm:text-sm"
        >
          Add to Cart
        </button>
      </div>
    );
  };

  const renderSmallChopsItem = (item: MenuItem) => {
    return (
      <div key={item.id} className="flex flex-col items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 sm:h-40 object-cover rounded-md"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/10" />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-6 sm:px-6">
        <div className="max-w-sm mx-auto sm:max-w-md">
          <h1 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1A1A1A] text-center mb-6">
            Our Menu
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {menu.filter((item) => item.category === "main").map(renderInteractiveItem)}
          </div>

          <h1 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1A1A1A] text-center mb-6">
            Grills
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {menu.filter((item) => item.category === "grill").map(renderInteractiveItem)}
          </div>

          <h1 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1A1A1A] text-center mb-6">
            Small Chops and Events
          </h1>
          <p className="font-lora text-[#666] text-xs sm:text-sm text-center mb-4">
            Our selection of small chops and event items. Contact us for custom orders and pricing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menu.filter((item) => item.category === "small-chops").map(renderSmallChopsItem)}
          </div>
        </div>
      </main>

      {/* Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={onShowCart}
          className="fixed bottom-3 right-3 btn-gold font-lora text-xs sm:text-sm shadow-md z-20"
        >
          🛒 View Cart ({cart.length})
        </button>
      )}

      {/* Footer */}
      <footer className="bg-[#F8F4E3] py-8 relative border-t border-[#D4A017]/30 mt-6">
        <div className="max-w-sm mx-auto px-4 text-center sm:max-w-md sm:px-6">
          <p className="text-[#666] font-cormorant text-xs sm:text-sm mb-3">
            IkeOluwa Grills & Chops &copy; 2025 | Lagos, Nigeria
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://instagram.com" className="social-link text-xs sm:text-sm">
              Instagram
            </a>
            <a href="https://facebook.com" className="social-link text-xs sm:text-sm">
              Facebook
            </a>
            <a href="https://twitter.com" className="social-link text-xs sm:text-sm">
              Twitter
            </a>
          </div>
        </div>
      </footer>
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
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 container mx-auto px-4 py-6 sm:px-6">
        <div className="max-w-sm mx-auto sm:max-w-md shiny-gold-card-bg rounded-lg p-4">
          <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1A1A1A] mb-4 text-center">
            Your Cart
          </h2>
          {cart.length === 0 ? (
            <p className="font-lora text-[#666] text-xs sm:text-sm text-center">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => {
                let parsedOptions: CartOption[] = [];
                try {
                  if (item.option && item.option.trim() !== "") {
                    parsedOptions = item.option
                      .split(", ")
                      .map((opt) => {
                        const [group, option] = opt.split(": ");
                        return { group, option, price: 0 };
                      });
                  }
                } catch {
                  parsedOptions = item.option
                    ? [{ group: "Options", option: item.option, price: 0 }]
                    : [];
                }
                return (
                  <div
                    key={index}
                    className="flex flex-col border-b border-[#D4A017]/30 pb-3"
                  >
                    <div className="flex items-center w-full mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-3"
                      />
                      <div className="text-left flex-1">
                        <p className="font-cormorant text-base sm:text-lg font-semibold text-[#1A1A1A]">
                          {item.name}
                        </p>
                        {parsedOptions.length > 0 && (
                          <div className="mt-1 font-lora text-xs sm:text-sm text-[#666]">
                            {parsedOptions.map((opt, i) => (
                              <span key={i} className="block">
                                {opt.group}: {opt.option}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(index, -1)}
                          className="btn-gold-outline rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs sm:text-sm"
                        >
                          -
                        </button>
                        <span className="text-base sm:text-lg font-semibold w-8 text-center text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, 1)}
                          className="btn-gold-outline rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs sm:text-sm"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-base sm:text-lg font-bold text-[#D4A017]">
                          ₦{item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="font-lora text-red-500 hover:text-red-700 text-xs sm:text-sm mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-4 text-right">
            <span className="text-base sm:text-lg font-bold text-[#D4A017]">
              Total: ₦{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
            </span>
          </div>
          <div className="mt-4 flex flex-col space-y-3">
            <button
              onClick={onGoBack}
              className="btn-gold-outline font-lora text-xs sm:text-sm"
            >
              Back to Menu
            </button>
            {cart.length > 0 && (
              <button
                onClick={onProceedToCheckout}
                className="btn-gold font-lora text-xs sm:text-sm"
              >
                Checkout
              </button>
            )}
          </div>
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
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validatePhone = (phoneNumber: string) => {
    return /^\d{11}$/.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("handleSubmit called with cart:", cart);

    // Validate inputs
    if (!name || !phone || !address) {
      console.log("Validation failed: All fields are mandatory.");
      setError("All fields are mandatory.");
      setLoading(false);
      return;
    }

    if (!validatePhone(phone)) {
      console.log("Validation failed: Invalid phone number:", phone);
      setError("Please enter a valid 11-digit phone number.");
      setLoading(false);
      return;
    }

    // Validate cart
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      console.log("Validation failed: Cart is empty or invalid:", cart);
      setError("Cart is empty or invalid. Please add items to your cart.");
      setLoading(false);
      return;
    }

    try {
      const orderNumber = generateOrderNumber();
      console.log("Generated order number:", orderNumber);

      const orderDetails: OrderInfo = {
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        orderItems: cart,
        totalPrice: cart.reduce((total, item) => {
          if (!item.price || !item.quantity) {
            throw new Error(`Invalid cart item: ${JSON.stringify(item)}`);
          }
          return total + item.price * item.quantity;
        }, 0),
        orderNumber: orderNumber,
      };

      // Format order items for email
      const formattedOrderItems = orderDetails.orderItems
        .map((item) => {
          let itemText = `• ${item.name} x${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}`;
          if (item.option && item.option.trim() !== "") {
            itemText += `\n  └─ ${item.option}`;
          }
          return itemText;
        })
        .join('\n\n');

      // Get current date and time
      const orderTime = new Date().toLocaleString('en-NG', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      console.log("Preparing to send order via EmailJS...");

      // Create template parameters matching your EmailJS template variables
      const templateParams = {
        order_number: orderDetails.orderNumber,
        order_time: orderTime,
        customer_name: orderDetails.customerName,
        customer_phone: orderDetails.customerPhone,
        customer_address: orderDetails.customerAddress,
        order_items: formattedOrderItems,
        total_price: `₦${orderDetails.totalPrice.toLocaleString()}`
      };

      console.log("Template params:", templateParams);
      
      // Show success immediately for better UX
      console.log("Showing success modal immediately");
      onConfirmOrder(orderDetails);
      
      // Send email in background (don't await)
      emailjs.send(
        'service_3jb0m5n',      
        'template_44eijdh',    
        templateParams,
        'XJ4j-BxpbF5DXeASx'     
      ).then(() => {
        console.log("✅ Email sent successfully via EmailJS");
      }).catch((emailError) => {
        console.error("❌ Email send failed (but order was recorded):", emailError);
      });

    } catch (err) {
      console.error("❌ Error in order processing:", err);
      setError("Failed to send order. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
      console.log("Loading state reset to false");
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 container mx-auto px-4 py-6 sm:px-6">
        <div className="max-w-sm mx-auto sm:max-w-md shiny-gold-card-bg rounded-lg p-4">
          <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1A1A1A] mb-4 text-center">
            Checkout
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                👤
              </span>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                📞
              </span>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute left-2 top-3 text-[#D4A017] text-sm sm:text-base">
                📍
              </span>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery Address in Lagos"
                className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] resize-none sm:text-sm sm:pl-9 sm:py-3"
                rows={3}
                required
              ></textarea>
            </div>
            {error && (
              <p className="text-red-500 text-center font-lora text-xs sm:text-sm bg-red-50 p-2 rounded-md">
                {error}
              </p>
            )}
            <div className="flex flex-col space-y-3">
              <button
                type="button"
                onClick={onGoBack}
                className="btn-gold-outline font-lora text-xs sm:text-sm"
                disabled={loading}
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="btn-gold font-lora text-xs sm:text-sm"
                disabled={loading}
              >
                {loading ? "Sending Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
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
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
        <div className="shiny-gold-card-bg rounded-lg p-4 text-center w-full max-w-sm sm:max-w-md max-h-[80vh] overflow-y-auto">
          <h3 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1A1A1A] mb-3">
            Order Placed!
          </h3>
          <p className="font-lora text-[#666] text-xs sm:text-sm mb-4">
            Thank you for your order! Your payment will be collected upon delivery.
          </p>
          {orderInfo && (
            <>
              <div className="text-left space-y-3 mb-4">
                <div className="bg-[#D4A017]/10 p-3 rounded-md border border-[#D4A017]/30">
                  <h4 className="text-base sm:text-lg font-bold text-[#D4A017] mb-1">
                    Order Number
                  </h4>
                  <p className="text-base sm:text-lg font-mono font-bold text-[#1A1A1A]">
                    {orderInfo.orderNumber}
                  </p>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#D4A017]">
                  Customer Information
                </h4>
                <p className="font-lora text-xs sm:text-sm text-[#666]">
                  <strong>Name:</strong> {orderInfo.customerName}
                </p>
                <p className="font-lora text-xs sm:text-sm text-[#666]">
                  <strong>Contact:</strong> {orderInfo.customerPhone}
                </p>
                <p className="font-lora text-xs sm:text-sm text-[#666]">
                  <strong>Delivery Address:</strong> {orderInfo.customerAddress}
                </p>
              </div>
              <div className="text-left space-y-2 mb-4">
                <h4 className="text-base sm:text-lg font-bold text-[#D4A017]">
                  Meal Details
                </h4>
                {orderInfo.orderItems.map((item, index) => {
                  let parsedOptions: CartOption[] = [];
                  try {
                    if (item.option && item.option.trim() !== "") {
                      parsedOptions = item.option
                        .split(", ")
                        .map((opt) => {
                          const [group, option] = opt.split(": ");
                          return { group, option, price: 0 };
                        });
                    }
                  } catch {
                    parsedOptions = item.option
                      ? [{ group: "Options", option: item.option, price: 0 }]
                      : [];
                  }
                  return (
                    <div key={index} className="border-b border-[#D4A017]/30 pb-2">
                      <p className="font-lora text-xs sm:text-sm font-semibold text-[#1A1A1A]">
                        {item.name} x{item.quantity} - ₦{item.price * item.quantity}
                      </p>
                      {parsedOptions.length > 0 &&
                        parsedOptions.map((opt, i) => (
                          <p
                            key={i}
                            className="ml-3 font-lora text-xs sm:text-sm text-[#666]"
                          >
                            {opt.group}: {opt.option}
                          </p>
                        ))}
                    </div>
                  );
                })}
                <p className="text-base sm:text-lg font-bold text-[#D4A017] mt-3">
                  Total: ₦{orderInfo.totalPrice}
                </p>
              </div>
              <button
                onClick={onGoBack}
                className="btn-gold font-lora text-xs sm:text-sm"
              >
                Got It
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState("menu");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    console.log("showSuccessModal changed:", showSuccessModal);
    console.log("Current state: currentPage=", currentPage, "orderInfo=", orderInfo);
  }, [showSuccessModal, currentPage, orderInfo]);

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
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
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };

  const handleProceedToCheckout = () => {
    console.log("handleProceedToCheckout called, cart:", cart);
    setCurrentPage("checkout");
  };

  const handleConfirmOrder = (info: OrderInfo) => {
    console.log("handleConfirmOrder called with info:", info);
    setOrderInfo(info);
    setCart([]);
    setShowSuccessModal(true);
    // Don't set currentPage here, let showSuccessModal control the view
  };

  const handleGoBackFromModal = () => {
    console.log("handleGoBackFromModal called");
    setShowSuccessModal(false);
    setOrderInfo(null);
    setCurrentPage("menu");
  };

  return (
    <>
      <style>
        {`
          .font-cormorant { font-family: 'Cormorant Garamond', serif; }
          .font-lora { font-family: 'Lora', serif; }
          .btn-gold { padding: 0.75rem 1.5rem; background: #D4A017; color: #1A1A1A; font-weight: 500; border-radius: 9999px; transition: all 200ms; min-height: 44px; }
          .btn-gold:hover { background: #B88C14; transform: scale(1.02); }
          .btn-gold-outline { padding: 0.75rem 1.5rem; border: 1px solid #D4A017; color: #D4A017; border-radius: 9999px; transition: all 200ms; min-height: 44px; }
          .btn-gold-outline:hover { background: #D4A017; color: #1A1A1A; transform: scale(1.02); }
          .shiny-gold-card-bg { background: #F8F4E3; border: 1px solid #D4A017/50; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .social-link { color: #1A1A1A; transition: color 200ms; font-family: 'Cormorant Garamond', serif; }
          .social-link:hover { color: #D4A017; }
        `}
      </style>
      
      {/* Show success modal first if it's active */}
      {showSuccessModal ? (
        <CheckoutSuccessModal
          orderInfo={orderInfo}
          onGoBack={handleGoBackFromModal}
        />
      ) : (
        <>
          {/* Only show other pages when success modal is not active */}
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
        </>
      )}
    </>
  );
}