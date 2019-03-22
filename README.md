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

@babel/runtime-corejs2/core-js/array/from.js]
@babel/runtime-corejs2/core-js/array/is-array.js]
@babel/runtime-corejs2/core-js/get-iterator.js]
@babel/runtime-corejs2/core-js/is-iterable.js]
@babel/runtime-corejs2/core-js/number/is-integer.js]
@babel/runtime-corejs2/core-js/number/is-nan.js]
@babel/runtime-corejs2/core-js/object/assign.js]
@babel/runtime-corejs2/core-js/object/create.js]
@babel/runtime-corejs2/core-js/object/define-property.js]
@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js]
@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js]
@babel/runtime-corejs2/core-js/object/get-prototype-of.js]
@babel/runtime-corejs2/core-js/object/keys.js]
@babel/runtime-corejs2/core-js/object/set-prototype-of.js]
@babel/runtime-corejs2/core-js/object/values.js]
@babel/runtime-corejs2/core-js/parse-float.js]
@babel/runtime-corejs2/core-js/promise.js]
@babel/runtime-corejs2/core-js/symbol.js]
@babel/runtime-corejs2/core-js/symbol/iterator.js]
@babel/runtime-corejs2/helpers/arrayWithHoles.js]
@babel/runtime-corejs2/helpers/arrayWithoutHoles.js]
@babel/runtime-corejs2/helpers/assertThisInitialized.js]
@babel/runtime-corejs2/helpers/asyncToGenerator.js]
@babel/runtime-corejs2/helpers/classCallCheck.js]
@babel/runtime-corejs2/helpers/createClass.js]
@babel/runtime-corejs2/helpers/defineProperty.js]
@babel/runtime-corejs2/helpers/extends.js]
@babel/runtime-corejs2/helpers/getPrototypeOf.js]
@babel/runtime-corejs2/helpers/inherits.js]
@babel/runtime-corejs2/helpers/iterableToArray.js]
@babel/runtime-corejs2/helpers/iterableToArrayLimit.js]
@babel/runtime-corejs2/helpers/nonIterableRest.js]
@babel/runtime-corejs2/helpers/nonIterableSpread.js]
@babel/runtime-corejs2/helpers/objectSpread.js]
@babel/runtime-corejs2/helpers/objectWithoutProperties.js]
@babel/runtime-corejs2/helpers/objectWithoutPropertiesLoose.js]
@babel/runtime-corejs2/helpers/possibleConstructorReturn.js]
@babel/runtime-corejs2/helpers/setPrototypeOf.js]
@babel/runtime-corejs2/helpers/slicedToArray.js]
@babel/runtime-corejs2/helpers/toConsumableArray.js]
@babel/runtime-corejs2/helpers/typeof.js]
@babel/runtime-corejs2/regenerator/index.js]
