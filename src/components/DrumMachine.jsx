import { useState, useEffect } from "react";
import styles from "./DrumMachine.module.css";

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
                    <audio className="clip" id="Q" src="src/assets/audio/Heater-1.mp3"></audio>
                    Q
                </div>
                <div className="drum-pad" id="heater-2" onClick={handleClick} sound="Heater 2">
                    <audio className="clip" id="W" src="src/assets/audio/Heater-2.mp3"></audio>
                    W
                </div>
                <div className="drum-pad" id="heater-3" onClick={handleClick} sound="Heater 3">
                    <audio className="clip" id="E" src="src/assets/audio/Heater-3.mp3"></audio>
                    E
                </div>
                <div className="drum-pad" id="heater-4" onClick={handleClick} sound="Heater 4">
                    <audio className="clip" id="A" src="src/assets/audio/Heater-4.mp3"></audio>
                    A
                </div>
                <div className="drum-pad" id="clap" onClick={handleClick} sound="Clap">
                    <audio className="clip" id="S" src="src/assets/audio/Clap.mp3"></audio>
                    S
                </div>
                <div className="drum-pad" id="open-hh" onClick={handleClick} sound="Open HH">
                    <audio className="clip" id="D" src="src/assets/audio/Open-HH.mp3"></audio>
                    D
                </div>
                <div className="drum-pad" id="kick-n-hat" onClick={handleClick} sound="Kick n' Hat">
                    <audio className="clip" id="Z" src="src/assets/audio/Kick-n-Hat.mp3"></audio>
                    Z
                </div>
                <div className="drum-pad" id="kick" onClick={handleClick} sound="Kick">
                    <audio className="clip" id="X" src="src/assets/audio/Kick.mp3"></audio>
                    X
                </div>
                <div className="drum-pad" id="closed-hh" onClick={handleClick} sound="Closed HH">
                    <audio className="clip" id="C" src="src/assets/audio/Closed-HH.mp3"></audio>
                    C
                </div>
            </div>
            <div className={styles.controlPanel}>
                <p className={styles.display} id="display">{displayContent}</p>
            </div>
        </div>
    );
}