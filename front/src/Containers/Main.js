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
    console.log(props)
    super(props)
    this.state = {
      page: 0,
      loginType: ''

    }
  }

  componentDidMount() {
    this.setState({
      loginType: JSON.parse(localStorage.getItem('USER_DTS')).loginType
    })
  }

  selectPageHandler = (value) => {
    this.setState({
      ...this.state,
      page: value.value
    })
  }

  render() {
    if (this.state.loginType === 'wayneHealth') {
      return (
        <Paper classes={{ root: "Page-container" }}>
          <MainNav selectPage={this.selectPageHandler} sectionsXml={this.props.sectionsXml} />
          {this.state.page === 0 ? <Issue switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
          {this.state.page === 1 ? <Reissue switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
        </ Paper>
      );
    } else if (this.state.loginType === 'bankOfGotham') {
      return (
        <Paper classes={{ root: "Page-container" }}>
          <MainNav selectPage={this.selectPageHandler} sectionsXml={this.props.sectionsXml} />
          {this.state.page === 0 ? <Pay switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
        </ Paper>
      );
    } else if (this.state.loginType === 'gothamGH') {
      return (
        <Paper classes={{ root: "Page-container" }}>
          <MainNav selectPage={this.selectPageHandler} sectionsXml={this.props.sectionsXml} />
          {this.state.page === 0 ? <Validate switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
          {this.state.page === 1 ? <Reissuereq switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
        </ Paper>
      );
    }
    return (
      <Paper classes={{ root: "Page-container" }}>
        <MainNav selectPage={this.selectPageHandler} sectionsXml={this.props.sectionsXml} />
        {this.state.page === 0 ? <Validate switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
        {this.state.page === 1 ? <Pay switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
        {this.state.page === 2 ? <Issue switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
        {this.state.page === 3 ? <Reissue switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
        {this.state.page === 4 ? <Reissuereq switchFeedHandler={this.props.switchFeedHandler} socket={this.props.socket} connected={this.props.connected} /> : null}
      </ Paper>
    );
  }
}

export default Main;