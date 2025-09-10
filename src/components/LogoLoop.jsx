// @ts-check
import React, { useId, useMemo } from "react";

/**
 * LogoLoop – simple, smooth, infinitely looping marquee for logos.
 *
 * @typedef {Object} Logo
 * @property {string} src
 * @property {string} [alt]
 * @property {string} [href]
 *
 * @typedef {Object} LogoLoopProps
 * @property {Logo[]} [logos]
 * @property {number} [speed]
 * @property {('left'|'right')} [direction]
 * @property {boolean} [pauseOnHover]
 * @property {number} [gap]
 * @property {string} [className]
 * @property {string} [itemClassName]
 */

/**
 * @param {LogoLoopProps} props
 */
export default function LogoLoop({
  logos = [],
  speed = 20,
  direction = "left",
  pauseOnHover = true,
  gap = 32,
  className = "",
  itemClassName = "",
}) {
  const rawId = useId().replace(/[:]/g, "");
  const keyframesName = useMemo(() => `logo-loop-${rawId}`, [rawId]);

  const animationDuration = Math.max(4, Number(speed) || 20); // seconds
  const isLeft = direction !== "right";

  // Inline style object for the gradient mask on the edges
  const maskStyle = {
    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  };

  const trackStyle = {
    gap: `${gap}px`,
    animation: `${keyframesName} ${animationDuration}s linear infinite`,
    animationPlayState: pauseOnHover ? undefined : "running",
  };

  // Duplicate the logos to ensure a seamless loop
  const content = [...logos, ...logos];

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={maskStyle}
    >
      {/* Unique keyframes per instance to avoid conflicts */}
      <style>{`
        @keyframes ${keyframesName} {
          from { transform: translateX(${isLeft ? 0 : "-50%"}); }
          to { transform: translateX(${isLeft ? "-50%" : 0}); }
        }
      `}</style>

      <div
        className={`group flex w-[200%]`}
        style={{ cursor: pauseOnHover ? "default" : undefined }}
      >
        <div
          className="flex shrink-0 w-1/2 items-center"
          style={trackStyle}
          onMouseEnter={(e) => {
            if (!pauseOnHover) return;
            e.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            if (!pauseOnHover) return;
            e.currentTarget.style.animationPlayState = "running";
          }}
        >
          {content.map((logo, i) => {
            const img = (
              <img
                src={logo.src}
                alt={logo.alt || "logo"}
                className="h-10 md:h-12 opacity-80 hover:opacity-100 transition-opacity duration-200"
                loading="lazy"
              />
            );
            return (
              <div key={i} className={`flex items-center ${itemClassName}`}>
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noreferrer noopener">
                    {img}
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>

        {/* The second (invisible) half exists so the container width is 200% */}
        <div className="w-1/2" />
      </div>
    </div>
  );
}
