import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BASE_URL, local } from "../../constents";
import axios from "axios";
import { toast } from "react-toastify";
import {db} from "../../config/firebase-config"
import { collection,addDoc, getDoc, getDocs } from "firebase/firestore";
import './StoriesCard.css';
import Page2 from "../../components/cards/page2";


const StoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stories, setStories] = useState([]);
  const [count, setCount] = useState(3);
  const StoryCollectionRef = collection(db, "Stories");
  const [boxes, setBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [recStory, setRecStory] = useState([]);
  
  const getStories = async () => {
    try{
      const data = await getDocs(StoryCollectionRef);
      const filteredData = data.docs.map((doc)=>({...doc.data(), id: doc.id}));
      setRecStory(filteredData);
      console.log(recStory);
    } catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getStories();
  },[] )
  
 

  useEffect(() => {
    axios
      .get(BASE_URL + "stories")
      .then((response) => {
        console.log(response.data.story);
        setStories(response.data.story);
      })
      .catch((error) => toast.error(error));
  }, []);

  function counterIncrease() {
    var i = 0;
    while (i < 3) {
      if (count <= stories.length) {
        setCount((count) => count + 1);
        i = i + 1;
      } else {
        break;
      }
    }
  }

  
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
  
  const saveImage = (index, event) => {
    event.preventDefault(); 
    if (boxes[index]?.image) {
      toast.success("Image saved successfully!");
      setBoxes([...boxes]);
    }
  };
  
  

  // const closeStoryBox = () => {
  //   setSelectedBox(null);
  // };
  
  const addStory = () => {
    setBoxes([...boxes, {}]);
    
  };

  // const saveImage = () => {
  //   setStories([...stories, { image: null, text: "", saved: false }])
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onShareStory = async() =>{
    try{
      await addDoc(StoryCollectionRef,{ Name: name, Title: title, Description: description});
    } catch(err) {
      console.error(err);
    }
    
  };
  // const toggleStories = () => {
  //   setShowCards((prev) => !prev); 
  // };
  const addStoryCard = () => {
    setStories((prevStories) => [
      ...prevStories,
      { id: prevStories.length + 1, text: `Story ${prevStories.length + 1}`},
    ]);
    closeModal();
    onShareStory();
    getStories();
  };

  

  return (
    <>
     
    
    <div className="storiesContainer" >

      {recStory.map((recStory) => (
          <div key={recStory.id} className="storiesCards">
          <img src="\femaleLogo.png" alt="Profile"></img>
          <h3>{recStory.Title}</h3>
          <p>{recStory.Description}</p>
         
        </div>
      ))}
       </div>

      <div className="flex flex-col justify-center font-serif items-center mt-3 p-8 lg:h-[500px] bg-[#F2F1EB]">
        <div className="mx-8 text-center">
          <span className="text-4xl max-md:text-3xl font-extrabold">
            Add Stories
          </span>
        </div>
        <div className="md:mt-10 mt-5 mx-8 text-center">
          <span>
            Dive into the powerful narratives on our "Breaking Chains: Women's
            Stories of Resilience" page, where courage takes center stage. These
            are more than just stories—they're beacons of strength, showcasing
            women who've faced adversity and emerged victorious. In this
            collection, find inspiration, support, and a testament to the
            unyielding spirit that triumphs over the darkest moments. Join us as
            we celebrate the indomitable resilience of these women, proving that
            even in the face of abuse, the human spirit can break free and soar.
          </span>
        </div>

        <div
          onClick={openModal}
          className="flex justify-center items-center  mt-5 lg:mt-12"
        >
          <button onClick={addStory} className=" flex border border-gray-500 p-3 m-3 font-serif  rounded-lg ">
            Add Stories
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "100vw",
            maxHeight: "90vh",
            overflow: "auto",
            zIndex: 1000,
          },
        }}
      >
        <div className="flex justify-end">
          <button onClick={closeModal}>
            <IoClose />
          </button>
        </div>

        <div className="modal-content ">
          <div className="flex justify-center items-center">
            <h4 className=" font-mono  text-2xl antialiased font-extrabold leading-snug tracking-normal text-blue-gray-900">
              Share your Story
            </h4>
          </div>
          <form className="max-w-screen-lg mt-5 mb-2 w-80 sm:w-96">
            <div className="flex flex-col gap-4 mb-1">
              <h6 className="block text-sm -mb-3 font-sans  antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Name
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name "
                  className="peer h-full w-full rounded-md border border-black border-opacity-20 focus:border-black focus:border-opacity-100 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
              <h6 className="block text-sm -mb-3 font-sans  antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Title
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Entere your Title"
                  className="peer h-full w-full rounded-md border border-black border-opacity-20 focus:border-black focus:border-opacity-100 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
              </div>
              <h6 className="block -mb-3 font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Description
              </h6>
              <div className="relative h-auto w-full min-w-[200px]">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your story"
                  className="peer h-full w-full rounded-md border border-black border-opacity-20 focus:border-black focus:border-opacity-100 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  rows="4"
                />
              </div>

            </div>
            
            <button
              // onClick={() => setShowCards(!showCards)}
              // onClick={onShareStory}
              onClick={addStoryCard}
              className="mt-6 block w-full  select-none rounded-lg bg-[#DED0B6] py-3 px-6 text-center align-middle font-sans text-xs font-semibold uppercase text-black shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Share
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default StoryPage;