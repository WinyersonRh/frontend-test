// TITLE: LIBRARIES
import { useEffect, useRef, useState } from "react";
import "../styles/loader.css";

// TITLE: COMPONENTS

// TITLE: INITIAL STATES
const initialScrollY = () => scrollY;

export default function Loader({ isScrollEnable, setIsScrollEnable, page, setPage }) {
  const [scroll, setScroll] = useState(initialScrollY());

  const loader = useRef(null);

  // -USE EFFECT: Event lister 'scroll' of object window
  useEffect(() => {
    const handleScroll = () => setScroll(initialScrollY());
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scroll]);

  // -USE EFFECT: Observer loader for Infinite scroll
  useEffect(() => {
    const infiniteScroll = (elements) => {
      if (!isScrollEnable) return;

      elements.forEach((elem) => {
        if (elem.isIntersecting && elem.target.id === "loader") {
          setIsScrollEnable(false);
          setPage(page++);
        }
      });
    };

    new IntersectionObserver(infiniteScroll, { threshold: [0.5, 0.75] }).observe(loader.current);
  }, [loader, isScrollEnable]);

  return <figure ref={loader} id="loader" className="loader" data-is={isScrollEnable}></figure>;
}
