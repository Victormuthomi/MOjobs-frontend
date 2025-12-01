import React from "react";
import { Megaphone, Hammer, UserCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const MissionVision = () => {
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
          Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          At <strong>MO-jobs</strong>, we create more jobs, help fundis earn
          more money, and enable businesses to reach more customers — so
          everyone in Meru can live happier.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Fundis */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-center">
            <div className="w-12 h-12 mb-2 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
              <Hammer size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-blue-600 mb-2">For Fundis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              More jobs, more income, more happiness.
            </p>
          </div>

          {/* Clients */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-center">
            <div className="w-12 h-12 mb-2 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full">
              <UserCheck
                size={24}
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <h3 className="font-semibold text-green-600 mb-2">For Clients</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Find skilled fundis fast and hire trusted talent in Meru.
            </p>
          </div>

          {/* Businesses */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-center">
            <div className="w-12 h-12 mb-2 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <TrendingUp
                size={24}
                className="text-yellow-600 dark:text-yellow-400"
              />
            </div>
            <h3 className="font-semibold text-yellow-600 mb-2">
              For Businesses
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Promote your services, reach more customers, and grow your
              business.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MissionVision;
