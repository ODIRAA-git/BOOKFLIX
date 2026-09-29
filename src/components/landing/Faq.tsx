import { DEMO_EMAIL, DEMO_PASSWORD } from "../../lib/demoAccount";

interface FaqProps {
  genreNames: string[];
}

function Faq({ genreNames }: FaqProps) {
  const faqs = [
    {
      question: "What is Bookflix?",
      answer:
        "Bookflix is a place to discover books the way you'd browse films: scroll shelves by genre, read the prologue of anything that catches your eye, and save the ones you want to read to your wishlist.",
    },
    {
      question: "How much does it cost?",
      answer: "Nothing. Creating an account and using every feature is free.",
    },
    {
      question: "Can I look around before signing up?",
      answer: `Yes. Use "Try the demo account" at the top of this page, or sign in with ${DEMO_EMAIL} / ${DEMO_PASSWORD}.`,
    },
    {
      question: "Is my wishlist saved?",
      answer:
        "Yes. Your wishlist is stored with your account, so it's there every time you sign in, on any device.",
    },
    {
      question: "Which genres can I explore?",
      answer: `${genreNames.join(", ")}, plus a Recommended shelf that mixes highlights from all of them.`,
    },
  ];

  return (
    <section className="landing-section landing-section-alt" id="faq">
      <div className="landing-container landing-container-narrow">
        <div className="landing-section-header">
          <p className="landing-kicker">FAQ</p>
          <h2 className="landing-section-title">Questions, answered</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary className="faq-question">
                {faq.question}
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
