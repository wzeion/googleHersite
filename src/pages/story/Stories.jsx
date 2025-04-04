import React, { useState } from "react";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/navbar/navbar";
import StoryPage from "../../components/cards/StoryPage";
import './StoriesBlock.css';
import Page2 from "../../components/cards/page2";

const StoriesPage = () => {
  // const [stories, setStories] = useState([]);
  // const [selectedStory, setSelectedStory] = useState(null);

  // const handleBoxClick = (index) => {
  //   setSelectedStory(index);
  // };

  // const handleImageUpload = (event, index) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const updatedStories = [...stories];
  //       updatedStories[index] = {
  //         ...updatedStories[index],
  //         image: reader.result,
  //       };
  //       setStories(updatedStories);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleStoryTextChange = (event, index) => {
  //   const updatedStories = [...stories];
  //   updatedStories[index] = {
  //     ...updatedStories[index],
  //     text: event.target.value,
  //   };
  //   setStories(updatedStories);
  // };

  // const addNewBox = () => {
  //   setStories([...stories, { image: null, text: "", saved: false }]);
  // };

  // const closeStory = () => {
  //   setSelectedStory(null);
  // };

  // const saveStory = () => {
  //   const updatedStories = [...stories];
  //   updatedStories[selectedStory].saved = true;
  //   setStories(updatedStories);
  //   closeStory();
  // };

  return (
    <>
      <Navbar />
      <div className="h-24 w-full"></div>

      {/* <div className="StoriesContainer">
        {stories.map((story, index) => (
          <div key={index} className="storiesBox" onClick={() => handleBoxClick(index)}>
            {story.image ? (
              <>
                 <img src={story.image} alt={`Story ${index}`} className="storyImage" />
                 {story.saved && <div className="storyTextPreview">Click to read story</div>}
              </>
            ) : (
              <div className="uploadLabel">
                <label>
                  Add your Stories..
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    hidden
                  />
                </label>
              </div>
            )}
          </div>
        ))}
       
      </div>

     <div className="addBoxContainer">
     <button className="addBoxBtn" id="addStoriesButton" onClick={addNewBox}>+ Add Story</button>
     </div>

      {selectedStory !== null && (
        <div className="storyOverlay">
          <div className="storyContent">
            <button className="closeButton" onClick={closeStory}>Exit</button>
            <h2>Story {selectedStory + 1}</h2>

            {stories[selectedStory]?.image && (
              <img
                src={stories[selectedStory].image}
                alt="Story"
                style={{ maxWidth: "100%", marginBottom: "15px" }}
              />
            )}

            {!stories[selectedStory]?.saved && (
              <>
                <textarea
                  placeholder="Write your story here..."
                  value={stories[selectedStory]?.text}
                  onChange={(e) => handleStoryTextChange(e, selectedStory)}
                  className="storyTextarea"
                />
                <button className="saveButton" onClick={saveStory}>Save Story</button>
              </>
            )}

            {stories[selectedStory]?.saved && (
              <div className="storyTextDisplay">{stories[selectedStory].text}</div>
            )}
          </div>
        </div>
      )} */}
       {/* <Page2/> */}
      <StoryPage />
      <Footer />
    </>
  );
};

export default StoriesPage;