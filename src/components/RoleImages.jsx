import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RoleImages = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* 🔵 Fundi Block */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/images/fundi.jpg"
            alt="Fundi at work"
            className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80 mb-4"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.p
            className="text-xl font-semibold text-blue-700 dark:text-blue-400"
            whileHover={{ scale: 1.02 }}
          >
            For Fundis
          </motion.p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Get discovered. Find more jobs. Earn more money. Live happier.
          </p>

          <Link
            to="/register/fundi"
            className="inline-block mt-4 px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
          >
            Join as a Fundi
          </Link>
        </motion.div>

        {/* 🟢 Clients & Businesses Block */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="/images/client.jpg"
            alt="Client or business looking to hire/promote"
            className="rounded-2xl shadow-lg w-full object-cover h-64 md:h-80 mb-4"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.p
            className="text-xl font-semibold text-green-700 dark:text-green-400"
            whileHover={{ scale: 1.02 }}
          >
            For Clients & Businesses
          </motion.p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Find skilled fundis fast, post jobs, and promote your business to
            reach more customers in Meru.
          </p>

          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <Link
              to="/register/client"
              className="inline-block px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
            >
              Hire a Fundi
            </Link>
            <Link
              to="/register/client"
              className="inline-block px-6 py-2 rounded-full border border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-gray-700 transition shadow-sm"
            >
              Advertise Your Business
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoleImages;
