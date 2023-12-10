import React, { useState } from 'react'
import Maze from './Maze'
import Logs from './Logs'

function Game() {
    const [msgs, setMsgs] = useState([])
    const addMsg = (msg) => {
        setMsgs([...msgs, msg])
    }

    return (
        <>
            <div className='grid p-6'>
                <div className="col">
                    <Maze addMsg={addMsg} />
                </div>
                <div className="col">
                    <div className="text-center p-3 border-round-sm bg-primary font-bold ">2</div>
                </div>
                <div className="col">
                    <Logs msgs={msgs} />
                </div>
            </div>

        </>

    )
}

export default Game