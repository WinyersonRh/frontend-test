// TITLE: LIBRARIES
import { useEffect, useRef, useState } from "react";
import "../styles/loader.css";

// TITLE: INITIAL STATES
const initialScrollY = () => scrollY;

export default function Loader({ isScrollEnable, setIsScrollEnable, page, setPage }) {
  // > Current scroll in the website
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
      // If infinite scroll isn't enabled, break the process
      if (!isScrollEnable) return;

      // We verify that the loader has been intercepted to deactivate the infinite scroll and look for another page
      elements.forEach((elem) => {
        if (elem.isIntersecting && elem.target.id === "loader") {
          setIsScrollEnable(false);
          setPage(page++);
        }
      });
    };

    // Execute the "observe" method on the "loader" reference element
    new IntersectionObserver(infiniteScroll, { threshold: [0.5, 0.75] }).observe(loader.current);
  }, [loader, isScrollEnable]);

  return <figure ref={loader} id="loader" className="loader" data-is={isScrollEnable}></figure>;
}
