// TITLE: LIBRARIES
import "../styles/select.css";

// TITLE: COMPONENTS

// TITLE: INITIAL STATES

export default function Form({ tech, setTech }) {
  return (
    <div className="select-container">
      <span className={`select-title ${tech && "showValue"}`}>Select your news</span>
      <select id="select-tech" name="tech" onChange={(e) => setTech(e.target.value)} className="select-input">
        <option defaultValue="" hidden></option>
        <option value="angular">Angular</option>
        <option value="reactjs">Reacts</option>
        <option value="vuejs">Vuejs</option>
      </select>
    </div>
  );
}
