import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, User, Users } from "lucide-react"; // Updated icons

const features = [
  {
    icon: <ShoppingCart size={28} />,
    color: "from-purple-500 to-purple-300",
    title: "More Items",
    desc: "Anyone can post items on sale and reach buyers quickly — open to individuals and businesses alike.",
  },
  {
    icon: <User size={28} />,
    color: "from-blue-500 to-blue-300",
    title: "More Jobs",
    desc: "Skilled fundis find gigs in tech, electrical, and construction, turning skills into income and a better life.",
  },
  {
    icon: <Users size={28} />,
    color: "from-green-500 to-green-300",
    title: "More Talent",
    desc: "Clients and homeowners connect with verified, experienced technicians for every job they need done.",
  },
];

const WhyMoJobsSection = () => (
  <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
    <div className="max-w-6xl mx-auto text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Why MO-jobs?
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Launching our Marketplace first: post items, reach buyers, and grow your
        business or personal sales. MO-jobs also connects skilled workers with
        jobs and helps clients find talent quickly.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {features.map(({ icon, title, desc, color }, idx) => (
        <motion.div
          key={idx}
          className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 text-left hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          viewport={{ once: true }}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${color} mb-4 shadow-md`}
          >
            <span className="text-white">{icon}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default WhyMoJobsSection;
