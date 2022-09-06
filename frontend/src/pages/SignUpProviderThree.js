import React, { useState, useEffect } from "react";
import alerting from "../components/Alerting";
import FormData from 'form-data'
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "reactstrap";

import Loader from "../components/Loader";

/**
 * bug: the react-alerting stuff does not show all error
 * and the email should be unique, we did not show that out, this might throw error
 */


const SignUpProviderThree = () => {
  const navigate = useNavigate();
  // retrieve data from pages before.
  const location = useLocation();
  const [data, setData] = useState(location.state);

  const [selectedImage, setSelectedImage] = useState(null);
  let image = new FormData();
  useEffect(() => {
    image = new FormData();
    image.append('file', selectedImage);
  }, [selectedImage]);

  const [loading, setLoading] = useState(false);
  // sending the usestate of selectedImage (it won't work if we don't use this, if we directly do signUp inside submit or another .then(), the imageFilename would not be updated)
  const [finishSend, setFinishSend] = useState(false);
  useEffect(() => {
    if (finishSend) {
      signUp();
    }
  }, [finishSend]);

  const handleChange = (input, fieldName) => {
    setData({...data, [fieldName]: input});
    setFinishSend(true);
  };


  // post data to register provider
  const signUp = async () => {
    await fetch('/api/providers',{
      method: "POST",
      body: JSON.stringify(data),
      headers:{          
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      alerting("Created!", "info");
      navigate("/");
    })
    .catch(err => {
      setLoading(false);
      if(err?.response?.data?.message)
        alerting(err?.response?.data?.message, "danger");
      else
        alerting(err.message, "danger");
    });
  };

  // post data to register provider
  // post image first here
  const submit = async () => {
    if(!data || !selectedImage){
      alerting("there's field you didn't input!", "danger")
    } else {
      setLoading(true);
      alerting("creating your account...", "info")
      await fetch("/file/upload/", {
        method: "POST",
        body: image,
      })
      .then(response => response.json())
      .then(response => {
        // here we do the post of provider signup
        handleChange(response.image_id, "imageFilename");
      })
      .catch(err => {
        setLoading(false);
        if(err.response)
          alerting(err?.response?.data?.message, "danger");
        else
          alerting(err.message, "danger");
      });
    }
  };

  
  return (
    <div className="divCenter">
      <Card className="twoCard">
        {loading ? (
            <Loader/>
          ):(
          <>
            <h1>Upload your profile image!</h1>
            {selectedImage && (
              <>
                <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                <br />
                <button className="Button removeButton" onClick={()=>setSelectedImage(null)}>Remove</button>
              </>
            )}

            <div style={{position:"relative"}}>
              <label htmlFor="formId" className={"Button leftButton"}>
                <input
                  type="file"
                  id="formId"
                  name="myImage"
                  hidden
                  style={{color:"transparent"}}
                  onChange={(event) => {
                    // console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                upload file
              </label>
              <button className={"Button rightButton"} onClick={(e) => submit(e)}>finish</button>
            </div>
          </>
        )}


      </Card>
    </div>
  );
};

export default SignUpProviderThree;