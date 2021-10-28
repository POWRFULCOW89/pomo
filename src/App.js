import { Component } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state={
      breakLength: 300,
      sessionLength: 1500,
      timeRemaining: 1500,
      running: false,
      timerType: 'Session'
    }

    this.handleClick = this.handleClick.bind(this);
    this.timer = this.timer.bind(this);
  }

  handleIncrement(target) {
    const incrementValue = 60;
    const maxLength = 3600;

    let incrementedBreakLength = this.state.breakLength + incrementValue;
    let incrementedSessionLength = this.state.sessionLength + incrementValue;
    let incrementedTimeRemaining = this.state.timeRemaining + incrementValue;

    switch(target){
      case 'break':
        if (this.state.breakLength < maxLength) {
          this.setState({
            breakLength: incrementedBreakLength
          });
        }
        break;
      case 'session':
        if (this.state.sessionLength < maxLength) {
          this.setState({
            sessionLength: incrementedSessionLength,
            timeRemaining: incrementedTimeRemaining
          });
        }
        break;
      default:
        console.log('Error at timer increment')
    }
  }

  handleDecrement(target) {

    const decrementValue = 60;
    const minLength = 60;

    let decrementedBreakLength = this.state.breakLength - decrementValue;
    let decrementedSessionLength = this.state.sessionLength - decrementValue;
    let decrementedTimeRemaining = this.state.timeRemaining - decrementValue;

    switch(target){
      case 'break':
        if(this.state.breakLength > minLength){
          this.setState({
            breakLength: decrementedBreakLength
          });
        }
        break;
      case 'session':
        if(this.state.sessionLength > minLength) {
          this.setState({
            sessionLength: decrementedSessionLength,
            timeRemaining: decrementedTimeRemaining
          });
        }
        break;
      default:
        console.log('Error at timer decrement')
    }
  }

  componentDidMount(){
   setInterval(this.timer, 1000);
  }

  timer() {
    let newTimeRemaining = this.state.timeRemaining - 1;
    if (this.state.running && newTimeRemaining > 0)
      {this.setState({timeRemaining: newTimeRemaining})}
      else if (this.state.running && newTimeRemaining === 0){
        this.setState({timeRemaining: newTimeRemaining});
        this.playSound();
      } 
    else if (this.state.running && newTimeRemaining < 0)
      {
        this.timerSwap();
      }
    else {clearInterval(this.timer)}
  }

  playSound() {
    const audio = document.getElementById('beep');
    audio.currentTime=0;
    audio.play();
  }

  timerSwap(){

    if(this.state.timerType === 'Session'){
      let newTimer = 'Break';
      let newTimeRemaining = this.state.breakLength;
      this.setState({
        timerType: newTimer,
        timeRemaining: newTimeRemaining
      })
    } else {
      let newTimer = 'Session';
      let newTimeRemaining = this.state.sessionLength;
      this.setState({
        timerType: newTimer,
        timeRemaining: newTimeRemaining
      })
    }
  }

  handleStopStart(){
    if (this.state.running){
      this.setState({
        running: false
      });
    } else {
      this.setState({
        running: true
      })
    }    
  }

  handleReset() {
    const audio = document.getElementById('beep');
    audio.currentTime=0;
    audio.pause();
    this.setState({
      running: false,
      breakLength: 300,
      sessionLength: 1500,
      timeRemaining: 1500,
      timerType: 'Session'
    })
  }

  handleClick(event){

    switch(event.target.id) {
      case 'break-decrement':
        if(!this.state.running){
          this.handleDecrement('break');
        }
        break;
      case 'break-increment':
        if(!this.state.running){
          this.handleIncrement('break');
        }
        break;
      case 'session-decrement':
        if(!this.state.running){
          this.handleDecrement('session');
        }
        break;
      case 'session-increment':
        if(!this.state.running){
          this.handleIncrement('session');
        }
        break;
      case 'start_stop':
        this.handleStopStart();
        break;
      case 'reset':
        this.handleReset();
        break;
      default:
        break;
    }
  }
  
  render() {
    return (
      <div className="App">
        
        <div id='break-settings'>
            <p id='break-label'>Break Length</p>
            <p id='break-length'>{this.state.breakLength / 60}</p>
            <button id='break-decrement' onClick={this.handleClick}><i className="fa fa-arrow-down"/></button>
            <button id='break-increment' onClick={this.handleClick}>
              <i className="fa fa-arrow-up"/>
            </button>
        </div>
        
        <div id='session-settings'>
          <p id="session-label">Session Length</p>
          <p id='session-length'>{this.state.sessionLength / 60}</p>
          <button id='session-decrement' onClick={this.handleClick}>
            <i className="fa fa-arrow-down"/>
          </button>
          <button id='session-increment' onClick={this.handleClick}>
          <i className="fa fa-arrow-up"/>
          </button>
        </div>
        
        <div id='timer'>
            <p id="timer-label">{this.state.timerType}</p>
            <p id='time-left'>{Math.floor(this.state.timeRemaining / 60).toString().padStart(2,'0')}:{(this.state.timeRemaining % 60).toString().padStart(2,'0')}</p>
            <button id='start_stop' onClick={this.handleClick}>
          {this.state.running ? <i className="fas fa-pause"/> : <i className="fas fa-play"/>}
          </button>
            <button id='reset' onClick={this.handleClick}>
          <i className="fas fa-redo"/></button>
            <audio id='beep' src='https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'></audio>
        </div>
      </div>
    );
  }
}

export default App;