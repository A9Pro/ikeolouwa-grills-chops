"use client";

import { useState, useEffect } from "react";

// Function to generate order ID
const generateOrderId = () => {
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `AZ-${random}`; // AZ for new prefix
};

// Function to calculate time remaining
const calculateTimeRemaining = (targetDate: string | Date) => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    isExpired: false,
  };
};

// Countdown Timer Component
const CountdownTimer = ({ targetDate }: { targetDate: string | Date }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeRemaining.isExpired) {
    return (
      <div className="text-red-500 font-semibold text-center mt-3 text-xs sm:text-sm">
        Delivery Time Has Passed
      </div>
    );
  }

  return (
    <div className="mt-3">
      <p className="text-xs text-[#666] mb-2 font-lora text-center sm:text-sm">
        Time until your meal delivery:
      </p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {["days", "hours", "minutes", "seconds"].map((unit, i) => (
          <div
            key={i}
            className="bg-[#D4A017]/10 rounded-md p-2 border border-[#D4A017]/30"
          >
            <div className="text-base font-bold text-[#D4A017] sm:text-lg">
              {timeRemaining[unit as keyof typeof timeRemaining]}
            </div>
            <div className="text-xs text-[#666] font-lora">
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Meal Order type
interface MealOrder {
  id: string | null;
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  date: string;
  time: string;
  dateTime: string;
  mealQuantity: number;
  specialInstructions: string;
  createdAt: string;
  status: string;
}

const MealBookingPage = () => {
  const [view, setView] = useState<"form" | "success" | "tracking">("form");
  const [orders, setOrders] = useState<MealOrder[]>([]);
  const [currentOrder, setCurrentOrder] = useState<MealOrder | null>(null);
  const [trackingId, setTrackingId] = useState("");
  const [trackingError, setTrackingError] = useState("");

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    date: "",
    time: "",
    mealQuantity: 1,
    specialInstructions: "",
    id: null as string | null,
  });

  // Backgrounds
  const [backgroundImage, setBackgroundImage] = useState("/images/bg1.png");
  const backgroundImages = [
    "/images/bg1.png",
    "/images/bg2.png",
    "/images/bg3.png",
    "/images/bg4.png",
  ];

  useEffect(() => {
    const backgroundTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    }, 5000);

    return () => clearInterval(backgroundTimer);
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: name === "mealQuantity" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    if (formFields.id) {
      // Edit order
      const updatedOrders = orders.map((order) =>
        order.id === formFields.id
          ? {
              ...order,
              ...formFields,
              dateTime: `${formFields.date}T${formFields.time}`,
            }
          : order
      );
      setOrders(updatedOrders);
      setCurrentOrder(
        updatedOrders.find((order) => order.id === formFields.id) || null
      );
      setView("success");
    } else {
      // New order
      const orderId = generateOrderId();
      const deliveryDateTime = `${formFields.date}T${formFields.time}`;

      const newOrder: MealOrder = {
        id: orderId,
        name: formFields.name,
        email: formFields.email,
        phone: formFields.phone,
        deliveryAddress: formFields.deliveryAddress,
        date: formFields.date,
        time: formFields.time,
        dateTime: deliveryDateTime,
        mealQuantity: formFields.mealQuantity,
        specialInstructions: formFields.specialInstructions,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      };

      setOrders((prev) => [...prev, newOrder]);
      setCurrentOrder(newOrder);
      setView("success");
    }

    form.reset();
  };

  const handleMakeAnother = () => {
    setView("form");
    setCurrentOrder(null);
    setFormFields({
      name: "",
      email: "",
      phone: "",
      deliveryAddress: "",
      date: "",
      time: "",
      mealQuantity: 1,
      specialInstructions: "",
      id: null,
    });
  };

  const handleEditOrder = () => {
    if (currentOrder) {
      setFormFields({
        name: currentOrder.name,
        email: currentOrder.email,
        phone: currentOrder.phone,
        deliveryAddress: currentOrder.deliveryAddress,
        date: currentOrder.date,
        time: currentOrder.time,
        mealQuantity: currentOrder.mealQuantity,
        specialInstructions: currentOrder.specialInstructions,
        id: currentOrder.id,
      });
      setView("form");
    }
  };

  const handleTrackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const foundOrder = orders.find(
      (order) => order.id === trackingId.toUpperCase()
    );

    if (foundOrder) {
      setCurrentOrder(foundOrder);
      setView("success");
      setTrackingError("");
    } else {
      setTrackingError(
        "Order ID not found. Please check your ID and try again."
      );
    }

    form.reset();
  };

  // Custom styles
  const customStyles = `
    .font-cormorant { font-family: 'Cormorant Garamond', serif; }
    .font-lora { font-family: 'Lora', serif; }
    .nav-link { color: #1A1A1A; transition: color 200ms; position: relative; }
    .nav-link:hover { color: #D4A017; }
    .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 1px; background: #D4A017; transform: scaleX(0); transition: transform 200ms; transform-origin: left; }
    .nav-link:hover::after { transform: scaleX(1); }
    .btn-gold { padding: 0.75rem 1.5rem; background: #D4A017; color: #1A1A1A; font-weight: 500; border-radius: 9999px; transition: all 200ms; min-height: 44px; }
    .btn-gold:hover { background: #B88C14; transform: scale(1.02); }
    .btn-gold-outline { padding: 0.75rem 1.5rem; border: 1px solid #D4A017; color: #D4A017; border-radius: 9999px; transition: all 200ms; min-height: 44px; }
    .btn-gold-outline:hover { background: #D4A017; color: #1A1A1A; transform: scale(1.02); }
    .shiny-gold-card-bg { background: #F8F4E3; border: 1px solid #D4A017/50; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-white relative overflow-hidden pt-20">
        {/* Background Image Overlay */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-300"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/10" />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-6 sm:px-6">
          {view === "form" && (
            <div className="max-w-sm mx-auto sm:max-w-md">
              <div className="shiny-gold-card-bg rounded-lg p-5 sm:p-6">
                <div className="text-center mb-5">
                  <h1 className="font-cormorant text-2xl font-bold text-[#1A1A1A] mb-2 sm:text-3xl">
                    {formFields.id ? "Update Your Order" : "Book Your Meal"}
                  </h1>
                  <p className="font-lora text-[#666] text-xs leading-relaxed sm:text-sm">
                    Pre-order your favorite grills and chops for delivery.
                  </p>
                  <div className="mt-2 p-2 bg-green-50 rounded-md">
                    <p className="text-green-800 font-medium text-xs sm:text-sm">
                      🚚 Free Delivery in Asese, Maba, Mowe, Olowotedo, Ascon, Magboro, Ibafo, Arepo • Ready in 45-60 min
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                      👤
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formFields.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Full Name"
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                      ✉️
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formFields.email}
                      onChange={handleFormChange}
                      placeholder="Email Address (optional)"
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                      📞
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formFields.phone}
                      onChange={handleFormChange}
                      required
                      placeholder="Phone Number"
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                    />
                  </div>

                  {/* Delivery Address */}
                  <div className="relative">
                    <span className="absolute left-2 top-3 text-[#D4A017] text-sm sm:text-base">
                      📍
                    </span>
                    <textarea
                      name="deliveryAddress"
                      value={formFields.deliveryAddress}
                      onChange={handleFormChange}
                      required
                      placeholder="Delivery Address"
                      rows={3}
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] resize-none sm:text-sm sm:pl-9 sm:py-3"
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                        📅
                      </span>
                      <input
                        type="date"
                        name="date"
                        value={formFields.date}
                        onChange={handleFormChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                        ⏰
                      </span>
                      <select
                        name="time"
                        value={formFields.time}
                        onChange={handleFormChange}
                        required
                        className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] appearance-none sm:text-sm sm:pl-9 sm:py-3"
                      >
                        <option value="">Select Time</option>
                        {Array.from({ length: 48 }, (_, i) => {
                          const hours = Math.floor(i / 2);
                          const minutes = i % 2 === 0 ? "00" : "30";
                          const time = `${hours.toString().padStart(2, "0")}:${minutes}`;
                          return (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Number of Meals */}
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                      🍽️
                    </span>
                    <input
                      type="number"
                      name="mealQuantity"
                      value={formFields.mealQuantity}
                      onChange={handleFormChange}
                      min="1"
                      max="1000"
                      required
                      placeholder="Number of Meals"
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] sm:text-sm sm:pl-9 sm:py-3"
                    />
                  </div>

                  {/* Special Instructions */}
                  <div className="relative">
                    <span className="absolute left-2 top-3 text-[#D4A017] text-sm sm:text-base">
                      📝
                    </span>
                    <textarea
                      name="specialInstructions"
                      value={formFields.specialInstructions}
                      onChange={handleFormChange}
                      placeholder="Special Instructions (e.g., dietary preferences)"
                      rows={3}
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] resize-none sm:text-sm sm:pl-9 sm:py-3"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full btn-gold font-lora text-xs sm:text-sm"
                  >
                    {formFields.id ? "Update Order" : "Confirm Booking"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {view === "success" && currentOrder && (
            <div className="max-w-sm mx-auto sm:max-w-md">
              <div className="shiny-gold-card-bg rounded-lg p-5 sm:p-6 text-center">
                <div className="text-4xl mb-3 sm:text-5xl">🎉</div>
                <h2 className="font-cormorant text-xl font-bold text-[#1A1A1A] mb-2 sm:text-2xl">
                  Order Confirmed!
                </h2>
                <p className="font-lora text-[#666] text-xs mb-3 sm:text-sm">
                  Your meal booking is confirmed. We'll contact you soon.
                </p>

                <div className="bg-white/95 rounded-md p-3 mb-3 text-left sm:p-4">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-[#666]">Order ID:</span>
                      <span className="font-bold text-[#D4A017]">{currentOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#666]">Name:</span>
                      <span className="text-[#1A1A1A]">{currentOrder.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#666]">Phone:</span>
                      <span className="text-[#1A1A1A]">{currentOrder.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#666]">Delivery Date:</span>
                      <span className="text-[#1A1A1A]">
                        {new Date(currentOrder.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#666]">Delivery Time:</span>
                      <span className="text-[#1A1A1A]">{currentOrder.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-[#666]">Meals:</span>
                      <span className="text-[#1A1A1A]">{currentOrder.mealQuantity}</span>
                    </div>
                    {currentOrder.specialInstructions && (
                      <div className="pt-2 border-t border-[#D4A017]/20">
                        <span className="font-medium text-[#666]">Special Instructions:</span>
                        <p className="text-[#1A1A1A] mt-1 text-xs sm:text-sm">
                          {currentOrder.specialInstructions}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <CountdownTimer targetDate={currentOrder.dateTime} />

                <div className="flex gap-2 mt-4 sm:gap-3">
                  <button
                    onClick={handleEditOrder}
                    className="flex-1 btn-gold-outline font-lora text-xs sm:text-sm"
                  >
                    Edit Order
                  </button>
                  <button
                    onClick={handleMakeAnother}
                    className="flex-1 btn-gold font-lora text-xs sm:text-sm"
                  >
                    New Booking
                  </button>
                </div>

                <div className="mt-3 p-2 bg-blue-50 rounded-md sm:p-3">
                  <p className="text-blue-800 text-xs font-medium sm:text-sm">
                    📱 We'll call you to confirm menu and delivery details
                  </p>
                  <p className="text-blue-700 text-xs mt-1 sm:text-sm">
                    💳 Payment: Cash on delivery or bank transfer
                  </p>
                </div>
              </div>
            </div>
          )}

          {view === "tracking" && (
            <div className="max-w-sm mx-auto sm:max-w-md">
              <div className="shiny-gold-card-bg rounded-lg p-5 sm:p-6">
                <div className="text-center mb-5">
                  <h2 className="font-cormorant text-xl font-bold text-[#1A1A1A] mb-2 sm:text-2xl">
                    Track Your Order
                  </h2>
                  <p className="font-lora text-[#666] text-xs sm:text-sm">
                    Enter your order ID (e.g., AZ-1234) to view details
                  </p>
                </div>

                <form onSubmit={handleTrackSubmit} className="space-y-3">
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-sm sm:text-base">
                      🔍
                    </span>
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      required
                      placeholder="Order ID (e.g., AZ-1234)"
                      className="w-full pl-8 pr-3 py-2.5 border border-[#D4A017]/50 rounded-lg bg-white/95 font-lora text-xs placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] uppercase sm:text-sm sm:pl-9 sm:py-3"
                    />
                  </div>

                  {trackingError && (
                    <div className="text-red-500 text-center font-lora text-xs bg-red-50 p-2 rounded-md sm:text-sm">
                      {trackingError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-gold font-lora text-xs sm:text-sm"
                  >
                    Track Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("form")}
                    className="w-full btn-gold-outline font-lora text-xs sm:text-sm"
                  >
                    ← Back to Booking
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Track Order Button */}
        {view !== "tracking" && (
          <button
            onClick={() => setView("tracking")}
            className="fixed bottom-3 right-3 bg-[#D4A017] text-[#1A1A1A] px-3 py-2 rounded-full font-lora text-xs font-medium shadow-md hover:bg-[#B88C14] transition-colors z-20 sm:text-sm sm:px-4 sm:py-2.5"
          >
            🔍 Track Order
          </button>
        )}
      </div>
    </>
  );
};

export default MealBookingPage;