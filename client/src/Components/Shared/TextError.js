import React from "react";

function TextError(props) {
  return (
    <div className="invalid-feedback d-block text-left">
      {props.isError && <>* {props.isError}</>}
    </div>
  );
}

export default TextError;
