import React, { useEffect, useState } from "react";
import Maze from "./Maze";
import Logs from "./Logs";
import Actions from "./Actions";
import { getMaze, runAgents } from "./services/gameServices";
import { ProgressSpinner } from "primereact/progressspinner";

function Game() {
  const [msgs, setMsgs] = useState([]);

  const addMsg = (msg) => {
    setMsgs((msgs) => [msg, ...msgs]);
  };

  const resetMsgs = () => {
    setMsgs([]);
  };

  const [speed, setSpeed] = useState(1000);
  const [gameStarted, setGameStarted] = useState(false);
  const [matrix, setMatrix] = useState([]);

  // Initial paths already set for test purposes
  const [agentPaths, setAgentPaths] = useState({});

  const [isLoading, setIsLoading] = useState(true); // New state for loading status

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true); // Start loading
        const maze = await getMaze();
        // cast the matrix to int
        maze.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            maze[rowIndex][colIndex] = parseInt(cell);
          });
        });
        setMatrix(maze);

        const paths = await runAgents();
        setAgentPaths(paths);

        setIsLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error(error);
        alert("Error please refresh and try again");
        setIsLoading(false); // Stop loading in case of error
      }
    }
    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <ProgressSpinner />
      </div>
    );
  }

  console.log("Matrix from backend");
  console.log(matrix);
  console.log("Agents from backend");
  console.log(agentPaths);

  return (
    <>
      <div className="grid p-6">
        <div className="col">
          <Maze
            addMsg={addMsg}
            speed={speed}
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            resetMsgs={resetMsgs}
            matrix={matrix}
            agentPaths={agentPaths}
          />
        </div>
        <div className="col">
          <Actions
            speed={speed}
            setSpeed={setSpeed}
            setGameStarted={setGameStarted}
            setMatrix={setMatrix}
            setAgentPaths={setAgentPaths}
          />
          <div className="mb-8" />
        </div>
        <div className="col">
          <Logs msgs={msgs} />
        </div>
      </div>
    </>
  );
}

export default Game;
