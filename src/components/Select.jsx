// TITLE: LIBRARIES
import "../styles/select.css";

// TITLE: COMPONENTS

// TITLE: INITIAL STATES

export default function Form({ postToCall, setPostToCall }) {
  return (
    <div className="select-container">
      <span className={`select-title ${postToCall && "showValue"}`}>Select your news</span>
      <select id="select-tech" name="tech" onChange={(e) => setPostToCall(e.target.value)} className="select-input">
        <option defaultValue="" hidden></option>
        <option value="angular">Angular</option>
        <option value="reactjs">Reacts</option>
        <option value="vuejs">Vuejs</option>
      </select>
    </div>
  );
}
