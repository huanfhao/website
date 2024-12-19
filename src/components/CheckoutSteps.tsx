import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface CheckoutStepsProps {
  steps: Step[];
}

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ steps }) => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li
                key={step.id}
                className={`relative ${
                  stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
                } ${stepIdx !== 0 ? 'pl-8 sm:pl-20' : ''} flex-1`}
              >
                {stepIdx !== steps.length - 1 && (
                  <div
                    className="absolute top-4 left-0 w-full h-0.5 bg-gray-200"
                    aria-hidden="true"
                  >
                    <motion.div
                      className="h-full bg-blue-600"
                      initial={{ width: '0%' }}
                      animate={{
                        width: step.completed ? '100%' : '0%'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}

                <motion.div
                  className="relative flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: stepIdx * 0.2 }}
                >
                  <motion.span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? 'bg-blue-600'
                        : step.current
                        ? 'border-2 border-blue-600'
                        : 'border-2 border-gray-300'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {step.completed ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className={`text-sm ${
                          step.current ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      >
                        {step.id}
                      </span>
                    )}
                  </motion.span>
                </motion.div>

                <motion.div
                  className="mt-4 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: stepIdx * 0.2 + 0.1 }}
                >
                  <motion.div
                    className={`text-sm font-medium ${
                      step.current ? 'text-blue-600' : 'text-gray-900'
                    }`}
                  >
                    {step.title}
                  </motion.div>
                  <motion.div
                    className="text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: stepIdx * 0.2 + 0.2 }}
                  >
                    {step.description}
                  </motion.div>
                </motion.div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}; 