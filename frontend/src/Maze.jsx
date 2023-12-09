import React, { useState, useEffect, useRef } from 'react';
import hamma from './assets/hamma.jpg';
import chroufa from './assets/chroufa.jpg';
import slouma from './assets/slouma.jpg';
import './maze.css';

const Maze = () => {
    const [matrix] = useState([
        [0, 1, 0, 0, 0, 0, 0, 1],
        [0, 0, 1, 0, 1, 1, 0, 0],
        [1, 0, 1, 0, 0, 0, 1, 0],
        [1, 0, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 1, 1, 0, 1],
        [0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0],
    ]);

    const agentPaths = {
        bfs: {
            path: [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
                [3, 1],
                [4, 1],
                [3, 2],
                [5, 1],
                [4, 0],
                [6, 1],
                [5, 2],
                [5, 0],
                [7, 1],
                [7, 2],
                [7, 0],
                [7, 3],
                [6, 3],
                [6, 4],
                [5, 4],
                [5, 5],
                [5, 6],
                [6, 6],
                [4, 6],
                [5, 7],
                [7, 6],
                [3, 6],
                [7, 7]
            ]
            , image: hamma, color: 'blue', msgs: ['aeae', 'ezazeaz']
        },
        dfs: {
            path: [
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1],
                [4, 1],
                [5, 1],
                [6, 1],
                [7, 1],
                [7, 2],
                [7, 3],
                [6, 3],
                [6, 4],
                [5, 4],
                [5, 5],
                [5, 6],
                [6, 6],
                [7, 6]
            ]
            , image: chroufa, color: 'green', msgs: ['aeae', 'ezazeaz']
        },
        astar: {
            path: [
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1],
                [4, 1],
                [5, 1],
                [6, 1],
                [7, 1],
                [7, 2],
                [7, 3],
                [6, 3],
                [6, 4],
                [5, 4],
                [5, 5],
                [5, 6],
                [6, 6],
                [4, 6],
                [5, 7],
                [3, 6],
                [3, 7],
                [5, 2],
                [7, 0],
                [2, 7],
                [1, 7],
                [1, 6],
                [0, 6],
                [5, 0],
                [0, 5],
                [3, 2],
                [0, 4],
                [4, 0],
                [0, 3],
                [1, 3],
                [2, 3],
                [2, 4],
                [3, 4],
                [2, 5],
                [0, 2],
                [0, 3],
                [1, 3],
                [2, 3],
                [2, 4],
                [3, 4],
                [2, 5],
                [0, 4],
                [0, 5],
                [0, 6],
                [1, 6],
                [1, 7],
                [2, 7],
                [3, 7],
                [3, 6],
                [4, 6],
                [5, 6],
                [6, 6],
                [5, 7],
                [1, 0],
                [0, 0],
                [7, 6]
            ]
            , image: slouma, color: 'red', msgs: ['aeae', 'ezazeaz']
        }
    };
    const [agentPositions, setAgentPositions] = useState({
        bfs: [0, 0],
        dfs: [0, 0],
        astar: [0, 0]
    });

    const cellColorRef = useRef({});

    useEffect(() => {
        const intervalIds = [];

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
            }, 1000); // Adjust time as needed

            intervalIds.push(id);
        });

        return () => {
            intervalIds.forEach(clearInterval);
        };
    }, []);

    const moveAgent = (agent, row, col) => {
        setAgentPositions(prevPositions => ({
            ...prevPositions,
            [agent]: [row, col]
        }));
    
        // Get the step number for the agent
        const step = agentPaths[agent].path.findIndex(position => position[0] === row && position[1] === col);
    
        // Log the agent's information and associated message
        console.log(`${agent.toUpperCase()} - Position: [${row}, ${col}]`);
        if (step < agentPaths[agent].msgs.length) {
            console.log(`Message: ${agentPaths[agent].msgs[step]}`);
        } else {
            console.log("No more messages.");
        }
        console.log("-------");
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
                        data-row={rowIndex}
                        data-col={colIndex}
                        className={`cell ${cell === 1 ? 'obstacle' : ''}`}>
                    </div>
                ))}
            </div>
        ));
    };

    const renderAgents = () => {
        const offset = 10; // Adjust based on the number of agents
        return Object.keys(agentPaths).map((agent, index) => {
            const [row, col] = agentPositions[agent];
            const style = {
                top: `${row * 40 + offset * index}px`,  // Assuming each cell is 40px
                left: `${col * 40}px`  // Adjust based on actual cell size
            };
            return (
                <img key={agent}
                    src={agentPaths[agent].image}
                    alt={agent}
                    className="agent-image"
                    style={style} />
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

