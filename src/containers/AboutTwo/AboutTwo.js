import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Counter from '../../components/widgets/Counter/Counter';
// import Planets from '../../components/d3/Planets/Planets';
import LineChartA from '../../components/d3/LineChart/LineChartA';

// --------------------------------------------------------------------------

class AboutTwo extends Component {

  // constructor(props) {
  //   super(props);

  //   this. = this..bind(this);

  //   this.state = {};
  // }

  // static propTypes = {};

  // static defaultProps = {};

  testSetTimeout(m) {
    console.log('>>>>>>>>>>>>>>>> AboutTwo > componentDidMount() > async testSetTimeout: ', m);
  }

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> AboutTwo > componentDidMount() <<<<<<<<<<<<<<');
    // setTimeout( () => this.testSetTimeout('setTimeout Message from AboutTwo...'), 4000 );
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> AboutTwo > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  // static contextTypes = {
  //   store: PropTypes.objectOf(PropTypes.any).isRequired
  // };

  render() {

    const aboutImageMain = require('../../theme/images/about-750-450.png');
    const aboutImageOurCustomers = require('../../theme/images/about-500-300.png');
    const styles = require('./scss/AboutTwo.scss');

    const data = [];

    for (let i = 0; i < 10; i += 1){
      const random = Math.floor(Math.random() * 100);
      data.push(random);
    }

    console.log('>>>>>>>>>>>>>>>> AboutTwo > render() > data[]: ', data);

    return (

      <div className="container">

        <Helmet title="About Two" />

        <h1 className={styles.uniqueColor}>About Two</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  D3!
                </h5>

                <div className="cardBodyContainer">

                  <div className="cardBodyContent">

                    <LineChartA />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">

          <div className="col-lg-12 mb-4">

            <div className="card h-100">

              <h2 className="card-header text-center">
                Thinking in React!
              </h2>

              <div className="card-body">

                <h5 className="card-title text-center">
                  Most Basic Counter
                </h5>

                <div className="cardBodyContainer">

                  <div className="cardBodyContent">

                    <Counter />

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* (>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className="row">
          <div className="col-lg-6">
            <img className="img-fluid rounded mb-4" src={aboutImageMain} alt="" />
          </div>
          <div className="col-lg-6">
            <h2>About Too Modern Business</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus reprehenderit voluptatem perferendis dicta dolorem non blanditiis ex fugiat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, magni, aperiam vitae illum voluptatum aut sequi impedit non velit ab ea pariatur sint quidem corporis eveniet. Odit, temporibus reprehenderit dolorum!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam? Aut, in eum facere corrupti necessitatibus perspiciatis quis?</p>
          </div>
        </div>

        <h2>Our Team</h2>

        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card h-100 text-center">
              <img className="card-img-top" src={aboutImageMain} alt="" />
              <div className="card-body">
                <h4 className="card-title">Team Member</h4>
                <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit.</p>
              </div>
              <div className="card-footer">
                <a href="#">name@example.com</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card h-100 text-center">
              <img className="card-img-top" src={aboutImageMain} alt="" />
              <div className="card-body">
                <h4 className="card-title">Team Member</h4>
                <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit.</p>
              </div>
              <div className="card-footer">
                <a href="#">name@example.com</a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card h-100 text-center">
              <img className="card-img-top" src={aboutImageMain} alt="" />
              <div className="card-body">
                <h4 className="card-title">Team Member</h4>
                <h6 className="card-subtitle mb-2 text-muted">Position</h6>
                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus aut mollitia eum ipsum fugiat odio officiis odit.</p>
              </div>
              <div className="card-footer">
                <a href="#">name@example.com</a>
              </div>
            </div>
          </div>
        </div>

        <h2>Our Customers</h2>
        <div className="row">
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
          <div className="col-lg-2 col-sm-4 mb-4">
            <img className="img-fluid" src={aboutImageOurCustomers} alt="" />
          </div>
        </div>

      </div>
    );
  }
}

export default AboutTwo;
