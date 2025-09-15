import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-100 rounded-xl p-6 shadow-2xl"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted hover:text-text transition-colors z-50"
              aria-label="Cerrar modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Project content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left column - Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right column - Content */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 rounded-xl bg-surface-200 text-text"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Descripción</h3>
                  <p className="text-muted text-sm">{project.fullDescription || project.description}</p>
                </div>

                {project.tools && (
                  <div>
                    <h3 className="font-semibold mb-2">Tecnologías utilizadas</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, index) => (
                        <span 
                          key={index}
                          className="text-xs px-3 py-1 rounded-full bg-surface-200 text-text"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.link && project.link !== '#' && (
                  <div className="pt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: project.accentColor }}
                    >
                      Ver proyecto en vivo
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
