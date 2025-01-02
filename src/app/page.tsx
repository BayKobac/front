"use client"

import { useState } from "react";
import { ethers } from "ethers";

const WordGuessingGame = () => {
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        setFeedback(`Connected to wallet: ${accounts[0]}`);
      } catch (error) {
        setFeedback("Failed to connect wallet.");
      }
    } else {
      setFeedback("MetaMask is not installed.");
    }
  };

  const mockSubmitGuess = async (guess: string) => {
    const correctWord = "apple";
    const similarity = guess === correctWord ? 100 : Math.floor(Math.random() * 100);

    if (guess === correctWord) {
      return { isCorrect: true, feedback: `You guessed it! (${similarity}% similarity)` };
    } else {
      return { isCorrect: false, feedback: `Try again! (${similarity}% similarity)` };
    }
  };

  const handleSubmit = async () => {
    const response = await mockSubmitGuess(userGuess);
    setIsCorrect(response.isCorrect);
    setFeedback(response.feedback);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1>Word Guessing Game</h1>
      <button
        onClick={connectWallet}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: walletAddress ? "#28a745" : "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {walletAddress ? "Wallet Connected" : "Connect Wallet"}
      </button>
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Enter your guess"
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "80%",
          marginBottom: "20px",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit Guess
      </button>
      {feedback && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: isCorrect === true ? "#d4edda" : isCorrect === false ? "#f8d7da" : "#fff3cd",
            color: isCorrect === true ? "#155724" : isCorrect === false ? "#721c24" : "#856404",
          }}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default WordGuessingGame;
