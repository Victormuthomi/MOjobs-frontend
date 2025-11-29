import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";

const Contact = () => (
  <section className="min-h-screen py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Contact Us
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-10">
        Need help? Reach out to us via email, phone, or WhatsApp.
      </p>

      <div className="space-y-6 text-left text-gray-700 dark:text-gray-300">
        {/* Email */}
        <a
          href="mailto:hello.mojobs@gmail.com"
          className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <Mail size={24} className="text-blue-600" />
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">Email</p>
            <p className="text-sm">hello.mojobs@gmail.com</p>
          </div>
        </a>

        {/* Phone Call */}
        <a
          href="tel:+254710210258"
          className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <Phone size={24} className="text-green-600" />
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">Phone</p>
            <p className="text-sm">07 102 102 58</p>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/254710210258"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <MessageCircle size={24} className="text-green-500" />
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              WhatsApp
            </p>
            <p className="text-sm">Chat with us instantly</p>
          </div>
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
