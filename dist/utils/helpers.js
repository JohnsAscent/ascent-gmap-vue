"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindEvents = bindEvents;
exports.bindProps = bindProps;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.default = void 0;
exports.downArrowSimulator = downArrowSimulator;
exports.getPropsValues = getPropsValues;
exports.lazyValue = lazyValue;
exports.mappedPropsToVueProps = mappedPropsToVueProps;
exports.twoWayBindingWrapper = twoWayBindingWrapper;
exports.watchPrimitiveProperties = watchPrimitiveProperties;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function bindEvents(vueInst, googleMapsInst, events) {
  events.forEach(function (eventName) {
    if (vueInst.$gmapOptions.autobindAllEvents || vueInst.$listeners[eventName]) {
      googleMapsInst.addListener(eventName, function (ev) {
        vueInst.$emit(eventName, ev);
      });
    }
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPropsValues(vueInst, props) {
  return Object.keys(props).reduce(function (acc, prop) {
    if (vueInst[prop] !== undefined) {
      acc[prop] = vueInst[prop];
    }

    return acc;
  }, {});
} // This piece of code was orignally written by sindresorhus and can be seen here
// https://github.com/sindresorhus/lazy-value/blob/master/index.js


function lazyValue(fn) {
  var called = false;
  var ret;
  return function () {
    if (!called) {
      called = true;
      ret = fn();
    }

    return ret;
  };
}
/**
 * Strips out the extraneous properties we have in our
 * props definitions
 * @param {Object} props
 */


function mappedPropsToVueProps(mappedProps) {
  return Object.entries(mappedProps).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        prop = _ref2[1];

    var value = {};
    if ('type' in prop) value.type = prop.type;
    if ('default' in prop) value.default = prop.default;
    if ('required' in prop) value.required = prop.required;
    return [key, value];
  }).reduce(function (acc, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    acc[key] = val;
    return acc;
  }, {});
} // This piece of code was orignally written by amirnissim and can be seen here
// http://stackoverflow.com/a/11703018/2694653
// This has been ported to Vanilla.js by GuillaumeLeclerc


function downArrowSimulator(input) {
  // TODO: Analyze disabled eslint rules in the file
  // eslint-disable-next-line no-underscore-dangle -- Is old style should be analyzed
  var _addEventListener = input.addEventListener ? input.addEventListener : input.attachEvent;

  function addEventListenerWrapper(type, listener) {
    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
    // and then trigger the original listener.
    if (type === 'keydown') {
      var origListener = listener; // eslint-disable-next-line no-param-reassign -- Is old style this should be analyzed

      listener = function (event) {
        var suggestionSelected = document.getElementsByClassName('pac-item-selected').length > 0;

        if (event.which === 13 && !suggestionSelected) {
          var simulatedEvent = document.createEvent('Event');
          simulatedEvent.keyCode = 40;
          simulatedEvent.which = 40;
          origListener.apply(input, [simulatedEvent]);
        }

        origListener.apply(input, [event]);
      };
    }

    _addEventListener.apply(input, [type, listener]);
  }

  input.addEventListener = addEventListenerWrapper;
  input.attachEvent = addEventListenerWrapper;
}
/**
 * When you have two-way bindings, but the actual bound value will not equal
 * the value you initially passed in, then to avoid an infinite loop you
 * need to increment a counter every time you pass in a value, decrement the
 * same counter every time the bound value changed, but only bubble up
 * the event when the counter is zero.
 *
Example:

Let's say DrawingRecognitionCanvas is a deep-learning backed canvas
that, when given the name of an object (e.g. 'dog'), draws a dog.
But whenever the drawing on it changes, it also sends back its interpretation
of the image by way of the @newObjectRecognized event.

<input
  type="text"
  placeholder="an object, e.g. Dog, Cat, Frog"
  v-model="identifiedObject" />
<DrawingRecognitionCanvas
  :object="identifiedObject"
  @newObjectRecognized="identifiedObject = $event"
  />

new TwoWayBindingWrapper((increment, decrement, shouldUpdate) => {
  this.$watch('identifiedObject', () => {
    // new object passed in
    increment()
  })
  this.$deepLearningBackend.on('drawingChanged', () => {
    recognizeObject(this.$deepLearningBackend)
      .then((object) => {
        decrement()
        if (shouldUpdate()) {
          this.$emit('newObjectRecognized', object.name)
        }
      })
  })
})
 */


function twoWayBindingWrapper(fn) {
  var counter = 0;
  fn(function () {
    counter += 1;
  }, function () {
    counter = Math.max(0, counter - 1);
  }, function () {
    return counter === 0;
  });
}
/**
 * Watch the individual properties of a PoD object, instead of the object
 * per se. This is different from a deep watch where both the reference
 * and the individual values are watched.
 *
 * In effect, it throttles the multiple $watch to execute at most once per tick.
 */


function watchPrimitiveProperties(vueInst, propertiesToTrack, handler) {
  var immediate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isHandled = false;

  function requestHandle() {
    if (!isHandled) {
      isHandled = true;
      vueInst.$nextTick(function () {
        isHandled = false;
        handler();
      });
    }
  }

  propertiesToTrack.forEach(function (prop) {
    vueInst.$watch(prop, requestHandle, {
      immediate: immediate
    });
  });
}
/**
 * Binds the properties defined in props to the google maps instance.
 * If the prop is an Object type, and we wish to track the properties
 * of the object (e.g. the lat and lng of a LatLng), then we do a deep
 * watch. For deep watch, we also prevent the _changed event from being
 * emitted if the data source was external.
 */


function bindProps(vueInst, googleMapsInst, props) {
  Object.keys(props).forEach(function (attribute) {
    var _props$attribute = props[attribute],
        twoWay = _props$attribute.twoWay,
        type = _props$attribute.type,
        trackProperties = _props$attribute.trackProperties,
        noBind = _props$attribute.noBind;

    if (!noBind) {
      var setMethodName = "set".concat(capitalizeFirstLetter(attribute));
      var getMethodName = "get".concat(capitalizeFirstLetter(attribute));
      var eventName = "".concat(attribute.toLowerCase(), "_changed");
      var initialValue = vueInst[attribute];

      if (typeof googleMapsInst[setMethodName] === 'undefined') {
        throw new Error( // TODO: Analyze all disabled rules in the file
        // eslint-disable-next-line no-underscore-dangle -- old code should be analyzed
        "".concat(setMethodName, " is not a method of (the Maps object corresponding to) ").concat(vueInst.$options._componentTag));
      } // We need to avoid an endless
      // propChanged -> event emitted -> propChanged -> event emitted loop
      // although this may really be the user's responsibility


      if (type !== Object || !trackProperties) {
        // Track the object deeply
        vueInst.$watch(attribute, function () {
          var attributeValue = vueInst[attribute];
          googleMapsInst[setMethodName](attributeValue);
        }, {
          immediate: typeof initialValue !== 'undefined',
          deep: type === Object
        });
      } else {
        watchPrimitiveProperties(vueInst, trackProperties.map(function (prop) {
          return "".concat(attribute, ".").concat(prop);
        }), function () {
          googleMapsInst[setMethodName](vueInst[attribute]);
        }, vueInst[attribute] !== undefined);
      }

      if (twoWay && (vueInst.$gmapOptions.autobindAllEvents || vueInst.$listeners[eventName])) {
        googleMapsInst.addListener(eventName, function () {
          vueInst.$emit(eventName, googleMapsInst[getMethodName]());
        });
      }
    }
  });
}

var _default = {
  bindEvents: bindEvents,
  bindProps: bindProps,
  capitalizeFirstLetter: capitalizeFirstLetter,
  getPropsValues: getPropsValues,
  lazyValue: lazyValue,
  mappedPropsToVueProps: mappedPropsToVueProps,
  downArrowSimulator: downArrowSimulator,
  twoWayBindingWrapper: twoWayBindingWrapper,
  watchPrimitiveProperties: watchPrimitiveProperties
};
exports.default = _default;