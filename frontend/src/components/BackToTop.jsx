import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-rosewood p-3 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
    >
      <ChevronUp size={22} />
    </button>
  );
}