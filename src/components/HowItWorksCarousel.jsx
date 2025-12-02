import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HowItWorksCarousel.css"; // arrow color fixes
import { UserPlus, ShoppingCart, CheckCircle, CreditCard } from "lucide-react";

const steps = {
  seller: [
    {
      title: "Register as Seller",
      icon: <UserPlus size={32} />,
      description:
        "Create your free account to start selling items on Marketplace.",
      color: "from-purple-500 to-purple-300",
    },
    {
      title: "Login & Access Dashboard",
      icon: <UserPlus size={32} />,
      description:
        "Sign in to manage your items, view sales, and update your listings.",
      color: "from-indigo-500 to-pink-500",
    },
    {
      title: "Post Your First Item",
      icon: <ShoppingCart size={32} />,
      description: "First item under Ksh 5000 is free; post others easily.",
      color: "from-purple-400 to-purple-200",
    },
    {
      title: "Post Additional Items",
      icon: <ShoppingCart size={32} />,
      description:
        "Items < Ksh 500: Ksh 50 per item. Items > Ksh 5000: first item 5% off, others 10%.",
      color: "from-purple-600 to-pink-400",
    },
    {
      title: "Get Buyers & Sell",
      icon: <CheckCircle size={32} />,
      description:
        "Buyers contact you directly and complete the purchase. Earn and grow your sales.",
      color: "from-teal-500 to-green-400",
    },
  ],
  fundi: [
    {
      title: "Register as Fundi",
      icon: <UserPlus size={32} />,
      description: "Sign up and get listed as a service provider.",
      color: "from-pink-500 to-red-500",
    },
    {
      title: "7-Day Free Trial",
      icon: <CheckCircle size={32} />,
      description: "Apply for jobs freely during the trial period.",
      color: "from-teal-500 to-green-500",
    },
    {
      title: "Pay Monthly Subscription",
      icon: <CreditCard size={32} />,
      description: "After trial, stay listed for Ksh 200/month.",
      color: "from-amber-500 to-lime-500",
    },
    {
      title: "Apply for Jobs",
      icon: <ShoppingCart size={32} />,
      description: "Browse posted jobs and apply instantly.",
      color: "from-cyan-500 to-blue-400",
    },
    {
      title: "Get Hired & Work",
      icon: <CheckCircle size={32} />,
      description: "Get clients, earn money, and grow your reputation.",
      color: "from-purple-500 to-pink-600",
    },
  ],
  client: [
    {
      title: "Register as a Client",
      icon: <UserPlus size={32} />,
      description: "Create your free account and start hiring.",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Post a Job",
      icon: <ShoppingCart size={32} />,
      description: "Describe your job and publish it in minutes.",
      color: "from-indigo-500 to-pink-500",
    },
    {
      title: "Pay Ksh 100",
      icon: <CreditCard size={32} />,
      description: "Pay to have your job listed and attract fundis.",
      color: "from-emerald-500 to-green-400",
    },
    {
      title: "Review Applicants",
      icon: <CheckCircle size={32} />,
      description: "Fundis will apply and you pick the right one.",
      color: "from-cyan-500 to-blue-400",
    },
    {
      title: "Hire & Work",
      icon: <CheckCircle size={32} />,
      description:
        "Get the right fundi, complete your project, and grow your business.",
      color: "from-yellow-500 to-orange-500",
    },
  ],
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 4500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

const HowItWorksCarousel = () => {
  const [tab, setTab] = useState("seller");

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-white">
        How It Works
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-8 gap-4 flex-wrap">
        <button
          onClick={() => setTab("seller")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            tab === "seller"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          For Sellers
        </button>
        <button
          onClick={() => setTab("fundi")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            tab === "fundi"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          For Fundis
        </button>
        <button
          onClick={() => setTab("client")}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            tab === "client"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          For Clients
        </button>
      </div>

      {/* Carousel */}
      <Slider {...sliderSettings}>
        {steps[tab].map((step, idx) => (
          <div key={idx} className="px-3">
            <div
              className={`bg-gradient-to-br ${step.color} p-6 rounded-2xl shadow-lg text-white h-full transform hover:scale-[1.02] transition`}
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-bold text-center mb-2">
                {step.title}
              </h3>
              <p className="text-center text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HowItWorksCarousel;
