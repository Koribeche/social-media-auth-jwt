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
      <input {...rest} name={name} />
      <TextError isError={isError} />
    </div>
  );
}

export default Input;
