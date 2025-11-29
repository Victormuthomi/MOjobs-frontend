import React from "react";
import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdTeaser = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t dark:border-gray-700 transition-colors">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center justify-center mb-6 bg-gradient-to-tr from-green-500 to-blue-500 text-white rounded-full w-16 h-16 shadow-lg">
          <Megaphone size={28} />
        </div>
        <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          Advertise with MO-jobs
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Have a service or product? Reach thousands of users directly on{" "}
          <strong>MO-jobs</strong> with targeted ad placements.
        </p>
        <Link
          to="/register/client"
          className="inline-block px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-700 dark:hover:bg-green-500 transition transform hover:scale-105 shadow-md"
        >
          Start Advertising
        </Link>
      </motion.div>
    </section>
  );
};

export default AdTeaser;
