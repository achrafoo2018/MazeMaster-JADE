/* eslint-disable react/prop-types */
import React from "react";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { generateMaze, runAgents } from "./services/gameServices";
import { castMatrix, formatAgentsData } from "./utils";

const Actions = ({
  speed,
  setSpeed,
  setGameStarted,
  setMatrix,
  setAgentPaths,
  setIsLoading,
}) => {
  // const handleMatrix = async () => {
  //   try {
  //     const maze = await generateMaze();
  //     setMatrix(castMatrix(maze));
  //     console.log("Maze from backend")
  //     console.log(maze)

  //   } catch (error) {
  //     console.error(error);
  //     alert("Error please refresh and try again");
  //   }
  // };

  // const handleAgents = async () => {
  //   try {
  //     const agentsTraversal = await runAgents();
  //     console.log("Agents from backend");
  //     console.log(agentsTraversal);

  //     setAgentPaths(formatAgentsData(agentsTraversal));
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error please refresh and try again");
  //   }
  // };

  const shuffle = async () => {
    try {
      setIsLoading(true); // Start loading
      setGameStarted(false);
      const maze = await generateMaze();
      setMatrix(castMatrix(maze));

      const paths = await runAgents();
      setAgentPaths(formatAgentsData(paths));
      setIsLoading(false); // Data fetched, stop loading
    } catch (error) {
      console.error(error);
      // alert("Error please refresh and try again");
      setIsLoading(false); // Stop loading in case of error
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Game Settings
      </h3>
      <div className="flex flex-column gap-4">
        <div>
          <h4 htmlFor="speed" style={{marginBottom: '10px'}}>Speed</h4>
          <Slider
            min={100}
            max={2000}
            value={speed}
            onChange={(e) => setSpeed(e.value)}
            step={100}
          />
        </div>
        <hr />

        <div>
          <h4 htmlFor="actions" style={{marginBottom: '10px'}}>Actions</h4>
          <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
            <Button
              onClick={() => {
                setGameStarted(true);
              }}
              icon="pi pi-play"
              size="large"
              className="p-2"
            >
              <span className="ml-2">Play</span>
            </Button>
            <Button
              onClick={() => {
                shuffle();
              }}
              icon="pi pi-refresh"
              size="large"
              className="p-2"
              severity="secondary"
            >
              <span className="ml-2">Shuffle</span>
            </Button>
            <Button
              onClick={() => {
                setGameStarted(false);
              }}
              icon="pi pi-times"
              size="large"
              className="p-2"
              severity="danger"
            >
              <span className="ml-2">Reset</span>
            </Button>
          </div>
        </div>
        <hr />

        <div className="notes-container">
          <h4 htmlFor="actions">Notes</h4>
          <div className="notes-content">
            <p>
              Welcome to the Maze Runner! This game challenges you to navigate
              through a dynamically generated maze. Below are some guidelines to
              enhance your experience:
            </p>
            <ol>
              <li>
                <strong>Shuffle:</strong> Generates a new maze layout. Click the
                'Shuffle' button to create a new maze.
              </li>
              <li>
                <strong>Play:</strong> Starts the maze-solving process. Once you
                click 'Play', the agents will begin their journey through the
                maze.
              </li>
              <li>
                <strong>Speed Control:</strong> Use the slider to adjust the
                speed of the agents. This determines how fast they navigate
                through the maze.
              </li>
              <li>
                <strong>Reset:</strong> Stops the current game and resets the
                maze to its initial state.
              </li>
              <li>
                <strong>Logs:</strong> Keep an eye on the logs section to track
                the progress and actions of each agent as they solve the maze.
              </li>
            </ol>
            <p>
              Experiment with different mazes and speeds to see how each
              algorithm tackles the challenge. Happy solving!
            </p>
          </div>
        </div>

        <hr />
      </div>
    </>
  );
};

export default Actions;
