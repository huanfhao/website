import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black/50 fixed inset-0" />
      <div className="bg-white rounded-lg shadow-xl p-6 animate-pop-scale flex items-center space-x-3 relative">
        <CheckCircle className="h-6 w-6 text-green-500" />
        <span className="text-gray-800 font-medium">{message}</span>
      </div>
    </div>
  );
}; 