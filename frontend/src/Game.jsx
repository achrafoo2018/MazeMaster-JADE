import React, { useState } from 'react'
import Maze from './Maze'
import Logs from './Logs'
import Actions from './Actions'

function Game() {
    const [msgs, setMsgs] = useState([])
    const addMsg = (msg) => {
        setMsgs(msgs => [msg, ...msgs])
    }

    const resetMsgs = () => {
        setMsgs([])
    }  

    const [speed, setSpeed] = useState(1000);
    const [gameStarted, setGameStarted] = useState(false);
    return (
        <>
            <div className='grid p-6'>
                <div className="col">
                    <Maze addMsg={addMsg} speed={speed} gameStarted={gameStarted} setGameStarted={setGameStarted} resetMsgs={resetMsgs} />
                </div>
                <div className="col">
                    <Actions speed={speed} setSpeed={setSpeed} setGameStarted={setGameStarted} />
                </div>
                <div className="col">
                    <Logs msgs={msgs} />
                </div>
            </div>

        </>

    )
}

export default Game