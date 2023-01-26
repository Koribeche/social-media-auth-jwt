import React from "react";
import TextError from "./TextError";

function Input({ isError, label, name, ...rest }) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <textarea {...rest} name={name} rows="4" cols="50" />
      <TextError isError={isError} />
    </div>
  );
}

export default Input;
