import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Linkedin, MessageCircle } from 'lucide-react';
import { ChatInterface } from '../components/ChatInterface';

export function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen relative">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-1/2 h-full">
            <img
              src="/arjoneel.jpg"
              alt="Arjoneel Ghosh"
              className="w-full h-full object-cover object-center opacity-90"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 min-h-screen flex items-center px-6 pt-20">
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Hello, I'm Arjoneel Ghosh
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl"
            >
              CSE Undergrad & ML/AI Enthusiast
            </motion.p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="#" 
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download Résumé
              </motion.a>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                I am a passionate, goal-oriented Computer Science undergrad with a strong foundation in software development, data structures, and algorithms. I'm currently pursuing an AWS-recognized four-tier Machine Learning specialization to build industry-ready AI skills.
              </p>
              <p>
                I love leveraging technology and problem-solving to deliver innovative solutions. I gained hands-on experience in data analytics and machine learning during a recent internship at KPMG, working on real-world government projects.
              </p>
              <p>
                I'm also a Certified ServiceNow Administrator with practical knowledge of IT service workflows. I am actively seeking opportunities to contribute to impactful AI/ML projects and continue growing as a well-rounded technology professional.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chatbot */}
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Chatbot Button */}
      <button 
        className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition z-50"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}