"use client";

interface ScrollToExamplesProps {
  className?: string;
  children: React.ReactNode;
}

export default function ScrollToExamples({ className, children }: ScrollToExamplesProps) {
  const handleClick = () => {
    const target = document.getElementById("examples");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

