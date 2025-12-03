import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, DollarSign, MapPin } from "lucide-react";
import axios, { BASE_URL } from "../../lib/axios.js"; // Updated import

const ItemDirectory = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${BASE_URL}marketplace/items/`);
      const data = res.data;

      setItems(data);
      setFilteredItems(data);

      const cats = Array.from(new Set(data.map((i) => i.category))).sort();
      const locs = Array.from(new Set(data.map((i) => i.location))).sort();

      setCategories(cats);
      setLocations(locs);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...items];

    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (selectedLocation) {
      filtered = filtered.filter((item) => item.location === selectedLocation);
    }

    if (priceRange) {
      if (priceRange === "under_5000")
        filtered = filtered.filter((i) => parseFloat(i.price) < 5000);
      if (priceRange === "5000_20000")
        filtered = filtered.filter(
          (i) => parseFloat(i.price) >= 5000 && parseFloat(i.price) <= 20000
        );
      if (priceRange === "above_20000")
        filtered = filtered.filter((i) => parseFloat(i.price) > 20000);
    }

    setFilteredItems(filtered);
  }, [search, selectedCategory, selectedLocation, priceRange, items]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Title */}
      <div className="max-w-5xl mx-auto mb-8 text-center py-10">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">
          Browse Items from Verified Sellers
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Find products you need from trusted sellers.
        </p>
      </div>

      {/* CTA / Offer Details */}
      <div className="max-w-6xl mx-auto mb-8 px-4 sm:px-0 space-y-4">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 p-4 rounded-xl shadow-sm">
          The first item under Ksh 5,000 is free! Items above Ksh 5,000 get a 5%
          discount on the first item.
        </div>

        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 dark:bg-green-900 dark:text-green-200 p-4 rounded-xl shadow-sm">
          Are you a registered seller and want to feature your items here?{" "}
          <button
            onClick={() => navigate("/register/seller")}
            className="underline font-semibold hover:text-green-900"
          >
            Click here to register now →
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-8 px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="🔍 Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white col-span-1 sm:col-span-2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="p-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="p-3 rounded-xl border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="">All Prices</option>
          <option value="under_5000">Under Ksh 5,000</option>
          <option value="5000_20000">Ksh 5,000 - 20,000</option>
          <option value="above_20000">Above Ksh 20,000</option>
        </select>
      </div>

      {/* Item Cards */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
        {loading ? (
          <p className="col-span-full text-center text-gray-700 dark:text-gray-300">
            Loading items...
          </p>
        ) : filteredItems.length === 0 ? (
          <p className="col-span-full text-center text-gray-700 dark:text-gray-300">
            No items found.
          </p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/seller/items/${item.id}`)}
              className="cursor-pointer p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:scale-[1.02] transition"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between text-gray-700 dark:text-gray-300 text-sm">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} /> Ksh {item.price}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {item.location}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 flex items-center gap-1">
                <Tag size={12} /> {item.category}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemDirectory;
