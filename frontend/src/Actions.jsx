/* eslint-disable react/prop-types */
import React from "react";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { generateMaze, runAgents } from "./services/gameServices";
import { castMatrix, formatAgentsData } from './utils'

const Actions = ({
  speed,
  setSpeed,
  setGameStarted,
  setMatrix,
  setAgentPaths,
  setIsLoading
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
      alert("Error please refresh and try again");
      setIsLoading(false); // Stop loading in case of error
    }
  }

  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Game Settings
      </h3>
      <div className="flex flex-column gap-6 ">
        <div>
          <label htmlFor="speed">Speed</label>
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
          <label htmlFor="actions">Actions</label>
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
                shuffle()
              }}
              icon="pi pi-refresh"
              size="large"
              className="p-2"
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

        <div>
          <label htmlFor="actions">Notes</label>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quod
            enim quis mollitia veritatis laudantium labore illo nostrum,
            aspernatur corrupti culpa? Quasi, veniam. Fuga odit atque, optio
            voluptatem ipsum minus.
          </p>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Actions;
