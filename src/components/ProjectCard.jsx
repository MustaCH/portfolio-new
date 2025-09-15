'use client'

import React, { useState } from "react";
import ProjectModal from "./ProjectModal";

const Tag = ({ children, variant = "accent" }) => {
  const base = "text-xs px-2 py-1 rounded-xl";
  if (variant === "accent") return <div className={`bg-accent text-text ${base}`}>{children}</div>;
  if (variant === "mint") return <div className={`bg-mint-200 text-black ${base}`}>{children}</div>;
  return <div className={`bg-surface-200 text-text ${base}`}>{children}</div>;
};

/**
 * @typedef {Object} Project
 * @property {string} image - Project image URL
 * @property {string} title - Project title
 * @property {string} description - Project short description
 * @property {string} fullDescription - Project full description
 * @property {string[]} tags - Project tags
 * @property {string[]} tools - Technologies used in the project
 * @property {string} [link] - Project URL
 */

/**
 * @typedef {Object} ProjectCardProps
 * @property {Project} project - The project data
 * @property {string} [accentColor] - Accent color for the card
 */

/**
 * Profile card component
 * @param {ProjectCardProps} props - Component props
 */
export default function ProjectCard({
  project,
  accentColor = "#FF6B3D"
}) {
  const { image, title, description, tags = [], link } = project;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="group relative w-fit overflow-hidden rounded bg-surface-200/90 backdrop-blur p-4 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
        style={{ borderRadius: "0.75rem" }}
        onClick={handleViewDetails}
      >
      {/* Image */}
      <div className="overflow-hidden rounded">
        <img
          src={image}
          alt={title}
          className="w-80 h-64 object-cover rounded transition-transform duration-500 group-hover:scale-[1.1]"
          loading="lazy"
        />
      </div>

      {/* Tags */}
      <div className="mt-3 flex items-center gap-2 h-8">
        {tags[0] && <Tag variant="accent">{tags[0]}</Tag>}
        {tags[1] && <Tag variant="mint">{tags[1]}</Tag>}
      </div>

      {/* Title */}
      <h4 className="mt-1 h-8">{title}</h4>

      {/* Description */}
      <p className="text-muted text-sm w-80 h-24">{description}</p>

      {/* CTA */}
      <div 
        className="text-accent text-md text-start flex items-center gap-1 h-14"
        style={{ color: accentColor }}
        onClick={handleViewDetails}
      >
        Ver detalle
        <svg
          className="lucide lucide-arrow-right"
          fill="none"
          height="20"
          stroke={accentColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>

      {/* Subtle border highlight on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded ring-1 ring-transparent transition-colors duration-300 group-hover:ring-1"
        style={{ ringColor: accentColor }}
      />
    </div>
    
    {/* Project Modal */}
    <ProjectModal 
      isOpen={isModalOpen} 
      onClose={handleCloseModal} 
      project={{
        ...project,
        accentColor
      }}
    />
    </>
  );
}
