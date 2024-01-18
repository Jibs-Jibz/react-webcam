import Webcam from "react-webcam";
import React, { useEffect } from "react";

const CustomWebcam = () => {
  const webcamRef = React.useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
  const [deviceType, setDeviceType] = React.useState<string | null>(null);
  const [mirrored, setMirrored] = React.useState<boolean>(true);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("android")) {
      setDeviceType("Android");
    } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
      setDeviceType("iOS");
    } else if (
      userAgent.includes("windows") ||
      userAgent.includes("macintosh") ||
      userAgent.includes("x11")
    ) {
      setDeviceType("Desktop/Laptop");
    } else {
      setDeviceType("Unknown");
    }
  }, []);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      {deviceType && <p>Device Type: {deviceType}</p>}
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          height={600}
          width={600}
          ref={webcamRef}
          mirrored={mirrored}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
        //   style={{
        //     borderRadius: "50%",
        //     width: "100%",
        //     height: "100%",
        //   }}
        />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
