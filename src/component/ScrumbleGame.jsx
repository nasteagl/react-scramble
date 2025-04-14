import { images } from '../constants/images.js';
import { words } from '../constants/words.js';
import { useEffect, useState } from "react";

export function ScrumbleGame() {
    const [selectedWord, setSelectedWord] = useState("");
    const [scrambleWords, setScrambleWords] = useState([]);
    const [currentLetter, setCurrentLetter] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    const [gameResult, setGameResult] = useState("");
    const [usedLetters, setUsedLetters] = useState([]);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        startGame();
    }, []);

    function shuffle(word) {
        return word.split("").sort(() => Math.random() - 0.5);
    }

    function startGame() {
        const word = words[Math.floor(Math.random() * words.length)];
        setSelectedWord(word);
        setScrambleWords(shuffle(word));
        setCurrentLetter(Array(word.length).fill("_"));
        setUsedLetters([]);
        setAttempts(0);
        setGameResult("");
        setImageIndex(Math.floor(Math.random() * images.length));
    }

    function handleClick(letter) {
        if (gameResult !== "" || usedLetters.includes(letter)) return;

        const index = currentLetter.indexOf("_");

        const newAttempt = [...currentLetter];
        newAttempt[index] = letter;
        setCurrentLetter(newAttempt);
        setUsedLetters([...usedLetters, index]);

        const createdWord = newAttempt.join("");

        if (!newAttempt.includes("_")) {
            if (createdWord === selectedWord) {
                setGameResult("You win");
            } else {
                const newChange = attempts + 1;
                setAttempts(newChange);
                setImageIndex(newChange);

                if (newChange >= 3) {
                    setGameResult("You lose!");
                } else {
                    setCurrentLetter(Array(selectedWord.length).fill("_"));
                    setUsedLetters([]);
                }
            }
        }
    }

    function renderGame() {
        return (
            <>
                <div className="image">
                    <img src={images[imageIndex]}  />
                </div>

                                  <p>Try to guess the word:</p>

                <div className="word">
                    {currentLetter.map((letter, i) => (
                        <span key={i}>{letter}</span>
                    ))}
                </div>


                <div className="letters">
                    {scrambleWords.map((letter, i) => (

                        <button
                            key={i}
                            onClick={() => handleClick(letter)}
                            disabled={usedLetters.includes(letter)}
                        >
                            {letter}
                        </button>

                    ))}
                </div>


                <p>Attempts left: {3 - attempts}</p>
            </>
        );
    }

    function renderResult() {
        return (
            <div>
                <p>{gameResult}</p>
                <button onClick={startGame}>Restart</button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Word Scramble</h1>
            {gameResult === "" ? renderGame() : renderResult()}
        </div>
    );
}
