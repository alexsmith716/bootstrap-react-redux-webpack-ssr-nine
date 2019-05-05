import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading';
import SearchBar from './components/SearchBar';
import Tables from './components/Tables';
import DropdownSelect from '../DropdownSelect/DropdownSelect';


class FilterableTable extends Component {

  // constructor is passed object containing all props written on component jsx tag
  // initializing state and binding methods
  // allow the parent class's constructor to be called in instance class
  // initialize the context
  constructor(props) {

    // give the parent of the component ability to handle the props
    // instance access 'this.props'
    super(props);

    // object is created and appended as attribute of the component itself and named 'state'

    // initialize local state (assign an object to 'this.state')
    this.state = {
      filterText: '',
      inStockOnly: false,
      error: false,
      isLoading: true,
      externalData: null,
      dropDownOptionSelected: ''
    };

    // bind event handler method to an instance
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  static propTypes = {
    optionsArray: PropTypes.array.isRequired,
    description: PropTypes.string
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

  setTimeoutCallback = (d) => this.setState({ error: null, isLoading: null, externalData: d });
  // test error -----------------
  // setTimeoutCallback = (d) => this.setState({ error: true, isLoading: false, externalData: null });

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
        console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > JSON >>>>>> response: ', response);
        console.log('>>>>>>>>>>>>>>>> FilterableTable > requestDataPromise() > JSON > response.data: ', response.data);
        this._asyncRequest = null;
        // this.setState({ externalData: response.data, isLoading: false });
        setTimeout( () => this.setTimeoutCallback(response.data), 2000 );
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
  //     setTimeout( () => this.setTimeoutCallback(response.data), 5000 );
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
  static getDerivedStateFromProps(props, state) {
    console.log('############################ FilterableTable > static getDerivedStateFromProps() ###########################');
    // if (props.requestURL !== state.prevId) {
    //   return {
    //     externalData: null,
    //     prevId: props.requestURL,
    //   };
    // }
    return null;
  }

  // called after the first render
  componentDidMount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidMount() <<<<<<<<<<<<<<: ', this.props.description);
    // this.requestDataPromise(this.props.requestURL);
    // this.requestDataAsyncAwait(this.props.requestURL);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidUpdate() <<<<<<<<<<<<<<: ', this.props.description);
    const { error, isLoading, externalData, dropDownOptionSelected } = this.state;
    if (externalData === null && !error && isLoading) {
      this.requestDataPromise(`${dropDownOptionSelected}`);
    }
  }

  componentWillUnmount() {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentWillUnmount() <<<<<<<<<<<<<<');
  }

  // invoked before rendering when new props or state are being received
  // --------------------------------------------------------------------------------
  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>>>>>>>>>>>>>>> FilterableTable > shouldComponentUpdate() > nextProps: ', nextProps);
    return nextProps;
  };

  // invoked right before calling the render method, both on the initial mount and on subsequent updates
  // --------------------------------------------------------------------------------
  // static getDerivedStateFromProps(props, state) {
  //   console.log('>>>>>>>>>>>>>>>> FilterableTable > getDerivedStateFromProps() <<<<<<<<<<<<<<<<<<<<<<');
  // };

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logComponentStackToMyService(info.componentStack);
    console.log('>>>>>>>>>>>>>>>> FilterableTable > componentDidCatch() > info.componentStack: ', info.componentStack);
  }

  render() {

    const styles = require('./scss/FilterableTable.scss');
    const { error, isLoading, dropDownOptionSelected, externalData } = this.state;
    const { optionsArray, description } = this.props;
    const loadingText = 'Fetching Requested Data ...';
    const errorText = 'Error Fetching Requested Data !';
    let items = null;
    // <div key={index}>{`id: '${item.id}' type: '${item.type}'`}</div>

    let arrayLike = externalData && externalData.length > 0
      ? arrayLike = true
      : arrayLike = null;

    console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > externalData > ARRAYLIKE ??? ', arrayLike, '!');

    if (externalData && (dropDownOptionSelected.indexOf('https') === 0 || dropDownOptionSelected.indexOf('http') === 0)) {

      console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > externalData.length: ', externalData.length);

      // convert array-like object into array
      if (arrayLike) {

        // const listItems1 = Array.prototype.slice.call(externalData);
        // listItems1.map(item => { 
        //   console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > externalData > Array.prototype.slice.call(): ', item);
        // });

        // const listItems2 = Array.from(externalData);
        // listItems2.map(item => { 
        //   console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > externalData > Array.from(): ', item);
        // });

        // Array.from(externalData).forEach((item, index) => {
        //   console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Array.from()1: index: ', index, ' item: ', item);
        // });

        // items = Array.from(externalData).map((item, index) => {
        //   console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Array.from()2: index: ', index, ' item: ', item);
        //   return <div key={index}>{`${index}: ${item}`}</div>;
        // });

        items = Array.from(externalData).map((item, index) => {

          let fromItem = item;
          let fromIndex = index;
          let ok = Object.keys(fromItem).map((item, index) => {
            return <div key={index}>{`${fromIndex}: ${item}: "${fromItem[item]}"`}</div>
          })

          return (
            <div>
              {ok}

              {fromIndex !== externalData.length-1 && (
                <div key={index}>---------</div>
              )}
            </div>
          )
        });

      } else {

        items = Object.keys(externalData).map((item, index) => {
          // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.keys(): index: ', index, ' item: ', item,' externalData[item]: ', externalData[item]);
          return <div key={index}>{`${index}: ${item}: "${externalData[item]}"`}</div>;
        });

        // items = Object.keys(externalData).map((item, index) => (
        //   <div key={index}>{`${index}: ${item}: "${externalData[item]}"`}</div>
        // ));

      }

      // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > dropDownOptionSelected: ', dropDownOptionSelected);
      // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > items:::::::::::::::::: ', items);
      // console.log('>>>>>>>>>>>>>>>> FilterableTable > render() > Object.entries()::::::: ', Object.entries(externalData));
      // items = <div>{JSON.stringify(externalData)}</div>;
    }

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
          items !== null && (

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
          items === null && (

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
