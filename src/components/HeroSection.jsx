import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const heroImages = ["/images/fundi1.png"];

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24">
    <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-4 md:px-8 gap-12">
      {/* LEFT: Text with motion + type animation */}
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left space-y-6 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
          <TypeAnimation
            sequence={[
              "More money. More happiness.",
              2000,
              "Connecting Fundis with Jobs.",
              2000,
              "Clients Find Skilled Talent Fast.",
              2000,
              "Marketplace: Browse Items on Sale",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          MO-jobs is Meru's trusted platform to browse{" "}
          <span className="text-purple-600 dark:text-purple-400 font-semibold">
            items on sale
          </span>
          , where anyone can post items and reach more customers — open to
          individuals and businesses alike. It also helps you{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            find skilled fundis
          </span>
          , and{" "}
          <span className="text-green-600 dark:text-green-400 font-semibold">
            hire the right talent
          </span>
          .
        </p>

        <div className="flex justify-center md:justify-start gap-4 flex-wrap">
          <Link
            to="/seller/items"
            className="px-6 py-3 rounded-full border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-700 transition transform hover:scale-105"
          >
            Browse Marketplace
          </Link>

          <Link
            to="/fundis"
            className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition transform hover:scale-105"
          >
            Find a Fundi
          </Link>

          <Link
            to="/register/client"
            className="px-6 py-3 rounded-full border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-gray-700 transition transform hover:scale-105"
          >
            Post a Job
          </Link>

          <Link
            to="/jobs"
            className="px-6 py-3 rounded-full border border-yellow-600 text-yellow-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition transform hover:scale-105"
          >
            Browse Jobs
          </Link>

          {/* APK Download Button */}
          <div className="flex flex-col items-center">
            <a
              href="/downloads/mo-jobs.apk"
              download
              className="px-6 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition transform hover:scale-105"
            >
              Download App (APK)
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Direct APK download for Android — coming soon to Play Store and
              App Store
            </p>
          </div>
        </div>
      </motion.div>

      {/* RIGHT: Image Carousel */}
      <motion.div
        className="w-full md:w-1/2 relative z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-green-400 dark:from-blue-700 dark:to-green-700 opacity-30 blur-2xl rounded-3xl -z-10"></div>

          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full h-full"
          >
            {heroImages.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
    </div>

    {/* Floating shapes */}
    <div className="absolute top-10 right-10 w-40 h-40 bg-green-200 dark:bg-green-800 opacity-20 rounded-full blur-3xl z-0"></div>
    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-200 dark:bg-blue-800 opacity-20 rounded-full blur-2xl z-0"></div>
  </section>
);

export default HeroSection;
