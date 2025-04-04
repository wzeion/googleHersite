import React, { useState } from "react";

const AddBox = () => {
  const [boxes, setBoxes] = useState([]);

  // Function to add a new box
  const addBox = () => {
    setBoxes([...boxes, {}]);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Button to create a new box */}
      <button onClick={addBox} style={{ marginBottom: "10px", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Create Box
      </button>

      {/* Separate container for boxes */}
      <div className="boxContainer"
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
              overflowY: 'auto',
            }}
          >
            Box {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBox;
