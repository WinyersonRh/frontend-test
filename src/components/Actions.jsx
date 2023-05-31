// TITLE: LIBRARIES
import { useEffect } from "react";
import "../styles/actions.css";

// TITLE: COMPONENTS

// TITLE: INITIAL STATES

export default function Actions({ section, setSection }) {
  // Section in Local Storage
  const storedSection = window.localStorage.getItem("section");

  const storeSection = (value) => {
    window.localStorage.setItem("section", value);
    setSection(value);
  };

  const isSection = (sectionBtn) => sectionBtn === section && "isSelected";

  useEffect(() => {
    // Get last section selected or set the section "all"
    if (!storedSection || (storedSection !== "all" && storedSection !== "my-faves")) storeSection("all");
    else setSection(storedSection);
  }, []);

  return (
    <div className="actions-container">
      <button id="all-btn" onClick={() => storeSection("all")} className={isSection("all") || ""}>
        All
      </button>
      <button id="my-faves-btn" onClick={() => storeSection("my-faves")} className={isSection("my-faves") || ""}>
        My Faves
      </button>
    </div>
  );
}
