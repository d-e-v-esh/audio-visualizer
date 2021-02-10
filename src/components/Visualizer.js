import React, { useRef, useEffect } from "react";

const Visualizer = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  useEffect(() => {
    function drawVisualizer() {
      requestAnimationFrame(drawVisualizer);

      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserNode.getByteFrequencyData(dataArray);
      const width = canvasRef.width;
      const height = canvasRef.height;
      const barWidth = width / bufferLength;

      const canvasContext = canvasRef.current.getContext("2d");
      canvasContext.clearRect(0, 0, width, height);

      dataArray.forEach((item, index) => {
        const y = ((item / 255) * height) / 2;
        const x = barWidth * index;

        canvasContext.fillStyle = `hsl(${(y / height) * 400}, 100%, 50%)`;
        canvasContext.fillRect(x, height - y, barWidth, y);
      });
    }
  }, []);
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");

  //   canvas.width = window.innerWidth * 2;
  //   canvas.height = window.innerHeight * 2;
  //   canvas.style.width = `${window.innerWidth}px`;
  //   canvas.style.height = `${window.innerHeight}px`;
  //   contextRef.current = context;
  // }, []);

  const context = new AudioContext();
  console.log(contextRef.current);
  const analyserNode = new AnalyserNode(context, { fftSize: 256 });

  async function setupContext() {
    const sound = await getSound();
    // if ((context.state = "suspended")) {
    //   //as soon as someone interacts with the page, it will start the context for us.
    //   await context.resume();
    // }
    // We get our sound source from our sound function
    const source = context.createMediaStreamSource(sound);
    // Then we connect that source to the output speakers
    source.connect(context.destination);
  }

  const getSound = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        latency: 0,
      },
    });
  };

  setupContext();

  // drawVisualizer();

  return (
    <div>
      this is the Visualizer Component
      <div>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Visualizer;
