
module.exports = function deepMerge() {

  var extended = {};
  var deep = false;
  var i = 0;

  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  var merge = function (obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = deepMerge(extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  for (; i < arguments.length; i++) {
    merge(arguments[i]);
  }

  return extended;
};
