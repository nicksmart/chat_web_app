import React, { Component } from 'react';
// import logo from '../assets/img/logo.svg';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: []
    }

    this.updateMessage = this.updateMessage.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateMessage(e) {
    // console.log("message: ", e.target.value);
    this.setState({
      message: e.target.value
    });
  }

  addZeroToTime(time) {
    if (time < 10) {
      time = "0" + time;
    }

    return time;
  }

  submit(e) {
    if (this.state.message.length > 0) {
      console.log("message: ", this.state.message);
      const currentDate = new Date();
      let currentHour = currentDate.getHours();
      currentHour = this.addZeroToTime(currentHour);
      let currentMin = currentDate.getMinutes();
      currentMin = this.addZeroToTime(currentMin);
      let currentSec = currentDate.getSeconds();
      currentSec = this.addZeroToTime(currentSec);

      const nextMessage = {
        id: this.state.messages.length,
        timestamp: (currentDate.toDateString() + " " + currentHour + ":" + currentMin + ":" + currentSec),
        text: this.state.message
      }

      this.setState({
        messages: this.state.messages.concat([nextMessage]),
        message: ""
      })

      // console.log(this.state.messages);
      document.getElementById("message-input").value = "";
    }
    else {
      console.log("no new message entered");
    }
  }

  render() {
    const messageList = this.state.messages.map((m, i) => {
      return(
        <li key={m.id}>{`( ${m.timestamp} ) "${m.text}"`}</li>
      )
    });

    return (
      <div className="App">
        <div className="App-messagelist">
          <ul>
            {messageList}
          </ul>
        </div>

        <div className="App-submit">
          <input onChange={this.updateMessage} className="App-inputfield" id="message-input" type="text" placeholder="Enter message here" />
          <br />
          <button onClick={this.submit} type="submit" className="App-submit-button">Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
