import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            className={`w-full h-full object-cover cursor-zoom-in ${
              isZoomed ? 'scale-150' : ''
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </AnimatePresence>

        <motion.button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevImage}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextImage}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        <motion.button
          className="absolute right-2 bottom-2 bg-white/80 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <motion.button
            key={index}
            className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
              index === currentIndex ? 'ring-2 ring-blue-500' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}; 