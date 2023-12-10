import React from "react";
import { Slider } from "primereact/slider";


const Actions = ({speed, setSpeed}) => {
  return (
    <div>
      <Slider min={100} max={2000} value={speed} onChange={(e) => setSpeed(e.value)} step={100} />
      <div>Actions</div>
    </div>
  );
}

export default Actions;
