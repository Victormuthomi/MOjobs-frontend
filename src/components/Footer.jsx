import React from "react";
import { Facebook, Instagram, Linkedin, Twitter as XIcon } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 py-10 text-sm text-gray-600 dark:text-gray-400"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6 items-center">
        {/* Logo / Brand */}
        <div className="text-lg font-bold text-gray-800 dark:text-white hover:scale-105 transition">
          AjiriNow
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            aria-label="X"
            className="hover:text-black dark:hover:text-white transition"
          >
            <XIcon size={20} />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-pink-600 dark:hover:text-pink-400 transition"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-blue-700 dark:hover:text-blue-500 transition"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 text-sm">
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} AjiriNow. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
