import "./App.css";
import React from "react";

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  running: false,
  secondsLeft: 25 * 60,
  break: false,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.startStop = this.startStop.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
  }

  componentDidMount() {
    document.getElementById("reset").onclick = this.reset;
    document.getElementById("start_stop").onclick = this.startStop;
    document.getElementById("break-decrement").onclick = this.decreaseBreak;
    document.getElementById("break-increment").onclick = this.increaseBreak;
    document.getElementById("session-decrement").onclick = this.decreaseSession;
    document.getElementById("session-increment").onclick = this.increaseSession;
  }

  reset() {
    this.setState(initialState);
    document.getElementById("break-decrement").disabled = false;
    document.getElementById("break-increment").disabled = false;
    document.getElementById("session-decrement").disabled = false;
    document.getElementById("session-increment").disabled = false;
    clearInterval(this.timer);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  }

  startStop() {
    const running = !this.state.running;

    const breakDecr = document.getElementById("break-decrement");
    const breakIncr = document.getElementById("break-increment");
    const seshDecr = document.getElementById("session-decrement");
    const seshIncr = document.getElementById("session-increment");
    const beep = document.getElementById('beep');

    this.setState({
      running: running,
    });

    if (running) {
      breakDecr.disabled = true;
      breakIncr.disabled = true;
      seshDecr.disabled = true;
      seshIncr.disabled = true;

      this.timer = setInterval(() => {
        let seconds = this.state.secondsLeft;
        let breakBool = this.state.break;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          if (this.state.break) {
            breakBool = false;
            seconds = this.state.sessionLength * 60;
            beep.play();
          } else {
            breakBool = true;
            seconds = this.state.breakLength * 60;
            beep.play();
          }
        }
        this.setState({
          break: breakBool,
          secondsLeft: seconds,
        });
      }, 1000);
    } else {
      breakDecr.disabled = false;
      breakIncr.disabled = false;
      seshDecr.disabled = false;
      seshIncr.disabled = false;
      clearInterval(this.timer);
    }
  }

  decreaseBreak() {
    let newLength = this.state.breakLength - 1;
    if (newLength < 1) newLength = 1;
    this.setState({
      breakLength: newLength,
    });
  }

  increaseBreak() {
    let newLength = this.state.breakLength + 1;
    if (newLength > 60) newLength = 60;
    this.setState({
      breakLength: newLength,
    });
  }

  decreaseSession() {
    let newLength = this.state.sessionLength - 1;
    if (newLength < 1) newLength = 1;
    this.setState({
      sessionLength: newLength,
      secondsLeft: newLength * 60,
    });
  }

  increaseSession() {
    let newLength = this.state.sessionLength + 1;
    if (newLength > 60) newLength = 60;
    this.setState({
      sessionLength: newLength,
      secondsLeft: newLength * 60,
    });
  }

  render() {
    return (
      <div className="App container text-bg-secondary text-center p-5">
        <h1>25 + 5 Clock</h1>

        {/* Length Labels */}
        <div className="row">
          <div id="break-label" className="col-6">
            Break Length
          </div>
          <div id="session-label" className="col-6">
            Session Length
          </div>
        </div>

        {/* Button and Time row */}
        <div className="row">
          <div className="col-2"></div>

          <button id="break-decrement" className="col-1 btn btn-dark">
            <i class="fa-solid fa-minus"></i>
          </button>
          <div id="break-length" className="col-1">
            {this.state.breakLength}
          </div>
          <button id="break-increment" className="col-1 btn btn-dark">
            <i class="fa-solid fa-plus"></i>
          </button>

          <div className="col-2"></div>

          <button id="session-decrement" className="col-1 btn btn-dark">
            <i class="fa-solid fa-minus"></i>
          </button>
          <div id="session-length" className="col-1">
            {this.state.sessionLength}
          </div>
          <button id="session-increment" className="col-1 btn btn-dark">
            <i class="fa-solid fa-plus"></i>
          </button>

          <div className="col-2"></div>
        </div>

        {/* Session Label */}
        <div className="row">
          <div id="timer-label" className="col-12">
            {this.state.break ? "Break" : "Session"}
          </div>
        </div>

        {/* Session Timer */}
        <div className="row">
          <div id="time-left" className="col-12">
            {Math.floor(this.state.secondsLeft / 60)
              .toString()
              .padStart(2, "0")}
            :{(this.state.secondsLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        {/* Audio Element */}
        <audio
          id="beep"
          src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-14566/zapsplat_bell_small_reception_desk_bell_single_ring_005_15127.mp3"
        ></audio>

        {/* Control Buttons */}
        <div className="row">
          <div className="col-5"></div>

          <button id="start_stop" className="btn btn-dark col-1">
            <i class="fa-solid fa-play"></i>
            <i class="fa-solid fa-pause"></i>
          </button>
          <button id="reset" className="btn btn-dark col-1">
            <i class="fa-solid fa-arrows-rotate"></i>
          </button>

          <div className="col-5"></div>
        </div>
      </div>
    );
  }
}

export default App;
