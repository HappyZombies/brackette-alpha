import React from "react";
import store from "store";
import io from "socket.io-client";
import { TOKEN } from "../../utils/constants";

//const socket = io.connect();
class Devices extends React.Component {
  state = {
    roomId: ""
  };
  // componentDidMount() {
  //   socket.on("welcome", function(data) {
  //     console.log("Incoming message!!!:", data);
  //   });
  //   socket.on("room failed", function(data) {
  //     console.log("Incoming message:", data);
  //   });
  // }
  // onClick = () => {
  //   socket.emit("enter room", this.state.roomId);
  // };
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Click me to join room</button>
        <input
          type="text"
          onChange={e => this.setState({ roomId: e.target.value })}
        />
      </div>
    );
  }
}

export default Devices;
