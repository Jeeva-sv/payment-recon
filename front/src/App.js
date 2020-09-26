import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Login from '../src/Containers/Login';
import Landing from '../src/Containers/Landing';
import Signup from '../src/Containers/SignUp';
import socketIOClient from 'socket.io-client'

class App extends Component {

  constructor() {
    super()  
    this.state = {
      showFeed: false,
      connected: false,
      socket : socketIOClient("http://localhost:4001"),
      blocks : [],
    }  

    this.switchFeedHandler = this.switchFeedHandler.bind(this);
  }

  switchFeedHandler(val) {
    this.setState({
      ...this.state,
      showFeed : (val === 0)
    })
  }

  componentDidMount() {
    this.state.socket.on('connect', () => {
      this.setState({
        ...this.state,
        connected: true
      })
      console.log(`Connected to server with id ${this.state.socket.id}`)
    })

    this.state.socket.on('disconnect', () => {
      this.setState({
        ...this.state,
        connected: false
      })
      console.log('disconnected from server')
    })

    this.state.socket.on( 'BLOCKUDPATE', (newBlock) => {
      for (let i=0 ; i<this.state.blocks.length ; i++) {
        if (this.state.blocks[i].number === newBlock.number){
          //block already in blocks array
          return
        }
      }
      this.setState({
        ...this.state,
        blocks: [newBlock ,...this.state.blocks].sort((a,b) =>  parseInt(a.number,10) < parseInt(b.number,10))
      })
      console.log(`New block ${newBlock.number} added`);
    })
    
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div>
          {/*<div className="header">
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/landing">Home</NavLink><small>(Access with token only)</small>
          </div>*/}
          <div className="content">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/landing" component={Landing} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;