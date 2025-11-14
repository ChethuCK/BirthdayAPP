import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import "./Birthday.css";

export default function BirthdayWish() {
    const [windowSize, setWindowSize] = useState({ width: 300, height: 300 });
    const audioRef = useRef(null);

    useEffect(() => {
        function resize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Try autoplay muted (LAPTOP ONLY)
        audio.muted = true;
        audio.play().then(() => {
            // Unmute shortly after
            setTimeout(() => {
                audio.muted = false;
            }, 500);
        }).catch(() => {
            // Mobile will fail here – that's OK
            console.log("Autoplay blocked, waiting for tap...");
        });

        // Mobile unlock logic
        const unlockAudio = () => {
            if (audio.paused) {
                audio.muted = false;
                audio.play()
                    .then(() => console.log("Mobile audio started"))
                    .catch(err => console.log("Mobile play error:", err));
            }
        };

        document.addEventListener("click", unlockAudio);
        document.addEventListener("touchstart", unlockAudio);

        return () => {
            document.removeEventListener("click", unlockAudio);
            document.removeEventListener("touchstart", unlockAudio);
        };
    }, []);
    return (
        <div className="birthday-bg fade-in">

            {/* Sparkles */}
            <div className="sparkles"></div>

            {/* Confetti */}
            <Confetti width={windowSize.width} height={windowSize.height} />

            {/* Music */}
            <audio
                ref={audioRef}
                src="/music.mp3"
                loop
                preload="auto"
            />

            {/* Hearts */}
            <div className="hearts-container">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="heart"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${6 + Math.random() * 6}s`,
                        }}
                    />
                ))}
            </div>

            {/* Heading */}
            <h1 className="birthday-title">
                Wishing you a very Happy Birthday, Ananya! My Surya ❤️
            </h1>

            {/* Message */}
            <p className="birthday-message fade-in-delay">
                Happy 22nd Birthday, my love. Wishing you a beautiful and wonderful life ahead. Always be happy, my Surya. I love you so much, my Devi.❤️❤️❤️
            </p>

            {/* Photo Slider */}
            <div className="slider fade-in-delay">
                <div className="slides">
                    <img src="/img1.jpg" alt="memory1" />
                    <img src="/img2.jpg" alt="memory2" />
                    <img src="/img3.jpeg" alt="memory3" />
                </div>
            </div>

            {/* Footer Flowers */}

            {/* Signature */}
            <div className="signature fade-in">From CK with Love ❤️</div>
        </div>
    );
}
