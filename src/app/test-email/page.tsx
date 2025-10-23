"use client";

import { useState } from "react";

export default function TestEmailPage() {
  const [status, setStatus] = useState("");

  const sendTestEmail = async () => {
    setStatus("Sending...");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "New Order",
          text: "A new order has been placed.",
          html: "<p>A new order has been placed.</p>",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Email sent successfully!");
      } else {
        setStatus(`❌ Failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      setStatus("❌ Error: " + err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Test Email Sender</h1>
      <button
        onClick={sendTestEmail}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        Send Test Email
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
