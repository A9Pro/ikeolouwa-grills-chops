"use client";

import { useState, useEffect } from "react";

// Function to generate order ID
const generateOrderId = () => {
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `IG-${random}`; // IG for IkeOluwa Grills
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
      <div className="text-red-500 font-semibold text-center mt-4 text-sm">
        Delivery Time Has Passed
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-xs text-[#666] mb-2 font-lora text-center">
        Time until your meal delivery:
      </p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {["days", "hours", "minutes", "seconds"].map((unit, i) => (
          <div
            key={i}
            className="bg-[#D4A017]/10 rounded-lg p-2 border border-[#D4A017]/50"
          >
            <div className="text-lg font-bold text-[#D4A017]">
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
    .nav-link { color: #4A4A4A; transition: color 200ms; position: relative; }
    .nav-link:hover { color: #D4A017; }
    .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 1px; background: #D4A017; transform: scaleX(0); transition: transform 200ms; transform-origin: left; }
    .nav-link:hover::after { transform: scaleX(1); }
    .btn-gold { padding: 0.75rem 2rem; background: #D4A017; color: #1A1A1A; font-weight: 600; border-radius: 9999px; transition: all 200ms; }
    .btn-gold:hover { background: #B88C14; transform: scale(1.03); }
    .btn-gold-outline { padding: 0.75rem 2rem; border: 2px solid #D4A017; color: #D4A017; border-radius: 9999px; transition: all 200ms; }
    .btn-gold-outline:hover { background: #D4A017; color: #1A1A1A; transform: scale(1.03); }
    .shiny-gold-card-bg { background: #F8F4E3; border: 1px solid #D4A017; box-shadow: 0 4px 20px rgba(0,0,0,0.15), inset 0 0 10px rgba(255,215,0,0.2); }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden pt-20">
        {/* Background Image Overlay */}
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 transition-opacity duration-500"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/90 to-red-50/90" />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 py-6">
          {view === "form" && (
            <div className="max-w-md mx-auto">
              <div className="shiny-gold-card-bg rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h1 className="font-cormorant text-3xl font-bold text-[#1A1A1A] mb-2 sm:text-4xl">
                    {formFields.id ? "Update Your Order" : "Book Your Meal"}
                  </h1>
                  <p className="font-lora text-[#666] text-sm leading-relaxed sm:text-base">
                    Pre-order your favorite grills and chops for delivery at your preferred date and time.
                  </p>
                  <div className="mt-3 p-2 bg-green-100 rounded-lg">
                    <p className="text-green-800 font-semibold text-xs sm:text-sm">
                      🚚 Free Delivery within Lagos • Ready in 45-60 min
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-base">
                      👤
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formFields.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 border border-[#D4A017] rounded-lg bg-white/90 font-lora text-sm placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors sm:text-base"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-base">
                      ✉️
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formFields.email}
                      onChange={handleFormChange}
                      placeholder="Email Address (optional)"
                      className="w-full pl-10 pr-4 py-3 border border-[#D4A017] rounded-lg bg-white/90 font-lora text-sm placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors sm:text-base"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-base">
                      📞
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formFields.phone}
                      onChange={handleFormChange}
                      required
                      placeholder="Phone Number"
                      className="w-full pl-10 pr-4 py-3 border border-[#D4A017] rounded-lg bg-white/90 font-lora text-sm placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors sm:text-base"
                    />
                  </div>

                  {/* Delivery Address */}
                  <div className="relative">
                    <span className="absolute left-3 top-4 text-[#D4A017] text-base">
                      📍
                    </span>
                    <textarea
                      name="deliveryAddress"
                      value={formFields.deliveryAddress}
                      onChange={handleFormChange}
                      required
                      placeholder="Delivery Address in Lagos"
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-[#D4A017] rounded-lg bg-white/90 font-lora text-sm placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors resize-none sm:text-base"
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-base">
                        📅
                      </span>
                      <input
                        type="date"
                        name="date"
                        value={formFields.date}
                        onChange={handleFormChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3 border border-[#D4A017] rounded-lg bg-white/90 font-lora text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors sm:text-base"
                      />
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-base">
                        ⏰
                      </span>
                      <select
                        name="time"
                        value={formFields.time}
                        onChange={handleFormChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-[#D4A017] rounded-lg bg-white/90 font-lora text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors appearance-none sm:text-base"
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
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-base">
                      🍽️
                    </span>
                    <input
                      type="number"
                      name="mealQuantity"
                      value={formFields.mealQuantity}
                      onChange={handleFormChange}
                      min="1"
                      max="20"
                      required
                      placeholder="Number of Meals"
                      className="w-full pl-10 pr-4 py-3 border border-[#D4A017] rounded-lg bg-white/90 font-lora text-sm placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors sm:text-base"
                    />
                  </div>

                  {/* Special Instructions */}
                  <div className="relative">
                    <span className="absolute left-3 top-4 text-[#D4A017] text-base">
                      📝
                    </span>
                    <textarea
                      name="specialInstructions"
                      value={formFields.specialInstructions}
                      onChange={handleFormChange}
                      placeholder="Special Instructions (e.g., dietary preferences)"
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-[#D4A017] rounded-lg bg-white/90 font-lora text-sm placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors resize-none sm:text-base"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full btn-gold font-lora text-sm sm:text-base"
                  >
                    {formFields.id ? "Update Order" : "Confirm Booking"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {view === "success" && currentOrder && (
            <div className="max-w-md mx-auto">
              <div className="shiny-gold-card-bg rounded-xl p-6 shadow-lg text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="font-cormorant text-2xl font-bold text-[#1A1A1A] mb-3 sm:text-3xl">
                  Order Confirmed!
                </h2>
                <p className="font-lora text-[#666] text-sm mb-4 sm:text-base">
                  Your meal booking is confirmed. We'll contact you soon to discuss menu and payment.
                </p>

                <div className="bg-white/70 rounded-lg p-4 mb-4 text-left">
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#666]">Order ID:</span>
                      <span className="font-bold text-[#D4A017]">{currentOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#666]">Name:</span>
                      <span className="text-[#1A1A1A]">{currentOrder.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#666]">Phone:</span>
                      <span className="text-[#1A1A1A]">{currentOrder.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#666]">Delivery Date:</span>
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
                      <span className="font-semibold text-[#666]">Delivery Time:</span>
                      <span className="text-[#1A1A1A]">{currentOrder.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#666]">Meals:</span>
                      <span className="text-[#1A1A1A]">{currentOrder.mealQuantity}</span>
                    </div>
                    {currentOrder.specialInstructions && (
                      <div className="pt-2 border-t border-[#D4A017]/20">
                        <span className="font-semibold text-[#666]">Special Instructions:</span>
                        <p className="text-[#1A1A1A] mt-1 text-sm sm:text-base">
                          {currentOrder.specialInstructions}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <CountdownTimer targetDate={currentOrder.dateTime} />

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleEditOrder}
                    className="flex-1 btn-gold-outline font-lora text-sm sm:text-base"
                  >
                    Edit Order
                  </button>
                  <button
                    onClick={handleMakeAnother}
                    className="flex-1 btn-gold font-lora text-sm sm:text-base"
                  >
                    New Booking
                  </button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-xs font-semibold sm:text-sm">
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
            <div className="max-w-md mx-auto">
              <div className="shiny-gold-card-bg rounded-xl p-6 shadow-lg">
                <div className="text-center mb-6">
                  <h2 className="font-cormorant text-2xl font-bold text-[#1A1A1A] mb-2 sm:text-3xl">
                    Track Your Order
                  </h2>
                  <p className="font-lora text-[#666] text-sm sm:text-base">
                    Enter your order ID to view booking details
                  </p>
                </div>

                <form onSubmit={handleTrackSubmit} className="space-y-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4A017] text-base">
                      🔍
                    </span>
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      required
                      placeholder="Order ID (e.g., IG-1234)"
                      className="w-full pl-10 pr-4 py-3 border border-[#D4A017] rounded-lg bg-white/90 font-lora text-sm placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors uppercase sm:text-base"
                    />
                  </div>

                  {trackingError && (
                    <div className="text-red-500 text-center font-lora text-xs bg-red-50 p-2 rounded-lg sm:text-sm">
                      {trackingError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full btn-gold font-lora text-sm sm:text-base"
                  >
                    Track Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("form")}
                    className="w-full btn-gold-outline font-lora text-sm sm:text-base"
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
            className="fixed bottom-4 right-4 bg-[#D4A017] text-[#1A1A1A] px-4 py-2 rounded-full font-lora text-sm font-semibold shadow-lg hover:bg-[#B88C14] transition-colors z-20 sm:text-base sm:px-6 sm:py-3"
          >
            🔍 Track Order
          </button>
        )}
      </div>
    </>
  );
};

export default MealBookingPage;