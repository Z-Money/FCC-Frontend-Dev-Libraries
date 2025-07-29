import { useState, useEffect } from "react";
import styles from "./DrumMachine.module.css";
import heater1 from "../assets/audio/Heater-1.mp3";
import heater2 from "../assets/audio/Heater-2.mp3";
import heater3 from "../assets/audio/Heater-3.mp3";
import heater4 from "../assets/audio/Heater-4.mp3";
import clap from "../assets/audio/Clap.mp3";
import openHH from "../assets/audio/Open-HH.mp3";
import kick from "../assets/audio/Kick.mp3";
import kickHat from "../assets/audio/Kick-n-Hat.mp3";
import closedHH from "../assets/audio/Closed-HH.mp3";

export default function DrumMachine() {
    const [displayContent, setDisplayContent] = useState("Press a key to play");

    function handleClick(event) {
        const audio = document.getElementById(event.target.textContent);
        setDisplayContent(event.target.getAttribute("sound"));
        audio.currentTime = 0;
        audio.play();
    }

    function handleKeyPress(event) {
        const key = event.key.toUpperCase();
        const audio = document.getElementById(key);
        if (audio) {
            setDisplayContent(audio.parentNode.getAttribute("sound"));
            audio.currentTime = 0;
            audio.play();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div className={styles.drumMachine} id="drum-machine">
            <div className={styles.drumPadContainer}>
                <div className="drum-pad" id="heater-1" onClick={handleClick} sound="Heater 1">
                    <audio className="clip" id="Q" src={heater1}></audio>
                    Q
                </div>
                <div className="drum-pad" id="heater-2" onClick={handleClick} sound="Heater 2">
                    <audio className="clip" id="W" src={heater2}></audio>
                    W
                </div>
                <div className="drum-pad" id="heater-3" onClick={handleClick} sound="Heater 3">
                    <audio className="clip" id="E" src={heater3}></audio>
                    E
                </div>
                <div className="drum-pad" id="heater-4" onClick={handleClick} sound="Heater 4">
                    <audio className="clip" id="A" src={heater4}></audio>
                    A
                </div>
                <div className="drum-pad" id="clap" onClick={handleClick} sound="Clap">
                    <audio className="clip" id="S" src={clap}></audio>
                    S
                </div>
                <div className="drum-pad" id="open-hh" onClick={handleClick} sound="Open HH">
                    <audio className="clip" id="D" src={openHH}></audio>
                    D
                </div>
                <div className="drum-pad" id="kick-n-hat" onClick={handleClick} sound="Kick n' Hat">
                    <audio className="clip" id="Z" src={kickHat}></audio>
                    Z
                </div>
                <div className="drum-pad" id="kick" onClick={handleClick} sound="Kick">
                    <audio className="clip" id="X" src={kick}></audio>
                    X
                </div>
                <div className="drum-pad" id="closed-hh" onClick={handleClick} sound="Closed HH">
                    <audio className="clip" id="C" src={closedHH}></audio>
                    C
                </div>
            </div>
            <div className={styles.controlPanel}>
                <p className={styles.display} id="display">{displayContent}</p>
            </div>
        </div>
    );
}