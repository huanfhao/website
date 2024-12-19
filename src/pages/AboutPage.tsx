import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>
      <div className="prose prose-lg">
        <p>
          Welcome to SY Jewelry Display, your premier destination for exquisite jewelry.
          We take pride in offering a carefully curated selection of beautiful pieces
          that help you express your unique style.
        </p>
        {/* Add more content as needed */}
      </div>
    </main>
  );
}; 