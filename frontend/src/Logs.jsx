import React from "react";
import { Panel } from "primereact/panel";
import hamma from "./assets/hamma.jpg";
import chroufa from "./assets/chroufa.jpg";
import slouma from "./assets/slouma.jpg";
import fanen from "./assets/fanen.jpg";
import { Card } from "primereact/card";

function Logs({ msgs }) {
  const imgs = {
    ASTAR: slouma,
    DFS: chroufa,
    BFS: hamma,
    MASTER: fanen,
  };

  // const displayMsg = (msg) => {
  //     return (
  //         <div className='flex flex-row items-center'>
  //             <img src={imgs[msg.agent]} className=' mr-2 logs-imgs' style={{ width: '30px', height: '30px' }} />
  //             <p className='m-0'>{msg.text}</p>
  //         </div>
  //     )

  // }

  const displayMsg = (msg) => {
    return (
      <div
        className="p-d-flex p-ai-center"
        style={{ marginBottom: "1em", position: "relative" }}
      >
        <img
          src={imgs[msg.agent]}
          alt={msg.agent}
          className="p-mr-2"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
        <div
          style={{
            backgroundColor: "#f0f0f0",
            borderRadius: "15px",
            padding: "10px",
            position: "absolute",
            left: "45px",
            top: "50%",
            transform: "translateY(-50%)",
            boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
            zIndex: 1,
          }}
        >
          <strong>{msg.agent} Agent</strong>
          <p className="p-m-0" style={{ marginTop: "5px" }}>
            {msg.text}
          </p>
        </div>
        <div
          style={{
            width: "0",
            height: "0",
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderRight: "10px solid #f0f0f0",
            position: "absolute",
            left: "30px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        ></div>
      </div>
    );
  };
  const displayMsgs = () => {
    // eslint-disable-next-line react/prop-types
    if (msgs.length === 0) {
      return <p className="text-center" style={{
        marginTop: '20px',
        marginBottom: '20px',
      }}>No logs yet</p>;
    }
    console.log("Messages : -----------", msgs);
    // eslint-disable-next-line react/prop-types
    return msgs.map((msg, index) => {
      return (
        <div key={index} className="p-2">
          {displayMsg(msg)}
        </div>
      );
    });
  };

  const CustomHeader = () => {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: '20px', 
        marginTop: '20px' ,
        marginLeft: '10px',
      }}>
        <h2 style={{ fontSize: "1.5em" }}>Chat room</h2>
      </div>
    );
  };
  
  return (
    <Panel
      header={<CustomHeader />}
      style={{ height: "800px", overflowY: "scroll" }}
    >
      <div style={{ marginTop: "20px" }}>{displayMsgs()}</div>
    </Panel>
  );
}

export default Logs;
