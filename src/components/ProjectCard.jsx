import React from "react";

const Tag = ({ children, variant = "accent" }) => {
  const base = "text-xs px-2 py-1 rounded-xl";
  if (variant === "accent") return <div className={`bg-accent text-text ${base}`}>{children}</div>;
  if (variant === "mint") return <div className={`bg-mint-200 text-black ${base}`}>{children}</div>;
  return <div className={`bg-surface-200 text-text ${base}`}>{children}</div>;
};

/**
 * Profile card component
 * @param {Object} props
 * @param {string} props.image
 * @param {string} props.title
 * @param {string} props.description
 * @param {string[]} [props.tags]
 * @param {string} [props.link]
 * @param {string} [props.accentColor]
 */
export default function ProjectCard({
  image,
  title,
  description,
  tags = [],
  link,
  accentColor = "#FF6B3D",
}) {
  return (
    <div
      className="group relative w-fit overflow-hidden rounded bg-surface-200/90 backdrop-blur p-4 transition-transform duration-300 hover:-translate-y-1"
      style={{ borderRadius: "0.75rem" }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded">
        <img
          src={image}
          alt={title}
          className="w-80 h-64 object-cover rounded transition-transform duration-500 group-hover:scale-[1.03]"
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
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent text-md text-start flex items-center gap-1 h-14"
          style={{ color: accentColor }}
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
        </a>
      ) : null}

      {/* Subtle border highlight on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded ring-1 ring-transparent transition-colors duration-300 group-hover:ring-1"
        style={{ ringColor: accentColor }}
      />
    </div>
  );
}
