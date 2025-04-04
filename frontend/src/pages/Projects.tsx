import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'loanone',
      title: 'LoanOne Chatbot',
      shortDescription: 'Multilingual financial assistant, Top 15 in Standard Chartered Hackathon',
      fullDescription: 'Built a conversational AI chatbot to assist users with loan inquiries in multiple languages. Achieved Top 15 in Standard Chartered\'s global hackathon. Integrated NLP for natural language understanding and processing of user queries.',
      techStack: ['Python', 'React', 'Tailwind', 'Rasa', 'NLP'],
    },
    {
      id: 'agriculture',
      title: 'Agriculture Forecasting – Telangana',
      shortDescription: 'Crop yield forecasting using rainfall data for sustainable farming',
      fullDescription: 'Developed a machine learning model to predict crop yields based on seasonal rainfall patterns in Telangana. The project aims to promote sustainable agriculture practices by providing data-driven insights to farmers.',
      techStack: ['Python', 'SQL', 'XGBoost', 'Matplotlib'],
    },
    {
      id: 'sales',
      title: 'Sales Forecasting Tool',
      shortDescription: 'Built with Streamlit, uses ARIMA and Prophet for time-series prediction',
      fullDescription: 'Created an interactive web application using Streamlit that leverages ARIMA and Facebook Prophet models for accurate sales forecasting. The tool provides intuitive visualizations and customizable parameters for time-series analysis.',
      techStack: ['Python', 'Pandas', 'AutoARIMA', 'Prophet'],
    },
    {
      id: 'securapay',
      title: 'SecuraPay – Offline Payments',
      shortDescription: 'Encrypted QR-based P2P payments with local storage, no internet required',
      fullDescription: 'Innovative payment solution that enables peer-to-peer transactions without internet connectivity. Uses encrypted QR codes for secure data transfer and local storage for transaction history.',
      techStack: ['Python', 'Node.js', 'PostgreSQL', 'Symmetric Encryption'],
    },
    {
      id: 'webclones',
      title: 'Web App Clones + Deep Learning',
      shortDescription: 'Full-stack Netflix/Spotify clones with user behavior modeling',
      fullDescription: 'Developed full-stack clones of popular streaming platforms with added deep learning capabilities for user behavior analysis. Implements recommendation systems and personalized content delivery.',
      techStack: ['React', 'Node.js', 'Tailwind', 'PostgreSQL', 'Deep Learning'],
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Projects</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedProject.fullDescription}
              </p>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="https://github.com"
                //blank
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
