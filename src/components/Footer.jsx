import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter as XIcon,
  Camera,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/"); // navigate to homepage
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 py-10 text-sm text-gray-600 dark:text-gray-400"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6 items-center pb-16">
        {/* Clickable Logo */}
        <div
          onClick={handleLogoClick}
          className="cursor-pointer hover:scale-105 transition"
        >
          <img
            src="images/logo.png"
            alt="MOjobs Logo"
            className="h-10 w-auto transform scale-300 md:scale-400"
          />
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-6">
          <a
            href="https://web.facebook.com/mojobsKE/"
            aria-label="Facebook"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={24} /> {/* increased size */}
          </a>
          <a
            href="https://x.com/mojobsKE"
            aria-label="X"
            className="hover:text-black dark:hover:text-white transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@the_alcodist"
            aria-label="TikTok"
            className="hover:text-pink-600 dark:hover:text-pink-400 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Camera size={24} /> {/* placeholder */}
          </a>
          <a
            href="mailto:hello.mojobs@gmail.com"
            aria-label="Email"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <Mail size={24} /> {/* Gmail icon */}
          </a>
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 text-sm">
          <a
            href="/terms"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Privacy
          </a>
          <a
            href="/contact"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Contact
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} MOjobs. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
