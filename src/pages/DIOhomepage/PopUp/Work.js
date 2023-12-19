import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";
import "./Work.css";

const SubmitionPopUp = ({
  setShowPopUpWork,
  setIsCreatingExecution,
  setSelfReview,
  setExecutionId,
  workText,
  setWorkText,
  link,
  setLink
}) => {
  // TODO: add real information in jsonData

  const handleClick = () => {
    setShowPopUpWork(false);
    setSelfReview(true);
    setExecutionId(0);
  };

  const [file, setFile] = useState(null); // State to store uploaded file
  const [linkInputVisible, setLinkInputVisible] = useState(false); // State to manage link input visibility



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleAddFilesClick = () => {
    // Trigger file input click
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleAddLinkClick = () => {
    setLinkInputVisible(true);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Vérifie si la longueur du texte est inférieure ou égale à 150 caractères
    if (inputValue.length <= 150) {
      setWorkText(inputValue);
    } else if (inputValue.length > 150) {
      // If the input exceeds 150 characters, truncate the input to 150 characters
      e.preventDefault();
    }
  };

  const popUpRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setShowPopUpWork(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopUpWork]);




  return (
    <div ref={popUpRef} className="submition-pop-up-work">
    <h2>My work</h2>

    <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    <input
      className="evaluation-textarea"
      placeholder="Commentaire..."
      value={workText}
      onChange={handleInputChange}
    />


    <div className="spane">
    <div className="buttons">
    <button className="files" onClick={handleAddFilesClick}><span class="circle"></span><div className="span-text">Add Files </div></button>
    <button className="files" onClick={handleAddLinkClick}><span class="circle"></span><div className="span-text">Add Link</div></button>
    </div>

      {linkInputVisible && (
        <input
          type="text"
          placeholder="Enter link"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
          style={{ height: "3vh", fontSize: "80%",backgroundColor:"transparent" , width: "20vw" }}
        />
        )}

    </div>

    <button
      className="evaluation-button1"
      onClick={handleClick}
    >
      Done
    </button>

    </div>
  );
};

export default SubmitionPopUp;
