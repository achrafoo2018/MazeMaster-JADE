import React from 'react'
import { Panel } from 'primereact/panel';
import hamma from './assets/hamma.jpg';
import chroufa from './assets/chroufa.jpg';
import slouma from './assets/slouma.jpg';
import fanen from './assets/fanen.jpg';

function Logs({ msgs }) {
    const imgs = {
        ASTAR: slouma,
        DFS: chroufa,
        BFS: hamma,
        MASTER: fanen
    }

    const displayMsg = (msg) => {
        return (
            <div className='flex flex-row items-center fade-in'>
                <img src={imgs[msg.agent]} className='mr-2 logs-imgs' style={{ width: '30px', height: '30px' }} />
                <p className='m-0'>{msg.text}</p>
            </div>
        );
    }

    const displayMsgs = () => {
        // eslint-disable-next-line react/prop-types
        if (msgs.length === 0) { return (<p className='text-center'>No logs yet</p>); }
        
        // eslint-disable-next-line react/prop-types        
        return msgs.map((msg, index) => {
            return (
                <div key={index} className='p-2'>
                    {displayMsg(msg)}
                </div>
            )
        })
    }

    return (
        <Panel header="Chat room" style={{ height: "800px", overflowY: "scroll" }}>
            {displayMsgs()}
        </Panel>
    )
}

export default Logs