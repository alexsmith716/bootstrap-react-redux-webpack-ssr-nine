# bootstrap-react-redux-webpack-ssr-nine

## Overview:

App builds off 'bootstrap-react-redux-webpack-ssr-eight' with a modified directory structure.

This app's initial focus will be applying thunk middleware for Redux.


page loading using scripts: put them in <head> and add a 'defer' attribute to <script> tag:

<script defer src="script.js"></script>

triggers the faster 'domInteractive' event

* Some common rules of thumb for determining what kind of data should be put into Redux:

- Do other parts of the application care about this data?
- Do you need to be able to create further derived data based on this original data?
- Is the same data being used to drive multiple components?
- Is there value to you in being able to restore this state to a given point in time (ie, time travel debugging)?
- Do you want to cache the data (ie, use what's in state if it's already there instead of re-requesting it)?
- Do you want to keep this data consistent while hot-reloading UI components (which may lose their internal state when swapped)?

* For the app, what will be stored into Redux (state):

- Choice: keep every piece of data in Redux, to maintain a fully serializable and controlled version of the application at all times
- Choice: keep non-critical or UI state, such as 'is this dropdown currently open', inside a component's internal state

Because typeof evaluates to 'object' for all object and array values other than functions, it is useful only to distinguish objects from other, primitive types.

In order to distinguish one class of object from another, you must use other techniques, such as the instanceof operator, the class attribute, or the constructor property. 

Destructuring is basically a convenient way of breaking the data structure into smaller pieces to access its data more easily and extract multiple values from Objects or Arrays.

'Array.from()' tries to check if it's first argument is an iterable, and if it is it uses the iterator to produce values to copy into the returned array

'Array.from()', if passed an array-like object, behaves the same as 'slice()' or 'apply()'

'Array.from()' loops over the values accessing numerically the name properties

* ===========================================================================================
* ========================================== REVIEW =========================================
* ===========================================================================================

* =============== SPA BASIC RENDER PROCESS ===============

- The server generates a skeleton HTML page with an empty div-tag, and the Javascript bundle with the React components in a script-tag
- When the page is loaded on the client, React generates HTML from the React components, and puts it inside the div-ta

* =============== SSR BASIC RENDER PROCESS ===============

- With SSR, the server generates an HTML page as with SPA
  But this time the server also renders the React component and injects it into the div-tag before sending it to the client

- When the page is loaded on the client, the React component is already there
  Client side React renders the components anyway, and puts it inside the div tag again

* =============== SSR WARNING MESSAGES (react-dom.development.js) ===============

- Warning: Text content did not match. Server: "some text .... " Client: "some text ... "
- Warning: Expected server HTML to contain a matching `<p>` in `div>`.


* ==========================================================================================

* The 'ReactDOMServer' object enables you to render components to static markup
* The 'ReactDOMServer' object is Typically used on a Node server (SSR)

* =============== OVERVIEW =============== 

* The following methods can be used in both the server and browser environments:

- renderToString()
- renderToStaticMarkup()


* ========================== REFERENCE ====================================

* ====================== ReactDOMServer ==================

* ReactDOMServer.renderToString(element):

- Render a React element to its initial HTML.
  React will return an HTML string.
  You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

- If you call 'ReactDOM.hydrate()' on a node that already has this server-rendered markup, 
  React will preserve it and >>>> only attach event handlers <<<<<, allowing you to have a very performant first-load experience.


* ReactDOMServer.renderToStaticMarkup(element):

- Similar to 'renderToString', except this doesn't create extra DOM attributes that React uses internally, such as 'data-reactroot'. 
  This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

- If you plan to use React on the client to >>>> make the markup interactive <<<<<, do not use this method. 
  Instead, use 'renderToString' on the server and 'ReactDOM.hydrate()' on the client.

* ReactDOMServer.renderToNodeStream(element):

- Render a React element to its initial HTML. 
  Returns a Readable stream that outputs an HTML string. 
  The HTML output by this stream is exactly equal to what ReactDOMServer.renderToString would return. 
  You can use this method to generate HTML on the server and send the markup down on the initial request 
  for faster page loads and to allow search engines to crawl your pages for SEO purposes.

- If you call 'ReactDOM.hydrate()' on a node that already has this server-rendered markup, 
  React will preserve it and >>>> only attach event handlers <<<<<, allowing you to have a very performant first-load experience.
  >>>>>>>>>>>>>>> SAME AS WITH 'ReactDOMServer.renderToString(element)' <<<<<<<<<<<<<<<<<<

* ========================= ReactDOM =======================

* ReactDOM.hydrate(element, container[, callback]):

- Same as 'render()', but is used to hydrate a container whose HTML contents were rendered by 'ReactDOMServer'. 
  React will attempt to >>>>>>> attach event listeners to the existing markup <<<<<<<<<<.

* =============== SSR WARNING MESSAGES (react-dom.development.js) ===============

- Warning: Text content did not match. Server: "some text .... " Client: "some text ... "
- Warning: Expected server HTML to contain a matching `<p>` in `div>`.

- React expects that the rendered content is identical between the server and the client. 
  It can patch up differences in text content, but you should treat mismatches as bugs and fix them. 
  In development mode, React warns about mismatches during hydration. 
  There are no guarantees that attribute differences will be patched up in case of mismatches. 
  This is important for performance reasons because in most apps, mismatches are rare, and so validating all markup would be prohibitively expensive.

- If a single element's attribute or text content is unavoidably different between the server and the client (for example, a timestamp), 
  you may silence the warning by adding suppressHydrationWarning={true} to the element. 
  It only works one level deep, and is intended to be an escape hatch. 
  Don't overuse it. 
  Unless it's text content, React still won't attempt to patch it up, so it may remain inconsistent until future updates.

- If you intentionally need to render something different on the server and the client, you can do a two-pass rendering. 
  Components that render something different on the client can read a state variable like this.state.isClient, 
  which you can set to true in componentDidMount(). 
  This way the initial render pass will render the same content as the server, avoiding mismatches, 
  but an additional pass will happen synchronously right after hydration. 
  Note that this approach will make your components slower because they have to render twice, so use it with caution.
