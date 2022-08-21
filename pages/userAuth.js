import React from "react";
import Link from 'next/link';
import styles from '../styles/userAuth.module.css';
import SelectInput from "@mui/material/Select/SelectInput";

class userAuth
 extends React.Component {
  constructor() {
    super();

    this.cameraNumber = 0;
    this.state = {
      imageDataURL: null,
      recognizition: "Verify user Identity",
    };
  }

  initializeMedia = async () => {
    this.setState({ imageDataURL: null });
    this.setState({ recognizition: "Verify user Identity"});
    if (!("mediaDevices" in navigator)) {
      navigator.mediaDevices = {};
    }

    if (!("getUserMedia" in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error("getUserMedia Not Implemented"));
        }

        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
    

    //Get the details of video inputs of the device
    const videoInputs = await this.getListOfVideoInputs();

    //The device has a camera
    if (videoInputs.length) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: {
              exact: videoInputs[this.cameraNumber].deviceId,
            },
          },
        })
        .then((stream) => {
          this.player.srcObject = stream;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("The device does not have a camera");
    }
  };
  capturePicture = () => {
    var canvas = document.createElement("canvas");
    canvas.width = this.player.videoWidth;
    canvas.height = this.player.videoHeight;
    var contex = canvas.getContext("2d");5
    contex.drawImage(this.player, 0, 0, canvas.width, canvas.height);
    this.player.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
    });

    console.log("Photo captured!!!");
    this.setState({ imageDataURL: canvas.toDataURL() });
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    window.location.href=image; 
    var msg="Verifying user...";
    this.setState({recognizition:msg});
    console.log("photo saved!!!")
  };


  getListOfVideoInputs = async () => {
    // Get the details of audio and video output of the device
    const enumerateDevices = await navigator.mediaDevices.enumerateDevices();

    //Filter video outputs (for devices with multiple cameras)
    return enumerateDevices.filter((device) => device.kind === "videoinput");
  };

  render() {
    const playerORImage = Boolean(this.state.imageDataURL) ? (
      <img src={this.state.imageDataURL} alt="cameraPic" />
    ) : (
      <video
        className={styles.box}
        ref={(refrence) => {
          this.player = refrence;
        }}
        autoPlay
      ></video>
    );

    return (
      <div className={styles.userAuth}>
        {playerORImage}
        <div className={styles.buttonsSheet}>
        <button 
        className={styles.picture}
        onClick={this.initializeMedia}>Open Camera</button>
        <Link href='/upRet'>
            <a>
                <button 
                 className={styles.capture}
                onClick={this.capturePicture}>Capture</button>
            </a>
        </Link>
        </div>
        
        <p>{this.state.recognizition}</p>
      </div>
    );
  }
}

export default userAuth
;