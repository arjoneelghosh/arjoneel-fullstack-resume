import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export function Certifications() {
  const certifications = [
    { title: 'Machine Learning', issuer: 'AWS Academy' },
    { title: 'Deep Learning', issuer: 'MATLAB (MathWorks)' },
    { title: 'Digital Image Processing', issuer: 'MATLAB (MathWorks)' },
    { title: 'Data Analysis with Pandas', issuer: 'Boris Paskhaver' },
    { title: 'Geo-data Sharing & Cyber Security', issuer: 'ISRO' },
    { title: 'ServiceNow Administration', issuer: 'ServiceNow' },
  ];

  return (
    <div className="min-h-screen pt-24 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Certifications</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold mb-1">{cert.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}