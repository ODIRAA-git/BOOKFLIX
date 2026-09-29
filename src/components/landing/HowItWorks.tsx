const steps = [
  {
    title: "Create your free account",
    description: "Sign up with your email in seconds, or look around first with the demo account.",
  },
  {
    title: "Explore the shelves",
    description: "Scroll through every genre and open any cover to read its rating and prologue.",
  },
  {
    title: "Build your reading list",
    description: "Save the books that grab you. Your wishlist is waiting every time you come back.",
  },
];

function HowItWorks() {
  return (
    <section className="landing-section" id="how-it-works">
      <div className="landing-container">
        <div className="landing-section-header">
          <p className="landing-kicker">How it works</p>
          <h2 className="landing-section-title">From curious to hooked in three steps</h2>
        </div>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
