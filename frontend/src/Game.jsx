import React, { useEffect, useState } from "react";
import Maze from "./Maze";
import Logs from "./Logs";
import Actions from "./Actions";
import { getMaze, runAgents } from "./services/gameServices";
import { ProgressSpinner } from "primereact/progressspinner";
import { castMatrix, formatAgentsData } from './utils'

function Game() {
  const [msgs, setMsgs] = useState([]);

  const [speed, setSpeed] = useState(1000);
  const addMsg = (msg) => {
    setTimeout(() => {
      setMsgs((msgs) => [msg, ...msgs]);
    }, speed); // Adjust the delay as needed (500 ms in this example)
  };

  const resetMsgs = () => {
    setMsgs([]);
  };

 
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
        setMatrix(castMatrix(maze));

        const paths = await runAgents();
        setAgentPaths(formatAgentsData(paths));
        setIsLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error(error);
        alert("Error please refresh and try again");
        setIsLoading(false); // Stop loading in case of error
      }
    }
    fetchData();
  }, []);



  console.log("Matrix from backend");
  console.log(matrix);
  console.log("Agents from backend");
  console.log(agentPaths);

  return (
    <>
      <div className="grid p-6">
        <div className="col">
          {isLoading ? (
            <div
              className="flex justify-center items-center"
              style={{ height: "100vh" }}
            >
              <ProgressSpinner />
            </div>) : (<Maze
              addMsg={addMsg}
              speed={speed}
              gameStarted={gameStarted}
              setGameStarted={setGameStarted}
              resetMsgs={resetMsgs}
              matrix={matrix}
              agentPaths={agentPaths}
            />)}
        

        </div>
        <div className="col">
          <Actions
            speed={speed}
            setSpeed={setSpeed}
            setGameStarted={setGameStarted}
            setMatrix={setMatrix}
            setAgentPaths={setAgentPaths}
            setIsLoading={setIsLoading}
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
