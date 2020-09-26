import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MainNav from './MainNav';
//import Create from './Create';
import Pay from './Pay';
import Validate from './Validate';
import Issue from './issue';
import querycheck from './querycheck';
import Reissue from './reissue';
import Reissuereq from './reissuereq';



class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
  }

  selectPageHandler = (value) => {
    this.setState({
      ...this.state,
      page: value.value
    })
  }

  render() {
    
    return (
          <Paper classes={{root: "Page-container"}}>
            <MainNav selectPage={this.selectPageHandler}/>
              {this.state.page === 0 ? <Validate switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected}/> : null}
              {this.state.page === 1 ? <Pay switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected}/> : null}
              {this.state.page === 2 ? <Issue switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected}/> : null}
              {this.state.page === 3 ? <Reissue switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected}/> : null}
              {this.state.page === 4 ? <Reissuereq switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected}/> : null}
          </ Paper>
    );
  }
}

export default Main;