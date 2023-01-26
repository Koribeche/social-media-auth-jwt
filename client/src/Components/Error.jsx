import React from "react";

export default function Error({ msg }) {
  return (
    <div className="d-flex justify-content-center text-center mb-3">
      <div className="alert alert-danger" role="alert">
        {msg}
      </div>
    </div>
  );
}
