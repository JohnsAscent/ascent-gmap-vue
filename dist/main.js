"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.components = void 0;
exports.gmapApi = gmapApi;
exports.helpers = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

var _autocompleteInput = _interopRequireDefault(require("./components/autocomplete-input.vue"));

var _circleShape = _interopRequireDefault(require("./components/circle-shape.vue"));

var _drawingManager = _interopRequireDefault(require("./components/drawing-manager.vue"));

var _heatmapLayer = _interopRequireDefault(require("./components/heatmap-layer.vue"));

var _infoWindow = _interopRequireDefault(require("./components/info-window.vue"));

var _kmlLayer = _interopRequireDefault(require("./components/kml-layer.vue"));

var _mapLayer = _interopRequireDefault(require("./components/map-layer.vue"));

var _markerIcon = _interopRequireDefault(require("./components/marker-icon.vue"));

var _placeInput = _interopRequireDefault(require("./components/place-input.vue"));

var _polygonShape = _interopRequireDefault(require("./components/polygon-shape.vue"));

var _polylineShape = _interopRequireDefault(require("./components/polyline-shape.vue"));

var _rectangleShape = _interopRequireDefault(require("./components/rectangle-shape.vue"));

var _streetViewPanorama = _interopRequireDefault(require("./components/street-view-panorama.vue"));

var _mapElement = _interopRequireDefault(require("./utils/factories/map-element"));

var _promiseLazy = _interopRequireDefault(require("./utils/factories/promise-lazy"));

var _initializer = _interopRequireDefault(require("./utils/manager/initializer"));

var _mapElement2 = _interopRequireDefault(require("./mixins/map-element"));

var _mountable = _interopRequireDefault(require("./mixins/mountable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * HACK: Cluster should be loaded conditionally
 * However in the web version, it's not possible to write
 * `import 'gmap-vue/src/components/cluster'`, so we need to
 * import it anyway (but we don't have to register it)
 * Therefore we use babel-plugin-transform-inline-environment-variables to
 * set BUILD_DEV to truthy / falsy
 */
var Cluster = undefined; // TODO: This should be checked if it must be GmapVue, Gmap.api or something else

var GmapApi = null; // TODO: should be called googleMapsApi for next versions

function gmapApi() {
  return GmapApi.gmapApi && window.google;
}
/**
 * Export all components and mixins
 */


var components = {
  HeatmapLayer: _heatmapLayer.default,
  KmlLayer: _kmlLayer.default,
  Marker: _markerIcon.default,
  Polyline: _polylineShape.default,
  Polygon: _polygonShape.default,
  Circle: _circleShape.default,
  Cluster: Cluster,
  Rectangle: _rectangleShape.default,
  DrawingManager: _drawingManager.default,
  InfoWindow: _infoWindow.default,
  MapLayer: _mapLayer.default,
  PlaceInput: _placeInput.default,
  Autocomplete: _autocompleteInput.default,
  MountableMixin: _mountable.default,
  StreetViewPanorama: _streetViewPanorama.default
};
/**
 * Export all helpers
 */

exports.components = components;
var helpers = {
  loadGmapApi: _initializer.default,
  MapElementMixin: _mapElement2.default,
  MapElementFactory: _mapElement.default
};
exports.helpers = helpers;
var _default = {
  install: function (Vue, options) {
    // Set defaults
    var finalOptions = _objectSpread({
      installComponents: true,
      autobindAllEvents: false
    }, options);
    /**
     * Update the global `GmapApi`. This will allow
     * components to use the `google` global reactively
     * via:
     *   import { gmapApi } from 'gmap-vue'
     *   export default {  computed: { google: gmapApi }  }
     */


    GmapApi = new Vue({
      data: {
        gmapApi: null
      }
    });
    var defaultResizeBus = new Vue();
    /**
     * Use a lazy to only load the API when
     * a VGM component is loaded
     */

    var promiseLazyCreator = (0, _promiseLazy.default)(_initializer.default, GmapApi);
    var gmapApiPromiseLazy = promiseLazyCreator(finalOptions); // Instance properties

    Vue.mixin({
      created: function created() {
        this.$gmapDefaultResizeBus = defaultResizeBus;
        this.$gmapOptions = finalOptions;
        this.$gmapApiPromiseLazy = gmapApiPromiseLazy;
      }
    }); // Static properties

    Vue.$gmapDefaultResizeBus = defaultResizeBus;
    Vue.$gmapApiPromiseLazy = gmapApiPromiseLazy;

    if (finalOptions.installComponents) {
      Vue.component('GmapMap', _mapLayer.default);
      Vue.component('GmapMarker', _markerIcon.default);
      Vue.component('GmapInfoWindow', _infoWindow.default);
      Vue.component('GmapHeatmapLayer', _heatmapLayer.default);
      Vue.component('GmapKmlLayer', _kmlLayer.default);
      Vue.component('GmapPolyline', _polylineShape.default);
      Vue.component('GmapPolygon', _polygonShape.default);
      Vue.component('GmapCircle', _circleShape.default);
      Vue.component('GmapRectangle', _rectangleShape.default);
      Vue.component('GmapDrawingManager', _drawingManager.default);
      Vue.component('GmapAutocomplete', _autocompleteInput.default);
      Vue.component('GmapPlaceInput', _placeInput.default);
      Vue.component('GmapStreetViewPanorama', _streetViewPanorama.default);
    }
  }
};
exports.default = _default;