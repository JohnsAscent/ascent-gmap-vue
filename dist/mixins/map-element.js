"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @class MapElementMixin
 *
 * Add a inject object to inject $mapPromise and a provide function to the
 * component this function save the returned Google Maps object in the $map
 * property after the $mapPromise is resolved.
 *
 * @property $map - The Google map (valid only after the promise returns)
 */
var _default = {
  inject: {
    $mapPromise: {
      default: 'abcdef'
    }
  },
  provide: function provide() {
    var _this = this;

    // Note: although this mixin is not "providing" anything,
    // components' expect the `$map` property to be present on the component.
    // In order for that to happen, this mixin must intercept the $mapPromise
    // .then(() =>) first before its component does so.
    //
    // Since a provide() on a mixin is executed before a provide() on the
    // component, putting this code in provide() ensures that the $map is
    // already set by the time the
    // component's provide() is called.
    this.$mapPromise.then(function (map) {
      _this.$map = map;
    });
    return {};
  }
};
exports.default = _default;