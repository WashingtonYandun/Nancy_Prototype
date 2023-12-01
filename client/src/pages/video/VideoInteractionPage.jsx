import {useNotes} from "../../context/notesContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import * as faceapi from "face-api.js";
import axios from "axios";

export const VideoInteractionPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [isRecognitionActive, setIsRecognitionActive] = useState(false);
    const [expressions, setExpressions] = useState([]);
    const videoRef = useRef();

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {};
        } catch (error) {
            console.error("Error starting video:", error);
            throw error;
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
            throw error;
        }
    };

    const faceMyDetect = async () => {
        try {
            if (!videoRef.current) {
                return;
            }

            const detections = await faceapi
                .detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceExpressions();

            if (detections.length > 0) {
                let expression = {
                    angry: detections[0].expressions.angry,
                    disgusted: detections[0].expressions.disgusted,
                    fearful: detections[0].expressions.fearful,
                    happy: detections[0].expressions.happy,
                    neutral: detections[0].expressions.neutral,
                    sad: detections[0].expressions.sad,
                    surprised: detections[0].expressions.surprised,
                };

                setExpressions((prevExpressions) => [
                    ...prevExpressions,
                    expression,
                ]);
            }
        } catch (error) {
            console.error("Error during face detection:", error);
        }
    };

    const handleStartRecognition = () => {
        setIsRecognitionActive(true);
    };

    const handleStopRecognition = () => {
        setIsRecognitionActive(false);
    };

    const onSubmit = async (data) => {
        try {
            data.expressions = expressions;
            if (
                !expressions.length ||
                !classification
            ) {
                return alert(
                    "Please fill all the fields and start recognition"
                );
            }

            handleStopRecognition();

            console.log(data);
            navigate("/notes");
        } catch (error) {
            console.error("Error submiting", error, data);
        }
    };

    useEffect(() => {
        startVideo();
        loadModels();
    }, []); // Run this effect only once on component mount

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (isRecognitionActive) {
                faceMyDetect();
            }
        }, 1000);

        return () => clearInterval(intervalId); // Clean up the interval on unmount
    }, [isRecognitionActive]);
    return (
        <></>
    )
}