import { useState } from "react";

// Reusable input with icon + show/hide password button
export default function Input({ label, icon, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <div className="field-box">
        <span className="field-icon">{icon}</span>
        <input {...props} type={isPassword && show ? "text" : type} />
        {isPassword && (
          <button type="button" className="eye" onClick={() => setShow(!show)} aria-label="Toggle password visibility">
            {show ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </label>
  );
}
