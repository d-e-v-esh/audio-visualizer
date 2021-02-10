import React from "react";
import ReactPlayer from "react-player";
import melon from "./water.mp3";
import Visualizer from "./components/Visualizer";

function App() {
  const audioTune = new Audio(melon);
  return (
    <div>
      {/* <ReactPlayer
        controls="true"
        url="https://www.youtube.com/watch?v=TtDg6Dc6JDo&ab_channel=CodyKo"
      /> */}
      <Visualizer />
    </div>
  );
}

export default App;
