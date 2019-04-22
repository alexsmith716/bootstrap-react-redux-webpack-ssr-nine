import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

import { BrowserRouter as Router } from 'react-router-dom';

import { renderRoutes } from 'react-router-config';
import { trigger } from 'redial';

import { ReduxAsyncConnect } from './components';

import asyncMatchRoutes from './utils/asyncMatchRoutes';

import { AppContainer as HotEnabler } from 'react-hot-loader';

import routes from './routes';

import {createBrowserHistory} from 'history';

import configureStore from './redux/configureStore';

import './js/app';

// =====================================================================

const dest = document.getElementById('content');
// const dest = document.querySelector('#content');
// const dest = document.querySelector('.react-container');

// =====================================================================

// const registration = await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });

(async () => {

  // ###########################################################################
  // ######## ----------- CREATE BROWSER HISTORY OBJECT ----------------- ######
  // ###########################################################################

  console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > window.__PRELOADED__ ??: ', window.__PRELOADED__)
  const preloadedState = window.__data;

  const history = createBrowserHistory();

  const store = configureStore({history, preloadedState});

  //console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > history: ', history);

  const hydrate = async _routes => {
  
    // const { components, match, params } = await asyncMatchRoutes(_routes, history.location.pathname);
  
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > hydrate > __CLIENT__ ?: ', __CLIENT__);
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > hydrate > __SERVER__ ?: ', __SERVER__);
  
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > hydrate > asyncMatchRoutes > components: ', components);
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > hydrate > asyncMatchRoutes > match: ', match);
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > hydrate > asyncMatchRoutes > params: ', params);
  
    // preserve SSR markup and attach needed event handlers
    // ensure all data for routes is prefetched on client before rendering
    // attach any needed event handlers to the existing server rendered markup
    // 'trigger' all '@provideHooks' decorated components
    // The `@provideHooks` decorator allows you to define hooks for your custom lifecycle events,
    // from matched routes, get all data from routes's components ('isAuthLoaded', 'isInfoLoaded'. etc.)
    // 'trigger' function ('server' && 'client') will initiate 'fetch' event for components with '@provideHooks' decorator
    // for initial load, components App && Home. only App - '@@redial-hooks': {fetch: [Function: fetch]}
  
    // Define locals to be provided to all lifecycle hooks (@provideHooks)
    // const triggerLocals = {
    //   match,
    //   params,
    //   history,
    //   location: history.location
    // };
  
    // Wait for async data fetching to complete, then continue to render
    // Don't fetch data for initial route, server has already done the work:
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > window.__PRELOADED__ ??: ', window.__PRELOADED__)
    // if (window.__PRELOADED__) {
    //   // Delete initial data so that subsequent data fetches can occur:
    //   delete window.__PRELOADED__;
    // } else {
    //   // Fetch mandatory data dependencies for 2nd route change onwards:
    //   await trigger('fetch', components, triggerLocals);
    // }
  
    // await trigger('fetch', components, triggerLocals);
    // Fetch deferred, client-only data dependencies:
    // await trigger('defer', components, triggerLocals);
  
    // server-rendered markup ('ReactDOMServer.renderToString()') sent here
    // 'ReactDOM.hydrate()' preserves server-sent server-rendered markup
    // (allows for a very performant first-load experience)
  
    // if (window.__PRELOADED__) {
    //   // Delete initial data so that subsequent data fetches can occur:
    //   delete window.__PRELOADED__;
    // } else {
    //   // Fetch mandatory data dependencies for 2nd route change onwards:
    //   await trigger('fetch', components, triggerLocals);
    // }
    // await trigger('defer', components, triggerLocals);

    ReactDOM.hydrate(
      <HotEnabler>
        <Provider store={store} >
          <ConnectedRouter history={history}>
            <ReduxAsyncConnect routes={_routes}>
              {renderRoutes(_routes)}
            </ReduxAsyncConnect>
          </ConnectedRouter>
        </Provider>
      </HotEnabler>,
      dest
    )
  };

  await hydrate(routes);

  // ==============================================================================================

  if (module.hot) {
    console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > MODULE.HOT! <<<<<<<<<<<<<<<<<');
    module.hot.accept('./routes', () => {
      // const nextRoutes = require('./routes').default;
      const nextRoutes = require('./routes');
      console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > MODULE.HOT! > nextRoutes: ', nextRoutes);
      hydrate(nextRoutes.__esModule ? nextRoutes.default : nextRoutes).catch(err => {
      // hydrate(nextRoutes).catch(err => {
        console.error('>>>>>>>>>>>>>>>>>>> Error on routes reload:', err);
      });
    });
  } else {
    console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > NO MODULE.HOT! <<<<<<<<<<<<<<');
  }

  // ==============================================================================================

  if (process.env.NODE_ENV !== 'production') {
    window.React = React;
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > Server-side rendering check <<<<<<<<<<<<<<<<<<<<<< dest1: ', dest);
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > Server-side rendering check <<<<<<<<<<<<<<<<<<<<<< dest2: ', dest.firstChild);
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > Server-side rendering check <<<<<<<<<<<<<<<<<<<<<< dest3: ', dest.firstChild.attributes);
    // console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > Server-side rendering check <<<<<<<<<<<<<<<<<<<<<< dest4: ', dest.firstChild.attributes['data-reactroot']);

    if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-reactroot']) {
      // console.error('Server-side React render was discarded.' + 'Make sure that your initial render does not contain any client-side code.');
    }
  }

  // ==============================================================================================

  if (__DEVTOOLS__ && !window.devToolsExtension) {
    console.log('>>>>>>>>>>>>>>>>>>> CLIENT.JS > __DEVTOOLS__ <<<<<<<<<<<<<<<<<<<<<<');
    const devToolsDest = document.createElement('div');
    window.document.body.insertBefore(devToolsDest, null);
    const DevTools = require('./containers/DevTools/DevTools').default;

    ReactDOM.hydrate(
      <Provider store={store}>
        <DevTools />
      </Provider>,
      devToolsDest
    );
  }

  if (!__DEVELOPMENT__) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > !__DEVELOPMENT__ NO <<<<<<<<<<<<<');
  } else {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > !__DEVELOPMENT__ YES <<<<<<<<<<<<<');
  }
  if ('serviceWorker' in navigator) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > serviceWorker in navigator YES <<<<<<<<<<<<<');
  } else {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > serviceWorker in navigator NO <<<<<<<<<<<<<');
  }

  if (!__DEVELOPMENT__ && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/dist/service-worker.js', { scope: '/dist/' });
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > !__DEVELOPMENT__ && serviceWorker in navigator YES!! <<<<<<<<<<<<<');
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                console.log('New or updated content is available.');
              } else {
                console.log('Content is now available offline!');
              }
              break;
            case 'redundant':
              console.error('The installing service worker became redundant.');
              break;
            default:
          }
        };
      };
    } catch (error) {
      console.log('Error registering service worker: ', error);
    }
    await navigator.serviceWorker.ready;
    console.log('Service Worker Ready');
  } else {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT.JS > !__DEVELOPMENT__ && serviceWorker in navigator NO!! <<<<<<<<<<<<<');
  }

})();
