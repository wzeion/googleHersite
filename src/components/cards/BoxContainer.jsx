import React from "react";

const BoxContainer = ({ boxes }) => {
  return (
    <div
      className="boxContainer"
      style={{
        marginTop: "20px",
        padding: "20px",
        border: "2px solid red",
        minHeight: "150px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        backgroundColor: "#f9f9f9",
      }}
    >
      {boxes.map((_, index) => (
        <div
          key={index}
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "lightblue",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #000",
          }}
        >
          Box {index + 1}
        </div>
      ))}
    </div>
  );
};

export default BoxContainer;
