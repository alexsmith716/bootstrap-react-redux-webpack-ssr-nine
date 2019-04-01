import React, { Component } from 'react';


class Conter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    //
  }

  render() {

    // const styles = require('./scss/Conter.scss');

    return (

      <div>

        {this.state.date.toLocaleTimeString()}

      </div>
    );
  }
}

export default Conter;