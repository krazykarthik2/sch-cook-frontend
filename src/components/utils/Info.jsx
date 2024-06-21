import React from "react";
import { FaInfoCircle } from "react-icons/fa";

function Info({ content }) {
  return (
    <p className="font-I flex gap-3">
      <FaInfoCircle size={23} color="#23f" />
      <span className="underline">{content}</span>
    </p>
  );
}

export default Info;
