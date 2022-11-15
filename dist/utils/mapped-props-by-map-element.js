"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streetViewPanoramaMappedProps = exports.rectangleMappedProps = exports.polylineMappedProps = exports.polygonMappedProps = exports.placeInputMappedProps = exports.markerMappedProps = exports.mapMappedProps = exports.kmlLayerMappedProps = exports.infoWindowMappedProps = exports.heatMapLayerMappedProps = exports.drawingManagerMappedProps = exports.default = exports.circleMappedProps = exports.autocompleteMappedProps = void 0;
/**
 * This are GoogleMapsOptions that we want to have like
 * props in our Vue component.
 * This properties are in the way that GoogleMaps accept it
 * and with extraneous properties for the VueJs API.
 * In a previous version of this plugin, to avoid repetition,
 * we created a .js file component with a `mappedProps` key on it
 * and used a variety of helper functions to clean it and bind it
 * to Vue props and watch them, etc.
 * To day our primary main goal is get a more intuitive and descriptive
 * API and a better documentation of it, following this goals we move
 * this extraneous properties to an independent file in order to consume
 * it when is needed.
 * Please you need to remind that you need to create properties in the
 * correspondent Vue component with the same names and the same values
 * for those properties that are not extraneous to Vue.
 */

var autocompleteMappedProps = {
  bounds: {
    type: Object
  },
  componentRestrictions: {
    type: Object,
    // Do not bind -- must check for undefined
    // in the property
    noBind: true
  },
  types: {
    type: Array,
    default: function _default() {
      return [];
    }
  }
};
exports.autocompleteMappedProps = autocompleteMappedProps;
var circleMappedProps = {
  center: {
    type: Object,
    twoWay: true,
    required: true
  },
  radius: {
    type: Number,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    twoWay: false
  }
};
exports.circleMappedProps = circleMappedProps;
var drawingManagerMappedProps = {
  circleOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  },
  markerOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  },
  polygonOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  },
  polylineOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  },
  rectangleOptions: {
    type: Object,
    twoWay: false,
    noBind: true
  }
};
exports.drawingManagerMappedProps = drawingManagerMappedProps;
var heatMapLayerMappedProps = {
  options: {
    type: Object,
    twoWay: false,
    default: function _default() {}
  },
  data: {
    type: Array,
    twoWay: true
  }
};
exports.heatMapLayerMappedProps = heatMapLayerMappedProps;
var infoWindowMappedProps = {
  options: {
    type: Object,
    required: false,
    default: function _default() {
      return {};
    }
  },
  position: {
    type: Object,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  }
};
exports.infoWindowMappedProps = infoWindowMappedProps;
var kmlLayerMappedProps = {
  url: {
    twoWay: false,
    type: String
  },
  map: {
    twoWay: true,
    type: Object
  }
};
exports.kmlLayerMappedProps = kmlLayerMappedProps;
var mapMappedProps = {
  center: {
    required: true,
    twoWay: true,
    type: Object,
    noBind: true
  },
  zoom: {
    required: false,
    twoWay: true,
    type: Number,
    noBind: true
  },
  heading: {
    type: Number,
    twoWay: true
  },
  mapTypeId: {
    twoWay: true,
    type: String
  },
  tilt: {
    twoWay: true,
    type: Number
  },
  options: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};
exports.mapMappedProps = mapMappedProps;
var markerMappedProps = {
  animation: {
    twoWay: true,
    type: Number
  },
  attribution: {
    type: Object
  },
  clickable: {
    type: Boolean,
    twoWay: true,
    default: true
  },
  cursor: {
    type: String,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    twoWay: true,
    default: false
  },
  icon: {
    twoWay: true
  },
  label: {},
  opacity: {
    type: Number,
    default: 1
  },
  options: {
    type: Object
  },
  place: {
    type: Object
  },
  position: {
    type: Object,
    twoWay: true
  },
  shape: {
    type: Object,
    twoWay: true
  },
  title: {
    type: String,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  },
  visible: {
    twoWay: true,
    default: true
  }
};
exports.markerMappedProps = markerMappedProps;
var streetViewPanoramaMappedProps = {
  zoom: {
    twoWay: true,
    type: Number
  },
  pov: {
    twoWay: true,
    type: Object,
    trackProperties: ['pitch', 'heading']
  },
  position: {
    twoWay: true,
    type: Object,
    noBind: true
  },
  pano: {
    twoWay: true,
    type: String
  },
  motionTracking: {
    twoWay: false,
    type: Boolean
  },
  visible: {
    twoWay: true,
    type: Boolean,
    default: true
  },
  options: {
    twoWay: false,
    type: Object,
    default: function _default() {
      return {};
    }
  }
};
exports.streetViewPanoramaMappedProps = streetViewPanoramaMappedProps;
var polygonMappedProps = {
  draggable: {
    type: Boolean
  },
  editable: {
    type: Boolean
  },
  options: {
    type: Object
  },
  path: {
    type: Array,
    twoWay: true,
    noBind: true
  },
  paths: {
    type: Array,
    twoWay: true,
    noBind: true
  }
};
exports.polygonMappedProps = polygonMappedProps;
var polylineMappedProps = {
  draggable: {
    type: Boolean
  },
  editable: {
    type: Boolean
  },
  options: {
    twoWay: false,
    type: Object
  },
  path: {
    type: Array,
    twoWay: true
  }
};
exports.polylineMappedProps = polylineMappedProps;
var rectangleMappedProps = {
  bounds: {
    type: Object,
    twoWay: true
  },
  draggable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    twoWay: false
  }
};
exports.rectangleMappedProps = rectangleMappedProps;
var placeInputMappedProps = {
  bounds: {
    type: Object
  },
  defaultPlace: {
    type: String,
    default: ''
  },
  componentRestrictions: {
    type: Object,
    default: null
  },
  types: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  placeholder: {
    required: false,
    type: String
  },
  className: {
    required: false,
    type: String
  },
  label: {
    required: false,
    type: String,
    default: null
  },
  selectFirstOnEnter: {
    require: false,
    type: Boolean,
    default: false
  }
};
exports.placeInputMappedProps = placeInputMappedProps;
var _default = {
  autocompleteMappedProps: autocompleteMappedProps,
  circleMappedProps: circleMappedProps,
  drawingManagerMappedProps: drawingManagerMappedProps,
  heatMapLayerMappedProps: heatMapLayerMappedProps,
  infoWindowMappedProps: infoWindowMappedProps,
  kmlLayerMappedProps: kmlLayerMappedProps,
  mapMappedProps: mapMappedProps,
  markerMappedProps: markerMappedProps,
  streetViewPanoramaMappedProps: streetViewPanoramaMappedProps,
  polygonMappedProps: polygonMappedProps,
  polylineMappedProps: polylineMappedProps,
  rectangleMappedProps: rectangleMappedProps,
  placeInputMappedProps: placeInputMappedProps
};
exports.default = _default;