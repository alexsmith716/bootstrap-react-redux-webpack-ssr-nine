import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import NProgress from 'nprogress';
import Loading from '../Loading/Loading';
import SearchBar from './components/SearchBar';
import Tables from './components/Tables';
import DropdownSelect from '../Dropdown/DropdownSelect';


class FilterableTable extends Component {

  // constructor is passed object containing all props written on the component’s jsx tag
  constructor(props) {

    // give the parent of the component ability to handle the props
    super(props);

    // object is created and appended as attribute of the component itself and named 'state'

    this.state = {
      filterText: '',
      inStockOnly: false,
      error: false,
      isLoading: true,
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

  handleDropdownChange = (e) => {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > handleDropdownChange > e.target.value: ', e.target.value);
    let { externalData, dropDownOptionSelected } = this.state;

    if (e.target.value !== '') {
      this.setState({ error: false, isLoading: true, externalData: null, dropDownOptionSelected: e.target.value });
    }
  }

  // ================================================================================================

  // setTimeoutCallback = (d) => this.setState({ error: null, isLoading: null, externalData: d });
  // test error
  setTimeoutCallback = (d) => this.setState({ error: true, isLoading: false, externalData: null });

  requestDataPromise(r) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > dropDownOptionSelected!!: ', r);
    this._asyncRequest = axios.get(r)
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
        console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > json > SUCCESS!: ', response.data);
        this._asyncRequest = null;
        // this.setState({ externalData: response.data, isLoading: false });
        this.clearTimeoutCallbackID = setTimeout( () => this.setTimeoutCallback(response.data), 3000 );
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
        this.setState({ error: true, isLoading: false, externalData: null });
      });
  }

  // async requestDataAsyncAwait(r) {
  //   try {
  //     const response = await axios.get(r);
  //     this.clearTimeoutCallbackID = setTimeout( () => this.setTimeoutCallback(response.data), 5000 );
  //     console.log('>>>>>>>>>>>>>>>> AxiosComponentLoaderBasic > requestDataAsyncAwait() > json > SUCCESS: ', response.data);
  //   } catch (error) {
  //     console.log('>>>>>>>>>>>>>>>> AxiosComponentLoaderBasic > requestDataAsyncAwait() > json > ERROR: ', error);
  //     this.setState({ error: true, isLoading: false, externalData: null });
  //   }
  // }

  // ================================================================================================

  // getDerivedStateFromProps: 
  //   * lifecycle is invoked after a component is instantiated as well as before it is re-rendered
  //   * It can return an object to update state, or null to indicate that the new props do not require any state updates
  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > static getDerivedStateFromProps() <<<<<<<<<<<<<<');
  //   // if (props.requestURL !== state.prevId) {
  //   //   return {
  //   //     externalData: null,
  //   //     prevId: props.requestURL,
  //   //   };
  //   // }
  //   return null;
  // }

  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() <<<<<<<<<<<<<<: ', this.props.description);
    // this.requestDataPromise(this.props.requestURL);
    // this.requestDataAsyncAwait(this.props.requestURL);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() <<<<<<<<<<<<<<: ', this.props.description);
    const { dropDownOptionSelected } = this.state;
    if (this.state.externalData === null) {
      this.requestDataPromise(`${dropDownOptionSelected}`);
    }
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  render() {

    const styles = require('./scss/FilterableTable.scss');
    const { error, isLoading, dropDownOptionSelected, externalData } = this.state;
    const { optionsArray, description } = this.props;
    const loadingText = 'Fetching Requested Data ...';
    const errorText = 'Error Fetching Requested Data !';
    let items = [];
    // <div key={index}>{`id: '${item.id}' type: '${item.type}'`}</div>

    if (externalData && (dropDownOptionSelected.indexOf('https') === 0 || dropDownOptionSelected.indexOf('http') === 0)) {
      items = externalData.map((item, index) => (
        <div key={index}>{`${index}: ${item}`}</div>
      ));
      console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > ITEMS: ', items);
    }

    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > STATE > loadingText: ', loadingText);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > STATE > isLoading: ', isLoading);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > STATE > dropDownOptionSelected: ', dropDownOptionSelected);

    // ------------------------------------------------------------------------------------

    return (

      <div>

        {/* (>>>>>>>>>>>>>>>>>>>>>> DropdownSelect >>>>>>>>>>>>>>>>>>>>>>>>) */}

        <div className={`container-padding-border-radius-2`}>
          <div className="container-flex bg-color-ivory container-padding-border-radius-1">
            <div className="width-400">

              <DropdownSelect
                title={description}
                optionsArray={optionsArray}
                dropDownOptionSelected={dropDownOptionSelected}
                onChange={this.handleDropdownChange}
              />

            </div>
          </div>
        </div>

        <br/>

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {dropDownOptionSelected !== '' &&
          !error &&
          isLoading && (

            <div className={`container-padding-border-radius-2`}>
              <div className="container-padding-border-radius-1">

                <Loading text={ loadingText } />

              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {error &&
          !isLoading && (

            <div className={`container-padding-border-radius-2`}>
              <div className="container-padding-border-radius-1">

                <div className="alert alert-danger text-center" role="alert">{ errorText }</div>

              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> EXTERNAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {externalData !== null &&
          !isLoading &&
          dropDownOptionSelected !== '' &&
          items.length > 0 && (

            <div className={`container-padding-border-radius-2`}>
              <div className="container-padding-border-radius-1">

                {items}

              </div>
            </div>
          )}

        {/* (>>>>>>>>>>>>>>>>>>>>>> LOCAL DATA LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}

        {externalData !== null &&
          !isLoading &&
          dropDownOptionSelected !== '' &&
          items.length === 0 && (

            <div className={`container-padding-border-radius-2`}>
              <div className="container-flex bg-color-ivory container-padding-border-radius-1">
                <div className="width-400">

                  <SearchBar 
                    filterText={ this.state.filterText }
                    inStockOnly={ this.state.inStockOnly }
                    onFilterTextChange={ this.handleFilterTextChange }
                    onInStockChange={ this.handleInStockChange }
                  />

                </div>
              </div>

              <br />

              <div>

                <Tables 
                  tablesData={ externalData } 
                  filterText={ this.state.filterText }
                  inStockOnly={ this.state.inStockOnly }
                />

              </div>
            </div>
          )}

      </div>
    );
  }
}

export default FilterableTable;
