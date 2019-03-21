import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Loading from '../Loading/Loading';
import SearchBar from './components/SearchBar';
import Tables from './components/Tables';

import Dropdown from '../Dropdown/Dropdown';


class FilterableTable extends Component {

  // constructor is passed object containing all props written on the component’s jsx tag
  constructor(props) {

    // give the parent of the component ability to handle the props
    super(props);

    // object is created and appended as attribute of the component itself and named 'state'

    this.state = {
      filterText: '',
      inStockOnly: false,
      isLoading: true,
      error: null,
      externalData: null,
      dropDownOptionSelected: ''
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  static propTypes = {
    optionsArray: PropTypes.array.isRequired,
    description: PropTypes.string,
    // requestURL: PropTypes.string.isRequired
  };

  // static defaultProps = {};

  handleFilterTextChange(filterText) {
    this.setState({ filterText: filterText });
  }

  handleInStockChange(inStockOnly) {
    this.setState({ inStockOnly: inStockOnly })
  }

  handleDropdownChange = (dropDownOptionSelected) => {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > handleDropdownChange > dropDownOptionSelected: ', dropDownOptionSelected);
    this.setState( { dropDownOptionSelected } );
  }

  // ================================================================================================

  setTimeoutCallback = (d) => this.setState({ externalData: d, isLoading: false });

  requestDataPromise(requestURL) {
    this._asyncRequest = axios.get(requestURL)
      // map the req endpoints to props
      // .then(response => {
      //   response.data.categories.map(category => ({
      //     category: `${category.category}`,
      //     stocked: `${category.login.username}`,
      //     name: `${category.email}`,
      //     price: `${category.price}`,
      //   }))
      // })
      .then(response => {
        console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > SUCCESS2: ', response.data);
          this._asyncRequest = null;
          // this.setState({ externalData: response.data, isLoading: false });
          this.clearTimeoutCallbackID = setTimeout( () => this.setTimeoutCallback(response.data), 5000 );
      })
      .catch(error => {
        if (error.externalData) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.response.data: ', error.response.data);
          console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.response.status: ', error.response.status);
          console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.response.headers: ', error.response.headers);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.message: ', error.message);
        }
        console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > ERROR.config: ', error.config);
        this.setState({ error, isLoading: false });
      });
  }

  async requestDataAsyncAwait(requestURL) {
    try {
      const response = await axios.get(requestURL);
      // this.setState({ externalData: response.data, isLoading: false });
      this.clearTimeoutCallbackID = setTimeout( () => this.setTimeoutCallback(response.data), 5000 );
      console.log('>>>>>>>>>>>>>>>> AxiosComponentLoaderBasic > requestDataAsyncAwait() > json > SUCCESS: ', response.data);
    } catch (error) {
      console.log('>>>>>>>>>>>>>>>> AxiosComponentLoaderBasic > requestDataAsyncAwait() > json > ERROR: ', error);
      this.setState({ error, isLoading: false });
    }
  }

  // ================================================================================================

  static getDerivedStateFromProps(props, state) {
    if (props.requestURL !== state.prevId) {
      return {
        externalData: null,
        prevId: props.requestURL,
      };
    }

    return null;
  }

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() <<<<<<<<<<<<<<: ', this.props.description);
    // this.requestDataPromise(this.props.requestURL);
    // this.requestDataAsyncAwait(this.props.requestURL);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() <<<<<<<<<<<<<<: ', this.props.description);
    const { dropDownOptionSelected } = this.state;
    if (this.state.externalData === null) {
      this.requestDataPromise(this.state.dropDownOptionSelected);
    }
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  render() {

    const styles = require('./scss/FilterableTable.scss');
    const { isLoading, dropDownOptionSelected, externalData } = this.state;
    const { optionsArray, description } = this.props;
    const loadingText = 'Fetching Requested Data ...';

    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > STATE > isLoading: ', isLoading);
    // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > STATE > externalData: ', externalData);

    // const dropDownOptionSelected = this.state.dropDownOptionSelected;
    // if (dropDownOptionSelected !== '') {
    //   // filterableTable = <FilterableTable requestURL={ dropDownOptionSelected } />;
    // }

    // const dd = <Dropdown title={description} optionsArray={optionsArray} dropDownOptionSelected={dropDownOptionSelected} onDropdownChange={this.handleDropdownChange} />

    // ------------------------------------------------------------------------------------

    return (

      <div>

        <div className={`container-padding-border-radius-2`}>
          <div className="container-flex bg-color-ivory container-padding-border-radius-1">
            <div className="width-400">

              <Dropdown
                title={description}
                optionsArray={optionsArray}
                dropDownOptionSelected={dropDownOptionSelected}
                onDropdownChange={this.handleDropdownChange}
              />

            </div>
          </div>
        </div>

        <br/>

        {dropDownOptionSelected !== '' &&
          this.state.externalData === null && (
            <div className={`container-padding-border-radius-2`}>

              <div className="container-padding-border-radius-1">

                <div>Loading...</div>

              </div>

            </div>
          )}

        {this.state.externalData !== null &&
          <div className={`container-padding-border-radius-2`}>

            <div className="container-flex bg-color-ivory container-padding-border-radius-1">
              <div className="width-400">

                <div>>SearchBar...</div>

              </div>
            </div>

            <br />

            <div>>Tables...</div>
          </div>
        }

      </div>
    );
  }
}

export default FilterableTable;
