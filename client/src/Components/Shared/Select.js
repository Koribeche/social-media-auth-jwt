import React from "react";
import TextError from "./TextError";

function Select({ label, name, selectOptions, isError, ...rest }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select className="form-select" name={name} {...rest}>
        {selectOptions.map((option, idx) => {
          return (
            <option key={idx} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </select>

      <TextError isError={isError} />
    </div>
  );
}

export default Select;
