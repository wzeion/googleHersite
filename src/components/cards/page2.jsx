import { useState } from "react";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
        Upload Image
        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </label>
                      
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              width: "200px",
              height: "250px",
              backgroundColor: "#b3b3b3",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.3s ease",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 0 2px black",     
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
              e.currentTarget.style.backgroundColor = "#d2d2d2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 0 2px black";
              e.currentTarget.style.backgroundColor = "#b3b3b3";
            }}
            onClick={() => setSelectedImage(image)}
          >
            <div className="border rounded-lg p-2 shadow-lg w-40 h-40 flex items-center justify-center overflow-hidden">
              <img src={image} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded" onClick={() => setSelectedImage(null)}>X</button>
            <img src={selectedImage} alt="Selected" className="w-full h-64 object-cover rounded" />
            <textarea
              className="w-full mt-4 p-2 border rounded"
              placeholder="Write description here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
