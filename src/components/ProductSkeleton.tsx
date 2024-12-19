import React from 'react';
import { Skeleton } from './Skeleton';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <Skeleton height={200} className="w-full" />
      <Skeleton width={200} height={24} />
      <Skeleton width={150} height={20} />
      <div className="flex justify-between items-center">
        <Skeleton width={80} height={24} />
        <Skeleton width={100} height={36} />
      </div>
    </div>
  );
}; 