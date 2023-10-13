import { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { Navbar } from "./Navbar";

const RecognitionSession = () => {
    const videoRef = useRef();

    useEffect(() => {
        const startRecognition = async () => {
            try {
                await startVideo();
                await loadModels();

                const intervalId = setInterval(async () => {
                    await faceMyDetect();
                }, 1000);

                // Clean up the interval when the component is unmounted
                return () => clearInterval(intervalId);
            } catch (error) {
                console.error("Error during recognition setup:", error);
            }
        };

        startRecognition();
    }, []);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error starting video:", error);
            throw error; // Propagate the error for better handling
        }
    };

    const loadModels = async () => {
        try {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            ]);
        } catch (error) {
            console.error("Error loading models:", error);
            throw error; // Propagate the error for better handling
        }
    };

    const faceMyDetect = async () => {
        try {
            const detections = await faceapi
                .detectAllFaces(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceExpressions();

            if (detections.length > 0) {
                console.log(detections[0].expressions);
            }
        } catch (error) {
            console.error("Error during face detection:", error);
        }
    };

    return (
        <>
            <div className="RecognitionSession">
                <video
                    crossOrigin="anonymous"
                    ref={videoRef}
                    autoPlay
                    style={{ display: "none" }}
                ></video>
            </div>
        </>
    );
};

export { RecognitionSession };
