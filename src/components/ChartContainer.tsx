import React from 'react';

interface ChartContainerProps {
  children: React.ReactNode;
}

export const ChartContainer = ({ children }: ChartContainerProps) => {
  return (
    <div className="h-80 w-full flex items-center justify-center">
      {children}
    </div>
  );
}; 