/* eslint-disable react/prop-types */
import React from "react";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { generateMaze, runAgents } from "./services/gameServices";
import hamma from "./assets/hamma.jpg";
import chroufa from "./assets/chroufa.jpg";
import slouma from "./assets/slouma.jpg";

const Actions = ({
  speed,
  setSpeed,
  setGameStarted,
  setMatrix,
  setAgentPaths,
}) => {
  const handleMatrix = async () => {
    try {
      const maze = await generateMaze();
      maze.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          maze[rowIndex][colIndex] = parseInt(cell);
        });
      });
      console.log("Maze from backend")
      console.log(maze)

      setMatrix(maze);
    } catch (error) {
      console.error(error);
      alert("Error please refresh and try again");
    }
  };

  const handleAgents = async () => {
    try {
      const agentsTraversal = await runAgents();
      console.log("Agents from backend");
      console.log(agentsTraversal);

      // TODO:
      // ya chroufa enti 3andek bfs, dfs and astar data
      // el function hedi bch tjib el parcours bta3 el agents ou t7otou fel state bta3 el parent component
      // el component maze bch ifi9 bel changes ou wa9teli truni run bch iet7arkou selon new data
      setAgentPaths({
        bfs: {
          path: [], // el path bta3 el bfs fel response bte3ek
          image: hamma,
          color: "blue",
          msgs: [], // el mesgs bta3 el bfs fel response bte3ek
          res: [], // el messages bta3 el agent master coodinater lel aget bfs
        },
        dfs: {
          path: [], // same
          image: chroufa,
          color: "green",
          msgs: [], // same,
          res: [], // same
        },
        astar: {
          path: [], // same
          image: slouma,
          color: "red",
          msgs: [], // same,
          res: [], // same
        },
      });
    } catch (error) {
      console.error(error);
      alert("Error please refresh and try again");
    }
  };

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
                handleMatrix();
                // handleAgents() // na7i el comment bch te5dem
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
