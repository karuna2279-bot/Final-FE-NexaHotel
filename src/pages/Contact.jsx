import React from "react";
import ContactImage from '../assets/ContactImage.jfif';
import hotel from '../assets/hotel.jfif';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[400px]">
        <img
          src={ContactImage}
          alt="Contact Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      {/* Contact Info + Form */}
      <section className="py-16 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            We’re here to help with bookings, inquiries, or special requests.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li>📍 123 Nexa Street, Egmore, Chennai, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ info@nexahotel.com</li>
          </ul>
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={hotel}
              alt="Hotel Location"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white">Our Location</h2>
            </div>
          </div>

        </div>

        {/* Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
