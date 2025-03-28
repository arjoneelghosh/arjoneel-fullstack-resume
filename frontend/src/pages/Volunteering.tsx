import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe } from 'lucide-react';

export function Volunteering() {
  const activities = [
    {
      title: 'Good Life Center',
      description: 'Community Outreach',
      icon: Heart,
    },
    {
      title: 'Directorate of Student Affairs',
      description: 'Event & Admin Support',
      icon: Users,
    },
    {
      title: 'MUN Society',
      description: 'Participation & Coordination',
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Volunteering</h1>
        
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center gap-4">
                <activity.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <h2 className="font-semibold">{activity.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {activity.description}
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