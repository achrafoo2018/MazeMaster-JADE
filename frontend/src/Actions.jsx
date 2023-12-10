import React from "react";
import { Slider } from "primereact/slider";
import { Button } from 'primereact/button'


const Actions = ({ speed, setSpeed, setGameStarted }) => {
  return (
    <>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Game Settings</h3>
      <div className="flex flex-column gap-6 ">
        <div>
          <label htmlFor="speed">Speed</label>
          <Slider min={100} max={2000} value={speed} onChange={(e) => setSpeed(e.value)} step={100} />
        </div>
        <hr />

        <div>
          <label htmlFor="actions">Actions</label>
          <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
            <Button onClick={() => {setGameStarted(true)}} icon="pi pi-play" size="large" className="p-2"><span className="ml-2">Play</span></Button>
            <Button icon="pi pi-refresh" size="large" className="p-2"><span className="ml-2">Shuffle</span></Button>
            <Button onClick={() => {setGameStarted(false)}} icon="pi pi-times" size="large" className="p-2" severity="danger"><span className="ml-2">Reset</span></Button>
          </div>
        </div>
        <hr />

        <div>
          <label htmlFor="actions">Notes</label>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quod enim quis mollitia veritatis laudantium labore illo nostrum, aspernatur corrupti culpa? Quasi, veniam. Fuga odit atque, optio voluptatem ipsum minus.</p>
        </div>
        <hr />


      </div>
    </>

  );
}

export default Actions;
