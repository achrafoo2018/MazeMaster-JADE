import React, { useState } from 'react'
import Maze from './Maze'
import Logs from './Logs'
import Actions from './Actions'

function Game() {
    const [speed, setSpeed] = useState(1000);
    return (
        <>
            <div className='grid p-6'>
                <div className="col">
                    <Maze speed={speed}/>
                </div>
                <div className="col">
                    <Actions speed={speed} setSpeed={setSpeed}/>
                </div>
                <div className="col h-full">
                    <Logs />
                </div>
            </div>

        </>

    )
}

export default Game