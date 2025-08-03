import { useState, useEffect, useRef } from 'react'
import alarm from '../assets/audio/alarm.mp3'
import styles from './Clock.module.css'
import { FaArrowUp, FaArrowDown, FaPlay, FaPause, FaRedo } from 'react-icons/fa'

export default function Clock() {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('Session');
    const [time, setTime] = useState(25 * 60);
    const beepRef = useRef(null);

    useEffect(() => {
        if (!isRunning) {
            if (mode === 'Session') {
                setTime(sessionLength * 60);
            } else {
                setTime(breakLength * 60);
            }
        }
    }, [sessionLength, breakLength]);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prev => {
                    if (prev === 0) {
                        beepRef.current.play();
                        if (mode === 'Session') {
                            setMode('Break');
                            return breakLength * 60;
                        } else {
                            setMode('Session');
                            return sessionLength * 60;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, breakLength, sessionLength, mode]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const resetTimer = () => {
        setIsRunning(false);
        setBreakLength(5);
        setSessionLength(25);
        setMode('Session');
        setTime(25 * 60);
        beepRef.current.pause();
        beepRef.current.currentTime = 0;
    };

    const onArrowClick = (type, action) => {
        if (isRunning) return;
        if (type === 'Break') {
            if (action === 'up' && breakLength < 60) {
                setBreakLength(breakLength + 1);
            } else if (action === 'down' && breakLength > 1) {
                setBreakLength(breakLength - 1);
            }
        } else {
            if (action === 'up' && sessionLength < 60) {
                setSessionLength(sessionLength + 1);
            } else if (action === 'down' && sessionLength > 1) {
                setSessionLength(sessionLength - 1);
            }
        }
    };

    return (
        <div className={styles.clockContainer}>
            <h1 className={styles.title}>25 + 5 Clock</h1>
            <div className={styles.lengthRow}>
                <LengthSelector type="Break" length={breakLength} onArrowClick={onArrowClick} />
                <LengthSelector type="Session" length={sessionLength} onArrowClick={onArrowClick} />
            </div>
            <TimerDisplay
                mode={mode}
                time={time}
                formatTime={formatTime}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                resetTimer={resetTimer}
            />
            {/* Required Audio Element */}
            <audio
                id="beep"
                preload="auto"
                ref={beepRef}
                src={alarm}
            />
        </div>
    );
}

function LengthSelector({ type, length, onArrowClick }) {
    const isBreak = type === 'Break';
    return (
        <div className={styles.lengthSelector}>
            <p id={isBreak ? 'break-label' : 'session-label'}>{type} Length</p>
            <div className={styles.lengthControl}>
                <button className={styles.button} id={isBreak ? 'break-increment' : 'session-increment'} onClick={() => onArrowClick(type, 'up')}>
                    <FaArrowUp className={styles.icons} />
                </button>
                <span id={isBreak ? 'break-length' : 'session-length'}>{length}</span>
                <button className={styles.button} id={isBreak ? 'break-decrement' : 'session-decrement'} onClick={() => onArrowClick(type, 'down')}>
                    <FaArrowDown className={styles.icons} />
                </button>
            </div>
        </div>
    );
}

function TimerDisplay({ mode, time, formatTime, isRunning, setIsRunning, resetTimer }) {
    return (
        <div className={styles.timerDisplay}>
            <h2 id="timer-label">{mode}</h2>
            <p className={styles.timer} id="time-left">{formatTime(time)}</p>
            <div className={styles.controlButtonContainer}>
                <button className={styles.button} id="start_stop" onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? <FaPause className={styles.icons} /> : <FaPlay className={styles.icons} />}
                </button>
                <button className={styles.button} id="reset" onClick={resetTimer}>
                    <FaRedo className={styles.icons} />
                </button>
            </div>
        </div>
    );
}
