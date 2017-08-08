import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase';

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

  componentDidMount() {
    console.log("componentDidMount called");

    firebase.database().ref('messages/').on('value', (snapshot) => {
      const currentMessages = snapshot.val();
      if (currentMessages != null) {
        this.setState({
          messages: currentMessages
        });
      }
    })
  }

  updateMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  getDateAndTime(dateObj) {
    dateObj.currentHour = dateObj.currentDate.getHours();
    dateObj.currentHour = this.addZeroToTime(dateObj.currentHour);
    dateObj.currentMin = dateObj.currentDate.getMinutes();
    dateObj.currentMin = this.addZeroToTime(dateObj.currentMin);
    dateObj.currentSec = dateObj.currentDate.getSeconds();
    dateObj.currentSec = this.addZeroToTime(dateObj.currentSec);
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
      let dateObj = {
        currentDate: new Date(),
        currentHour: "",
        currentMin: "",
        currentSec: ""
      }

      this.getDateAndTime(dateObj);

      const nextMessage = {
        id: this.state.messages.length,
        timestamp: (dateObj.currentDate.toDateString() + " " + dateObj.currentHour + ":" + dateObj.currentMin + ":" + dateObj.currentSec),
        text: this.state.message
      }

      firebase.database().ref('messages/' + nextMessage.id).set(nextMessage);

      // This gets rid of the text in the input field after clicking submit
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
