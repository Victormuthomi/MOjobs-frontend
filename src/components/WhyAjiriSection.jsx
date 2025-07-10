import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ShieldCheck, Clock } from "lucide-react";

const features = [
  {
    icon: <Briefcase size={28} />,
    color: "from-blue-500 to-blue-300",
    title: "Skilled Fundis",
    desc: "Access a vetted pool of skilled and verified fundis ready for work.",
  },
  {
    icon: <ShieldCheck size={28} />,
    color: "from-green-500 to-green-300",
    title: "Secure Hiring",
    desc: "We prioritize trust and transparency in every engagement.",
  },
  {
    icon: <Clock size={28} />,
    color: "from-orange-500 to-yellow-300",
    title: "Fast & Reliable",
    desc: "Post jobs or ads and get responses in minutes — not days.",
  },
];

const WhyAjiriSection = () => (
  <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
    <div className="max-w-6xl mx-auto text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Why Choose AjiriNow?
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        We connect clients with the best local talent for fast, reliable, and
        safe services.
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

export default WhyAjiriSection;
