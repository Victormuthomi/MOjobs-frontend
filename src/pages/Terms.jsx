import React from "react";

const Terms = () => (
  <section className="min-h-screen py-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Terms of Service
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        By accessing or using AjiriNow, you agree to these terms. If you do not
        agree, please do not use our platform.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
        1. Account Responsibilities
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        You are responsible for maintaining the confidentiality of your account
        and password and for all activities under your account.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
        2. Job & Ad Listings
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Clients must pay the required fees to list jobs or ads. Fundis must
        subscribe to remain listed and apply for jobs.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
        3. Payments
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        All payments are final. AjiriNow does not offer refunds except where
        legally required.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-6">
        4. Modifications
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        We reserve the right to update these terms at any time. Continued use
        constitutes acceptance of the changes.
      </p>
    </div>
  </section>
);

export default Terms;
