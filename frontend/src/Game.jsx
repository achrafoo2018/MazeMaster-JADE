import React, { useState } from 'react'
import Maze from './Maze'
import Logs from './Logs'

function Game() {
    return (
        <>
            <div className='grid p-6'>
                <div className="col">
                    <Maze />
                </div>
                <div className="col">
                    <div className="text-center p-3 border-round-sm bg-primary font-bold ">2</div>
                </div>
                <div className="col h-full">
                    <Logs />
                </div>
            </div>

        </>

    )
}

export default Game