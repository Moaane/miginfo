import React from "react";

export default function EmailTemplate({ name, message }) {
  return (
    <div>
      <p>Hello im {name}</p>
      <p>{message}</p>
    </div>
  );
}
