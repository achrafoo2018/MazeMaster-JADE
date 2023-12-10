/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';

import './maze.css';

const Maze = ({ speed, addMsg,
    gameStarted,
    resetMsgs,
    setGameStarted, matrix, agentPaths }) => {
    const WIDTH = 40;
    const HEIGHT = 40;

    const [agentPositions, setAgentPositions] = useState({
        bfs: [0, 0],
        dfs: [0, 0],
        astar: [0, 0]
    });

    const cellColorRef = useRef({});

    const resetCellColors = () => {
        // Reset the reference object storing the cell colors
        cellColorRef.current = {};

        // Go through each cell and reset the background color only if it's not an obstacle
        matrix.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.querySelector(`.cell[data-row='${rowIndex}'][data-col='${colIndex}']`);
                if (cell === 0) { // Only reset cells that are not obstacles
                    cellElement.style.background = 'white';
                }
                
            });
        });
    };


    useEffect(() => {
        const intervalIds = [];
        if (gameStarted) {
            addMsg({
                agent: 'MASTER',
                text: 'START !!!!!'
            })

            Object.keys(agentPaths).forEach(agent => {
                let step = 0;
                const id = setInterval(() => {
                    if (step < agentPaths[agent].path.length) {
                        const [row, col] = agentPaths[agent].path[step];
                        updateCellColor(row, col, agentPaths[agent].color);
                        moveAgent(agent, row, col);
                        step++;
                    } else {
                        clearInterval(id);
                    }
                }, speed); // Adjust time as needed

                intervalIds.push(id);
            });
            

        } else {
            setAgentPositions(
                {
                    bfs: [0, 0],
                    dfs: [0, 0],
                    astar: [0, 0]
                }
            )

            resetCellColors()
            resetMsgs()            
        }

        return () => {
            intervalIds.forEach(clearInterval);
        };
    }, [gameStarted]);

    const moveAgent = (agent, row, col) => {
        setAgentPositions(prevPositions => ({
            ...prevPositions,
            [agent]: [row, col]
        }));

        // Get the step number for the agent
        const step = agentPaths[agent].path.findIndex(position => position[0] === row && position[1] === col);

        // Log the agent's information and associated message
        console.log(`${agent.toUpperCase()} - Position: [${row}, ${col}]`);
        console.log("-------");

        if (step < agentPaths[agent].messages.length) {
            // Checking if the agent still has messages to display
            addMsg({
                agent: agent.toUpperCase(),
                text: agentPaths[agent].messages[step]
            })
            addMsg({
                agent: 'MASTER',
                text: agentPaths[agent].answers[step]
            })
        }
    };


    const updateCellColor = (row, col, color) => {
        const key = `${row}-${col}`;
        if (!cellColorRef.current[key]) {
            cellColorRef.current[key] = [];
        }
        if (!cellColorRef.current[key].includes(color)) {
            cellColorRef.current[key].push(color);
        }

        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        if (cell) {
            cell.style.background = getCombinedColor(cellColorRef.current[key]);
        }
    };

    const getCombinedColor = (colors) => {
        if (colors.length === 1) {
            return colors[0];
        } else {
            return `linear-gradient(to right, ${colors.join(', ')})`;
        }
    };

    const renderMaze = () => {
        return matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="maze-row">
                {row.map((cell, colIndex) => (
                    <div key={colIndex}
                        style={{ width: WIDTH, height: HEIGHT }}
                        data-row={rowIndex}
                        data-col={colIndex}
                        className={`cell ${cell === 1 ? 'obstacle' : ''}`}>
                    </div>
                ))}
            </div>
        ));
    };
    const renderAgents = () => {
        // Function to calculate the offset based on the number of agents in the same cell
        const calculateOffset = (row, col, index, maxAgents) => {
            const offset = 5; // Base offset value in pixels
            const angle = (2 * Math.PI / maxAgents) * index; // Angle to position each agent
            return {
                x: Math.cos(angle) * offset,
                y: Math.sin(angle) * offset
            };
        };

        // Find the maximum number of agents in any single cell
        const maxAgentsPerCell = Object.values(agentPositions).reduce((acc, position) => {
            const key = `${position[0]}-${position[1]}`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(agentPaths).map((agent, index) => {
            const [row, col] = agentPositions[agent];
            const cellSize = WIDTH; // Cell size (width and height)

            // Determine the number of agents in the same cell
            const agentsInCell = maxAgentsPerCell[`${row}-${col}`];

            // Calculate offset for the current agent
            const { x: offsetX, y: offsetY } = calculateOffset(row, col, index, agentsInCell);

            // Centering the agent in the cell with the offset
            const style = {
                top: `calc(${row * cellSize + cellSize / 2}px + ${offsetY}px)`,
                left: `calc(${col * cellSize + cellSize / 2}px + ${offsetX}px)`,
                transform: 'translate(-50%, -50%)' // Adjusts the centering considering the offset
            };

            return (
                <img key={agent}
                    src={agentPaths[agent].image}
                    alt={agent}
                    className="agent-image"
                    style={{ ...style, width: WIDTH / 2, height: HEIGHT / 2, transition: `top ${speed}ms, left ${speed}ms` }} />
            );
        });
    };



    return (
        <div className="maze-container">
            {renderMaze()}
            {renderAgents()}
        </div>
    );
};

export default Maze;

