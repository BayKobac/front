"use client"

import { useState } from "react";
import { ethers } from "ethers";

const WordGuessingGame = () => {
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameLogs, setGameLogs] = useState<{player:string; guess:string; similarity: number; rank: number }[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [prizePool, setPrizePool] = useState<number>(0);


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

  const ContractInteraction = async (guess: string) => {
    const correctWord = "apple";
    const similarity = guess === correctWord ? 100 : Math.floor(Math.random() * 100);
    const rank = `${Math.floor(Math.random() * 1000) + 1}/1000`;

    const newLog = {
      player: walletAddress || "Unknown",
      guess: guess,
      similarity: parseFloat(similarity.toFixed(2)),
      rank: rank, 
    };
   
    return newLog
  };

  const handleSubmit = async () => {
    if (!userGuess) {
      setFeedback("Please enter a word.");
      return;

    };

    const newLog = await ContractInteraction(userGuess);

    setGameLogs((prevLogs) => [...prevLogs, newLog]);
    setFeedback(`Your guess "${userGuess}" has been submitted.`);
    setUserGuess("");
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
        padding: "20px",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* 왼쪽 상단 이름 */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "20px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Word Guessing Game
      </div>

      {/* 오른쪽 상단 메타마스크 연결 */}
      <button
        onClick={connectWallet}
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "14px",
          backgroundColor: walletAddress ? "#28a745" : "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {walletAddress ? "Wallet Connected" : "Connect Wallet"}
      </button>

      {/* Prize Pool */}
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#0070f3",
        }}
      >
        Prize Pool: {prizePool.toFixed(2)} ETH
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h1 style={{ color: "#0070f3" }}>Make Your Guess!</h1>

        {/* 단어 입력 칸 */}
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter your guess"
          style={{
            padding: "15px",
            fontSize: "16px",
            width: "60%",
            marginBottom: "20px",
            border: "2px solid #0070f3",
            borderRadius: "5px",
            fontWeight: "bold",
            backgroundColor: "white",
            outline: "none",
          }}
        />
        <br />
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

        {/* 피드백 메시지 */}
        {feedback && <p style={{ marginTop: "10px", color: "#555" }}>{feedback}</p>}

        {/* 게임 로그 */}
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h3 style={{ color: "#0070f3" }}>Game Logs</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {gameLogs.map((log, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <strong>Player:</strong> {log.player} | <strong>Guess:</strong> {log.guess} |{" "}
                <strong>Similarity:</strong> {log.similarity}% | <strong>Rank:</strong>{log.rank}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WordGuessingGame;
