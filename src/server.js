import fs from 'fs';
import config from '../config/config';
import path from 'path';
import httpProxy from 'http-proxy';

// ------------------------------------------------------------------------+
import Cookies from 'cookies';
import { getStoredState } from 'redux-persist'; // https://github.com/rt2zz/redux-persist
import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage'; // https://github.com/abersager/redux-persist-cookie-storage
// ------------------------------------------------------------------------+

import React from 'react';
import { Provider } from 'react-redux';

// ----------------------------------
import asyncMatchRoutes from './utils/asyncMatchRoutes';
// ----------------------------------

// ----------------------------------
import { StaticRouter } from 'react-router';
// ----------------------------------

// ----------------------------------
import { ReduxAsyncConnect } from './components';
// ----------------------------------

// ----------------------------------
import { renderRoutes } from 'react-router-config';
// ----------------------------------

// ----------------------------------
import ReactDOM from 'react-dom/server';
import {renderToString} from 'react-dom/server';
// ----------------------------------

// ----------------------------------
// import configureStore from './redux/configureStore';
import configureStore from './redux/store/configureStore';

// import initialState from './redux/reducers/initialState';
import initialState from './redux/reducers/initial-state';
// ----------------------------------

// Device Detection Utils
import { isDesktop, isMobile, isBot } from './utils/device';
// ----------------------------------

import {createMemoryHistory} from 'history';

import routes from './routes';

import { trigger } from 'redial';

// holds a global cache of all the universal components that are rendered and makes them available via flushChunkNames
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { flushFiles } from 'webpack-flush-chunks';

import Html from './helpers/Html';

// ----------------------------------

// import apiClient from './utils/apiClient';
// import { createApp } from './app';

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;

const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  // ws: true
});

const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min)) + min
)

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// HOF is a function which returns a function
// ---------------------------------------------------------------
// const render = require('../build/server/server.js').default;
// app.use(render({ clientStats }));
// ---------------------------------------------------------------
// app.use(function render({ clientStats }) {
//   return function async (req, res) {
//     return ...;
//   }
// })

export default ({ clientStats }) => async (req, res) => {

  console.log('>>>>>>>>>>>>>>>>> SERVER > __CLIENT__ ?: ', __CLIENT__);
  console.log('>>>>>>>>>>>>>>>>> SERVER > __SERVER__ ?: ', __SERVER__);

  req.randomInteger = getRandomInt(1, 100);
  req.isMobile = isMobile(req.headers['user-agent']);
  req.isBot = isBot(req.headers['user-agent']);
  req.isDesktop = isDesktop(req.headers['user-agent']);

  console.log('>>>>>>>>>>>>>>>>> SERVER > req.randomInteger ?: ', req.randomInteger);
  console.log('>>>>>>>>>>>>>>>>> SERVER > req.isMobile ?: ', req.isMobile);
  console.log('>>>>>>>>>>>>>>>>> SERVER > req.isBot ?: ', req.isBot);
  console.log('>>>>>>>>>>>>>>>>> SERVER > req.isDesktop ?: ', req.isDesktop);

  // progressive app manifest
  // https://www.w3.org/TR/appmanifest/
  if (req.url == '/manifest.json') {
    console.log('>>>>>>>>>>>>>>>>> SERVER > manifest.json <<<<<<<<<<<<<<<<<<<<<<<');
    return res.sendFile(path.join(__dirname, '..', 'build', 'static', 'manifest.json'));
  }

  // if (req.url == '/dist/service-worker.js') {
  //   console.log('>>>>>>>>>>>>>>>>> SERVER > service-worker <<<<<<<<<<<<<<<<<<<<<<<');
  //   res.setHeader('Service-Worker-Allowed', '/');
  //   res.setHeader('Cache-Control', 'no-store');
  //   return;
  // }

  if (req.url == '/dlls/:dllName.js') {
    console.log('>>>>>>>>>>>>>>>>> SERVER > /dlls/:dllName.js <<<<<<<<<<<<<<<<<<<<<<<');
    return fs.access(
      path.join(__dirname, '..', 'build', 'static', 'dist', 'dlls', `${req.params.dllName}.js`),
      fs.constants.R_OK,
      err => (err ? res.send(`console.log('No dll file found (${req.originalUrl})')`) : null)
    );
  };

  res.setHeader('X-Forwarded-For', req.ip);

  console.log('>>>>>>>>>>>>>>>>> SERVER > REQUEST IN >>> <<<<<<<<<<<<<<<<<<<<<<<');
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.ip +++++++++++++: ', req.ip);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.method +++++++++++++++: ', req.method);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.url ++++++++++++++++++: ', req.url);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.path ++++++++++++++++++: ', req.path);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.headers ++++++++++++++: ', req.headers);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.cookies ++++++++++++++: ', req.cookies);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.session ++++++++: ', req.session);
  // console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.params +++++++++: ', req.params);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQ.originalUrl ++++: ', req.originalUrl);
  console.log('>>>>>>>>>>>>>>>>> SERVER > REQUEST IN <<< <<<<<<<<<<<<<<<<<<<<<<<');

  // ----------------------------------

  // https://reactjs.org/docs/higher-order-components.html
  // @feathersjs:
  // HOC doesn’t modify the input component, nor does it use inheritance to copy its behavior
  // HOC composes the original component by wrapping it in a container component
  if (req.url == '/api') {
    console.log('>>>>>>>>>>>>>>>>> SERVER > /API <<<<<<<<<<<<<<<<<<<<<<<');
    proxy.web(req, res, { target: targetUrl });
  }

  if (req.url == '/ws') {
    console.log('>>>>>>>>>>>>>>>>> SERVER > /WS <<<<<<<<<<<<<<<<<<<<<<<');
    proxy.web(req, res, { target: `${targetUrl}/ws` });
  }

  proxy.on('error', (error, req, res) => {
    if (error.code !== 'ECONNRESET') {
      console.error('proxy error', error);
    }
    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json' });
    }
    const json = {
      error: 'proxy_error',
      reason: error.message
    };
    res.end(JSON.stringify(json));
  });

  // ----------------------------------

  console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > SetUpComponent !! START !! <<<<<<<<<<<<<<<<<<<<<<<');

  // 'initialEntries': The initial URLs in the history stack
  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });

  console.log('>>>>>>>>>>>>>>>>>>> SERVER.JS > APP LOADER > history: ', history)

  // ------------------------------------------------------------------------+
  // const cookieJar = new NodeCookiesWrapper(new Cookies(req, res)); // node module for getting and setting HTTP cookies

  // type PersistConfig:
  // {
  //   key: string, // the key for the persist
  //   storage: Object, // the storage adapter, following the AsyncStorage api
  //   version?: number, // the state version as an integer (defaults to -1)
  //   blacklist?: Array<string>, // do not persist these keys
  //   whitelist?: Array<string>, // only persist these keys
  //   migrate?: (Object, number) => Promise<Object>,
  //   transforms?: Array<Transform>,
  //   throttle?: number, // ms to throttle state writes
  //   keyPrefix?: string, // will be prefixed to the storage key
  //   debug?: boolean, // true -> verbose logs
  //   stateReconciler?: false | StateReconciler, // false -> do not automatically reconcile state
  //   serialize?: boolean, // false -> do not call JSON.parse & stringify when setting & getting from storage
  //   writeFailHandler?: Function, // will be called if the storage engine fails during setItem()
  // }

  // const persistConfig = {
  //   key: 'root',
  //   storage: new CookieStorage(cookieJar),
  //   stateReconciler: (inboundState, originalState) => originalState,
  //   whitelist: ['auth', 'info',]
  // };

  // let preloadedState;

  // try {
  //   // Returns a promise of restored state (getStoredState())
  //   preloadedState = await getStoredState(persistConfig);
  // } catch (e) {
  //   preloadedState = {};
  // }
  // ------------------------------------------------------------------------+

  // To send the data down to the client (SSR):
  //   create a fresh, new Redux store instance on every request;
  //   optionally dispatch some actions;
  //   pull the state out of store;
  //   and then pass the state along to the client.

  console.log('>>>>>>>>>>>>>>>> SERVER > initialState(req): ', initialState(req));

  const preloadedState = initialState(req);

  const store = configureStore({preloadedState});

  console.log('>>>>>>>>>>>>>>>> SERVER > store: ', store);

  try {

    // const { components, match, params } = await asyncMatchRoutes(routes, req.path);

    // console.log('>>>>>>>>>>>>>>>> SERVER > await asyncMatchRoutes > components: ', components);
    // console.log('>>>>>>>>>>>>>>>> SERVER > await asyncMatchRoutes > match: ', match);
    // console.log('>>>>>>>>>>>>>>>> SERVER > await asyncMatchRoutes > params: ', params);

    // const locals = {
    //   match,
    //   params,
    //   history,
    //   location: history.location
    // };

    // await trigger( 'fetch', components, locals);

    const context = {};

    const component = (
      <Provider store={store} >
        <StaticRouter location={req.originalUrl} context={context}>
          <ReduxAsyncConnect routes={routes} >
            {renderRoutes(routes)}
          </ReduxAsyncConnect>
        </StaticRouter>
      </Provider>
    );

    const content = renderToString(component);

    // ------------------------------------------------------------------------------------------------------

    const assets = flushChunks(clientStats, { chunkNames: flushChunkNames() });

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > JS: ', assets.Js);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > STYLES: ', assets.Styles);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > CSS: ', assets.Css);

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > .js: ', assets.js);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > styles: ', assets.styles);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > .css: ', assets.css);

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > scripts: ', assets.scripts);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > stylesheets: ', assets.stylesheets);

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > cssHashRaw: ', assets.cssHashRaw);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > cssHash: ', assets.cssHash);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > CssHash: ', assets.CssHash);

    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > publicPath: ', assets.publicPath);
    console.log('>>>>>>>>>>>>>>>>> SERVER > flushChunks > outputPath: ', assets.outputPath);

    // ===============================================================================
    // ===============================================================================

    // leaving '__DISABLE_SSR__' hydration here for requirement of 'https://github.com/faceyspacey/webpack-flush-chunks':
    // It offers 2 functions flushChunks and flushFiles, which you call immediately after ReactDOMServer.renderToString. 
    // They are used in server-rendering to extract the minimal amount of chunks to send to the client, 
    // thereby solving a missing piece for code-splitting: server-side rendering.

    console.log('>>>>>>>>>>>>>>>>> SERVER > __DISABLE_SSR__:', __DISABLE_SSR__);

    function hydrate() {
      res.write('<!doctype html>');
      ReactDOM.renderToNodeStream(<Html assets={assets} />).pipe(res);
    }

    if (__DISABLE_SSR__) {
      return hydrate();
    }

    // ===============================================================================
    // ===============================================================================

    // console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > context: ', context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    // ------------------------------------------------------------------------------------------------------

    // console.log('>>>>>>>>>>>>>>>> SERVER > SSR ==================== content: ', content);
    console.log('>>>>>>>>>>>>>>>> SERVER > SSR ==================== STORE!!: ', store);

    const html = <Html assets={assets} store={store} content={content} />;
    const ssrHtml = `<!doctype html>${renderToString(html)}`;
    // console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > RESPOND TO CLIENT !! > renderToString(html):', ssrHtml);

    res.status(200).send(ssrHtml);
    // res.status(200).send('SERVER > Response Ended For Testing!!!!!!! Status 200!!!!!!!!!');

  } catch (error) {
    console.log('>>>>>>>>>>>>>>>> SERVER > APP LOADER > TRY > ERROR > error: ', error);
    res.status(500);
    hydrate();
  }
};
