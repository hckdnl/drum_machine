import "./App.css";
import React, { Component } from "react";

const audioClips = [
  {
    id: "Q",
    description: "Heater 1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    id: "W",
    description: "Heater 2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    id: "E",
    description: "Heater 3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    id: "A",
    description: "Heater 4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    id: "S",
    description: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    id: "D",
    description: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    id: "Z",
    description: "Kick-n'-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    id: "X",
    description: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    id: "C",
    description: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "",
    };

    // Create refs for each audio clip
    this.audioRefs = {};
    audioClips.forEach((clip) => {
      this.audioRefs[clip.id] = React.createRef();
    });
  }

  handleDrumPadClick = (clip) => {
    this.setState({ displayText: clip.description });
    const audio = this.audioRefs[clip.id].current;
    if (audio && audio.play) {
        audio.play().catch((error) => {
            console.error("Playback failed:", error);
        });
    }
};


handleKeyPress = (event) => {
  const clip = audioClips.find((c) => c.id === event.key.toUpperCase());
  if (clip) this.handleDrumPadClick(clip);
};


  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    return (
      <div id="drum-machine">
        <div className="inner-container">
          <div className="pad-bank">
            {audioClips.map((clip) => (
              <button
              id={clip.id}
              key={clip.id}
              className="drum-pad"
              onClick={() => this.handleDrumPadClick(clip)}
            >
              {clip.id}
              <audio ref={this.audioRefs[clip.id]} id={clip.id} className="clip" src={clip.src}></audio>
            </button>
          ))}
          </div>
          <div className="controls-container">
            <div id="display">{this.state.displayText}</div>
            {/* You can add other controls here if needed */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
