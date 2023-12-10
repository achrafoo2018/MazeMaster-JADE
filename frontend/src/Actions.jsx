import React from "react";
import { Slider } from "primereact/slider";
import { Button } from 'primereact/button'


const Actions = ({ speed, setSpeed }) => {
  return (
    <>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Game Settings</h3>
      <div className="flex flex-column gap-6">
        <div>
          <label htmlFor="speed">Speed</label>
          <Slider min={100} max={2000} value={speed} onChange={(e) => setSpeed(e.value)} step={100} />
        </div>
        <hr />

        <div>
          <label htmlFor="actions">Actions</label>
          <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
            <Button label="Large" icon="pi pi-check" size="large" />
            <Button label="Large" icon="pi pi-check" size="large" />
            <Button label="Large" icon="pi pi-check" size="large" />
            <Button icon="pi pi-check" />
          </div>
        </div>
        <hr />


      </div>
    </>

  );
}

export default Actions;
