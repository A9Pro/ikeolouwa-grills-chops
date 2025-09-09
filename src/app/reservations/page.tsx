"use client";

import { useState, useEffect } from 'react';

// Function to generate reservation ID
const generateReservationId = () => {
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `AZ-${random}`;
};

// Function to calculate time remaining
const calculateTimeRemaining = (targetDate) => {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
};

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeRemaining.isExpired) {
    return (
      <div className="text-red-500 font-semibold text-center mt-4">
        Reservation Time Has Passed
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-[#666] mb-2 font-['Lora']">Time until your reservation:</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-[#D4A017]/20 rounded-lg p-2 border border-[#D4A017]">
          <div className="text-xl font-bold text-[#D4A017]">{timeRemaining.days}</div>
          <div className="text-xs text-[#666]">Days</div>
        </div>
        <div className="bg-[#D4A017]/20 rounded-lg p-2 border border-[#D4A017]">
          <div className="text-xl font-bold text-[#D4A017]">{timeRemaining.hours}</div>
          <div className="text-xs text-[#666]">Hours</div>
        </div>
        <div className="bg-[#D4A017]/20 rounded-lg p-2 border border-[#D4A017]">
          <div className="text-xl font-bold text-[#D4A017]">{timeRemaining.minutes}</div>
          <div className="text-xs text-[#666]">Minutes</div>
        </div>
        <div className="bg-[#D4A017]/20 rounded-lg p-2 border border-[#D4A017]">
          <div className="text-xl font-bold text-[#D4A017]">{timeRemaining.seconds}</div>
          <div className="text-xs text-[#666]">Seconds</div>
        </div>
      </div>
    </div>
  );
};

// The main component for the reservations page
const ReservationsPage = () => {
  // State to manage the current view: 'form', 'success', or 'tracking'
  const [view, setView] = useState('form');
  // State to store a list of all reservations made
  const [reservations, setReservations] = useState([]);
  // State to hold the current reservation being viewed
  const [currentReservation, setCurrentReservation] = useState(null);
  // State for the tracking page input and error
  const [trackingId, setTrackingId] = useState('');
  const [trackingError, setTrackingError] = useState('');
  
  // State for the reservation form fields
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    id: null, // to track if we are editing an existing reservation
  });

  // State to manage the random background image
  const [backgroundImage, setBackgroundImage] = useState('');
  const backgroundImages = [
    '/images/bg1.png',
    '/images/bg2.png',
    '/images/bg3.png',
    '/images/bg4.png',
  ];

  // Effect to handle the random background image cycling
  useEffect(() => {
    const backgroundTimer = setInterval(() => {
      // Randomly decide if a background should appear or disappear
      const shouldShow = Math.random() > 0.5;
      if (shouldShow) {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        setBackgroundImage(backgroundImages[randomIndex]);
      } else {
        setBackgroundImage('');
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(backgroundTimer);
  }, []); // Empty dependency array means this runs once on component mount

  // Function to handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if we are editing an existing reservation
    if (formFields.id) {
      // Find and update the existing reservation
      const updatedReservations = reservations.map(res =>
        res.id === formFields.id
          ? { ...res, ...formFields, dateTime: `${formFields.date}T${formFields.time}` }
          : res
      );
      setReservations(updatedReservations);
      setCurrentReservation(updatedReservations.find(res => res.id === formFields.id));
      console.log("Reservation updated:", updatedReservations.find(res => res.id === formFields.id));
      setView('success');
    } else {
      // Create a new reservation
      const reservationId = generateReservationId();
      const reservationDateTime = `${formFields.date}T${formFields.time}`;
      
      const newReservation = {
        id: reservationId,
        name: formFields.name,
        email: formFields.email,
        phone: formFields.phone,
        date: formFields.date,
        time: formFields.time,
        dateTime: reservationDateTime,
        guests: parseInt(formFields.guests),
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };

      // Store the new reservation in state
      setReservations(prevReservations => [...prevReservations, newReservation]);
      setCurrentReservation(newReservation);
      console.log("Reservation created:", newReservation);
      setView('success');
    }
  };

  // Function to handle making another reservation
  const handleMakeAnother = () => {
    setView('form');
    setCurrentReservation(null);
    setFormFields({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: 1,
      id: null,
    });
  };

  // Function to handle editing a reservation
  const handleEditReservation = () => {
    if (currentReservation) {
      setFormFields({
        name: currentReservation.name,
        email: currentReservation.email,
        phone: currentReservation.phone,
        date: currentReservation.date,
        time: currentReservation.time,
        guests: currentReservation.guests,
        id: currentReservation.id,
      });
      setView('form');
    }
  };

  // Function to switch to the tracking page
  const showTrackingPage = () => {
    setView('tracking');
    setTrackingError(''); // Clear any previous errors
  };

  // Function to handle tracking form submission
  const handleTrackSubmit = (e) => {
    e.preventDefault();
    // Find the reservation in our state by ID
    const foundReservation = reservations.find(res => res.id === trackingId.toUpperCase());
    
    if (foundReservation) {
      setCurrentReservation(foundReservation);
      setView('success'); // Reuse the success page to show details and countdown
      setTrackingError('');
    } else {
      setTrackingError('Reservation ID not found. Please check your ID and try again.');
    }
  };

  // Custom styles are embedded here to keep the component a single, self-contained file.
  // This is a workaround for the single file mandate and allows for complex styling
  // that isn't easily done with Tailwind classes alone.
  const customStyles = `
    .font-cormorant {
      font-family: 'Cormorant Garamond', serif;
    }
    .font-lora {
      font-family: 'Lora', serif;
    }
    .nav-link {
      color: #4A4A4A;
      transition-property: color;
      transition-duration: 300ms;
      position: relative;
    }
    .nav-link:hover {
      color: #D4A017;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #D4A017;
      transform: scaleX(0);
      transition-property: transform;
      transition-duration: 300ms;
      transform-origin: left;
    }
    .nav-link:hover::after {
      transform: scaleX(1);
    }
    .btn-gold {
      padding: 1rem 2.5rem; /* px-10 py-3 */
      background-color: #D4A017;
      color: #1A1A1A;
      font-weight: 600;
      border-radius: 9999px; /* rounded-full */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); /* shadow-lg */
      transition-property: all;
      transition-duration: 300ms;
    }
    .btn-gold:hover {
      background-color: #B88C14;
      transform: scale(1.05);
    }
    .btn-gold-outline {
      padding: 1rem 2.5rem; /* px-10 py-3 */
      background-color: transparent;
      color: #D4A017;
      font-weight: 600;
      border-radius: 9999px; /* rounded-full */
      border: 2px solid #D4A017;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); /* shadow-lg */
      transition-property: all;
      transition-duration: 300ms;
    }
    .btn-gold-outline:hover {
      background-color: #D4A017;
      color: #1A1A1A;
      transform: scale(1.05);
    }
    .shiny-gold-card-bg {
      background-color: #F8F4E3;
      border: 1px solid #D4A017;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.4);
      position: relative;
      overflow: hidden;
    }
    .shiny-gold-card-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%);
      mix-blend-mode: overlay;
      pointer-events: none;
    }
    .patterned-cream-bg {
      background-color: #F8F4E3;
      border-top: 1px solid #D4A017;
      border-bottom: 1px solid #D4A017;
    }
    .social-link {
      color: #4A4A4A;
      transition-property: color;
      transition-duration: 300ms;
      font-size: 0.875rem; /* text-sm */
      font-family: 'Cormorant Garamond';
    }
    .social-link:hover {
      color: #D4A017;
    }
    @media (min-width: 768px) {
      .social-link {
        font-size: 1rem; /* md:text-base */
      }
    }
    @media (max-width: 640px) {
      .nav-link { font-size: 0.8rem; margin: 0 0.25rem; }
      .flex.space-x-6 { flex-direction: column; gap: 1rem; }
      .grid-cols-3 { grid-template-columns: 1fr; }
      h1 { font-size: 3rem; }
      h2 { font-size: 2rem; }
      p { font-size: 1rem; }
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen text-[#1A1A1A] font-playfair antialiased transition-background duration-1000" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', backgroundColor: '#F8F4E3', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Global Background Pattern - Replaced image with a gradient since images are not supported */}
        <div className="fixed inset-0 z-0 opacity-70 bg-gradient-to-br from-[#F8F4E3] via-transparent to-[#D4A017]"></div>
        <div className="fixed inset-0 z-0 bg-[#F8F4E3] opacity-30"></div>

        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full bg-[#F8F4E3]/90 backdrop-blur-sm z-20 shadow-lg border-b border-[#D4A017]/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="group">
              <img
                src="/images/logo.png"
                alt="IkeOluwa Logo"
                className="w-16 h-16 object-contain filter drop-shadow-md"
              />
            </a>
            <div className="space-x-8 text-lg font-['Cormorant_Garamond'] font-medium text-[#4A4A4A]">
              <a href="/" className="nav-link">Home</a>
              <a href="/menu" className="nav-link">Menu</a>
              <a href="/reservations" className="nav-link">Reservations</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/about" className="nav-link">Contact</a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden pt-28">
          <div className="absolute inset-0 bg-black/50 z-0"></div>

          <div id="reservation-card" className="relative rounded-3xl p-8 sm:p-16 shadow-2xl max-w-2xl text-center z-10 flex flex-col items-center shiny-gold-card-bg">
            
            {/* Conditional Rendering based on 'view' state */}
            {view === 'form' && (
              <>
                <h1 className="text-6xl font-['Cormorant_Garamond'] text-[#D4A017] mb-4 drop-shadow-md">
                  {formFields.id ? 'Edit Reservation' : 'Make a Reservation'}
                </h1>
                <p className="text-xl font-['Lora'] text-[#555] max-w-prose mb-8 italic">
                  Secure your table for an unforgettable dining experience.
                </p>
                <form id="reservation-form" onSubmit={handleSubmit} className="w-full space-y-6">
                  {/* Form fields */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.4 304 0 383.4 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.4 368.6 304 269.7 304H178.3z"/></svg>
                    </span>
                    <input type="text" name="name" value={formFields.name} onChange={handleFormChange} placeholder="Full Name" required className="w-full pl-12 pr-4 py-3 rounded-full bg-[#F8F4E3] border border-[#D4A017] text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#D4A017]" />
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V400c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                    </span>
                    <input type="email" name="email" value={formFields.email} onChange={handleFormChange} placeholder="Email Address" required className="w-full pl-12 pr-4 py-3 rounded-full bg-[#F8F4E3] border border-[#D4A017] text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#D4A017]" />
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64c0 29.3 86.2 160.2 193.4 267.6c9.1 9.1 23.4 12.1 35.5 10c-3.1-6.1-4.7-12.8-4.7-20.4c0-24.8 20.2-45 45-45h103c24.8 0 45 20.2 45 45c0 17.6-10.4 33.1-26.3 40.5l-24 88c-5.3 19.4 4.6 39.7 23.2 47.4l112 48c18.6 7.7 39.9-2.5 47.6-21.1l48-112c7.7-18.6-2.5-39.9-21.1-47.6l-88-24c-19.4-5.3-39.7 4.6-47.4 23.2l-24 88c-2.3 8.3-9.5 14.1-18.3 15.2c-5.4.7-10.8.9-16.3.9l-112 0c-48.4 0-93.3-19.4-126.6-52.7L24 163.7C-8.7 130.4-8.7 76.5 24 43.8L43.8 24z"/></svg>
                    </span>
                    <input type="tel" name="phone" value={formFields.phone} onChange={handleFormChange} placeholder="Phone Number" required className="w-full pl-12 pr-4 py-3 rounded-full bg-[#F8F4E3] border border-[#D4A017] text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#D4A017]" />
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4">
                    <div className="relative w-full">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current"><path d="M128 0c13.3 0 24 10.7 24 24V64H296V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64h48c26.5 0 48 21.5 48 48v24c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24v-24c0-26.5 21.5-48 48-48h48V24c0-13.3 10.7-24 24-24s24 10.7 24 24V64H296V24zM0 192V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0zm96 80c0-8.8 7.2-16 16-16h224c8.8 0 16 7.2 16 16v128c0 8.8-7.2 16-16 16H112c-8.8 0-16-7.2-16-16V272z"/></svg>
                      </span>
                      <input type="date" name="date" value={formFields.date} onChange={handleFormChange} required min={new Date().toISOString().split('T')[0]} className="w-full pl-12 pr-4 py-3 rounded-full bg-[#F8F4E3] border border-[#D4A017] text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#D4A017]" />
                    </div>
                    <div className="relative w-full">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.5 4.3 32.9-6.7s4.3-25.5-6.7-32.9L280 236.4V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                      </span>
                      <input type="time" name="time" value={formFields.time} onChange={handleFormChange} required className="w-full pl-12 pr-4 py-3 rounded-full bg-[#F8F4E3] border border-[#D4A017] text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#D4A017]" />
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.4 304 0 383.4 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.4 368.6 304 269.7 304H178.3z"/></svg>
                    </span>
                    <input type="number" name="guests" min="1" max="20" value={formFields.guests} onChange={handleFormChange} placeholder="Number of Guests" required className="w-full pl-12 pr-4 py-3 rounded-full bg-[#F8F4E3] border border-[#D4A017] text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#D4A017]" />
                  </div>
                  <button type="submit" className="btn-gold-outline w-full mt-6">
                    {formFields.id ? 'Save Changes' : 'Submit Reservation'}
                  </button>
                </form>
              </>
            )}
            
            {view === 'success' && (
              <div id="reservation-success-container" className="w-full">
                <h2 className="text-4xl font-['Cormorant_Garamond'] text-[#D4A017] mb-4 drop-shadow-md">
                  Reservation Confirmed!
                </h2>
                
                {/* Reservation ID Display */}
                <div className="bg-[#D4A017]/10 rounded-lg p-4 mb-6 border border-[#D4A017]">
                  <h3 className="text-lg font-semibold text-[#D4A017] mb-1">Your Reservation ID</h3>
                  <p className="text-2xl font-mono font-bold text-[#1A1A1A]">{currentReservation?.id}</p>
                </div>

                {/* Reservation Details */}
                <div className="text-left mb-6 space-y-2">
                  <p className="text-lg font-['Lora'] text-[#555]">
                    <strong>Name:</strong> {currentReservation?.name}
                  </p>
                  <p className="text-lg font-['Lora'] text-[#555]">
                    <strong>Date:</strong> {currentReservation ? new Date(currentReservation.date).toLocaleDateString() : ''}
                  </p>
                  <p className="text-lg font-['Lora'] text-[#555]">
                    <strong>Time:</strong> {currentReservation?.time}
                  </p>
                  <p className="text-lg font-['Lora'] text-[#555]">
                    <strong>Guests:</strong> {currentReservation?.guests}
                  </p>
                </div>

                {/* Countdown Timer */}
                {currentReservation && (
                  <CountdownTimer targetDate={currentReservation.dateTime} />
                )}

                <p className="text-lg font-['Lora'] text-[#555] mt-6 mb-6">
                  Thank you, your reservation has been successfully submitted. Save your reservation ID for tracking. We look forward to seeing you.
                </p>
                
                <div className="flex flex-col space-y-4">
                  <button onClick={handleEditReservation} className="btn-gold">
                    Edit This Reservation
                  </button>
                  <button onClick={handleMakeAnother} className="btn-gold-outline">
                    Make Another Reservation
                  </button>
                  <button onClick={showTrackingPage} className="btn-gold-outline">
                    Track Another Reservation
                  </button>
                </div>
              </div>
            )}
            
            {view === 'tracking' && (
              <div id="tracking-page-container" className="w-full">
                <h2 className="text-4xl font-['Cormorant_Garamond'] text-[#D4A017] mb-4 drop-shadow-md">
                  Track Your Reservation
                </h2>
                <p className="text-xl font-['Lora'] text-[#555] max-w-prose mb-8 italic">
                  Enter your reservation ID to view your details and live countdown.
                </p>
                <form id="tracking-form" onSubmit={handleTrackSubmit} className="w-full space-y-6">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4A017]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.5 4.3 32.9-6.7s4.3-25.5-6.7-32.9L280 236.4V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                    </span>
                    <input
                      type="text"
                      name="reservationId"
                      placeholder="Enter AZ-XXXX ID"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-full bg-[#F8F4E3] border border-[#D4A017] text-[#1A1A1A] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                    />
                  </div>
                  {trackingError && (
                    <p className="text-red-500 text-sm mt-2">{trackingError}</p>
                  )}
                  <button type="submit" className="btn-gold-outline w-full mt-6">
                    Track Reservation
                  </button>
                  <button onClick={handleMakeAnother} className="btn-gold">
                    Make a New Reservation
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* Floating 'Track My Reservation' button on the main form page */}
          {view === 'form' && (
            <button
              onClick={showTrackingPage}
              className="fixed bottom-8 right-8 btn-gold-outline z-20 py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.5 4.3 32.9-6.7s4.3-25.5-6.7-32.9L280 236.4V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                <span className="text-sm font-semibold">Track My Reservation</span>
              </span>
            </button>
          )}

        </main>

        {/* Footer */}
        <footer className="bg-[#F8F4E3] py-12 relative border-t border-t-[#D4A017]/30 patterned-cream-bg">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <p className="text-[#333] font-['Cormorant_Garamond'] mb-4">
              IkeOluwa Grills & Chops &copy; 2025 | Lagos, Nigeria
            </p>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://instagram.com" className="social-link">Instagram</a>
              <a href="https://facebook.com" className="social-link">Facebook</a>
              <a href="https://twitter.com" className="social-link">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ReservationsPage;
