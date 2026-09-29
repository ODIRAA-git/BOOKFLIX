import type { ReactNode } from "react";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

const iconProps = {
  viewBox: "0 0 24 24",
  width: 26,
  height: 26,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const features: Feature[] = [
  {
    title: "Browse by genre",
    description:
      "From slow-burn romance to midnight horror, every genre gets its own endlessly scrolling shelf.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="4" height="16" rx="1" />
        <rect x="9" y="4" width="4" height="16" rx="1" />
        <path d="M15.5 5.2l3.8-1 3 15.6-3.8 1z" />
      </svg>
    ),
  },
  {
    title: "Read the prologue first",
    description:
      "Open any cover to read how the story begins before you commit. No more picking books blind.",
    icon: (
      <svg {...iconProps}>
        <path d="M2 5.5C4.5 4 8 4 12 6c4-2 7.5-2 10-.5V19c-2.5-1.5-6-1.5-10 .5-4-2-7.5-2-10-.5z" />
        <path d="M12 6v13.5" />
      </svg>
    ),
  },
  {
    title: "Build your wishlist",
    description:
      "Save a book in one tap. Your list is tied to your account, so it's there whenever you sign in.",
    icon: (
      <svg {...iconProps}>
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z" />
      </svg>
    ),
  },
  {
    title: "Read your way",
    description:
      "Switch between dark and light mode, and jump to any genre instantly with built-in search.",
    icon: (
      <svg {...iconProps}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

function FeatureGrid() {
  return (
    <section className="landing-section" id="features">
      <div className="landing-container">
        <div className="landing-section-header">
          <p className="landing-kicker">Why Bookflix</p>
          <h2 className="landing-section-title">Everything you need to choose your next book</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureGrid;
