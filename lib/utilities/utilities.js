"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFullyVisible = exports.handleSelfFocus = exports.calcSomeInitialState = exports.shouldUpdate = exports.getSlideDirection = exports.swipeDirection = exports.getPropsByTransitionMode = exports.getSlideClassName = exports.addAccessibility = exports.removeEvent = exports.addEvent = void 0;

var _react = _interopRequireDefault(require("react"));

var _styleUtilities = require("./style-utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addEvent = function addEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on".concat(type), eventHandle);
  } else {
    elem["on".concat(type)] = eventHandle;
  }
};

exports.addEvent = addEvent;

var removeEvent = function removeEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent("on".concat(type), eventHandle);
  } else {
    elem["on".concat(type)] = null;
  }
};

exports.removeEvent = removeEvent;

var addAccessibility = function addAccessibility(children, slidesToShow, currentSlide) {
  var needsTabIndex;

  if (slidesToShow > 1) {
    return _react["default"].Children.map(children, function (child, index) {
      var firstVisibleSlide = index >= currentSlide;
      var lastVisibleSlide = index < slidesToShow + currentSlide;
      needsTabIndex = firstVisibleSlide && lastVisibleSlide;
      var ariaProps = needsTabIndex ? {
        'aria-hidden': 'false',
        tabIndex: 0
      } : {
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/_react["default"].cloneElement(child, _objectSpread(_objectSpread({}, ariaProps), child.props));
    });
  } else {
    return _react["default"].Children.map(children, function (child, index) {
      needsTabIndex = index !== currentSlide;
      var ariaProps = needsTabIndex ? {
        'aria-hidden': 'true'
      } : {
        'aria-hidden': 'false',
        tabIndex: 0
      };
      return /*#__PURE__*/_react["default"].cloneElement(child, _objectSpread(_objectSpread({}, ariaProps), child.props));
    });
  }
};

exports.addAccessibility = addAccessibility;

var getSlideClassName = function getSlideClassName(index, currentSlide, slidesToShow) {
  var className = '';
  var visible = index >= currentSlide && index < currentSlide + slidesToShow;
  var current = index === currentSlide;

  if (visible) {
    className = ' slide-visible';

    if (current) {
      className = className.concat(' slide-current');
    }
  }

  return className;
};

exports.getSlideClassName = getSlideClassName;

var getPropsByTransitionMode = function getPropsByTransitionMode(props, keys) {
  var slidesToShow = props.slidesToShow,
      transitionMode = props.transitionMode;
  var updatedDefaults = {};

  if (transitionMode === 'fade') {
    keys.forEach(function (key) {
      switch (key) {
        case 'slidesToShow':
          updatedDefaults[key] = Math.max(parseInt(slidesToShow), 1);
          break;

        case 'slidesToScroll':
          updatedDefaults[key] = Math.max(parseInt(slidesToShow), 1);
          break;

        case 'cellAlign':
          updatedDefaults[key] = 'left';
          break;

        default:
          updatedDefaults[key] = props[key];
          break;
      }
    });
  } else {
    keys.forEach(function (key) {
      updatedDefaults[key] = props[key];
    });
  }

  return updatedDefaults;
};

exports.getPropsByTransitionMode = getPropsByTransitionMode;

var swipeDirection = function swipeDirection(x1, x2, y1, y2, vertical) {
  var xDist = x1 - x2;
  var yDist = y1 - y2;
  var r = Math.atan2(yDist, xDist);
  var swipeAngle = Math.round(r * 180 / Math.PI);

  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle);
  }

  if (swipeAngle <= 45 && swipeAngle >= 0) {
    return 1;
  }

  if (swipeAngle <= 360 && swipeAngle >= 315) {
    return 1;
  }

  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return -1;
  }

  if (vertical === true) {
    if (swipeAngle >= 35 && swipeAngle <= 135) {
      return 1;
    } else {
      return -1;
    }
  }

  return 0;
};

exports.swipeDirection = swipeDirection;

var getSlideDirection = function getSlideDirection(start, end, isWrapping) {
  var direction = 0;
  if (start === end) return direction;

  if (isWrapping) {
    direction = start < end ? -1 : 1;
  } else {
    direction = start < end ? 1 : -1;
  }

  return direction;
};

exports.getSlideDirection = getSlideDirection;

var shouldUpdate = function shouldUpdate(curr, next, keys) {
  var update = false;

  for (var i = 0; i < keys.length; i++) {
    if (curr[keys[i]] !== next[keys[i]]) {
      update = true;
      break;
    }
  }

  return update;
};

exports.shouldUpdate = shouldUpdate;

var calcSomeInitialState = function calcSomeInitialState(props) {
  var _getPropsByTransition = getPropsByTransitionMode(props, ['slidesToScroll', 'slidesToShow', 'cellAlign']),
      slidesToScroll = _getPropsByTransition.slidesToScroll,
      slidesToShow = _getPropsByTransition.slidesToShow,
      cellAlign = _getPropsByTransition.cellAlign;

  var slideWidth = props.vertical ? props.initialSlideHeight || 0 : props.initialSlideWidth || 0;
  var slideHeight = props.vertical ? (props.initialSlideHeight || 0) * props.slidesToShow : props.initialSlideHeight || 0;
  var frameHeight = slideHeight + props.cellSpacing * (slidesToShow - 1);
  var frameWidth = props.vertical ? frameHeight : null;
  return {
    slideWidth: slideWidth,
    slideHeight: slideHeight,
    frameWidth: frameWidth,
    slidesToScroll: slidesToScroll,
    slidesToShow: slidesToShow,
    cellAlign: cellAlign
  };
};

exports.calcSomeInitialState = calcSomeInitialState;

var handleSelfFocus = function handleSelfFocus(e) {};

exports.handleSelfFocus = handleSelfFocus;

var isFullyVisible = function isFullyVisible(slideIndex, config) {
  var currentSlide = config.currentSlide,
      cellSpacing = config.cellSpacing,
      slideCount = config.slideCount,
      slideWidth = config.slideWidth,
      frameWidth = config.frameWidth,
      wrapAround = config.wrapAround,
      cellAlign = config.cellAlign; // Slide width can't be 0

  var fullSlideWidth = slideWidth || 1; // Calculate offset without cellSpacing

  var offsetWidth = (0, _styleUtilities.getAlignmentOffset)(currentSlide, config) + cellSpacing * currentSlide;
  var remainingWidth = frameWidth - offsetWidth;
  var fullSlidesBefore = 0;

  if (cellAlign !== 'left') {
    fullSlidesBefore = Math.max(Math.floor(offsetWidth / fullSlideWidth) + 1, 0);
  } else {
    fullSlidesBefore = Math.max(Math.floor(offsetWidth / fullSlideWidth), 0);
  }

  var fullSlidesAfter = Math.max(Math.floor(remainingWidth / fullSlideWidth), 0); // when slidesToScroll is auto enable clicking of all fully visible slides

  if (fullSlidesAfter + fullSlidesBefore + currentSlide >= slideCount && !wrapAround) {
    var fullSlidesAuto = fullSlidesBefore + fullSlidesAfter;
    fullSlidesAfter = fullSlidesAuto;
    fullSlidesBefore = fullSlidesAuto;
  }

  var currentSlideIndex = Math.ceil(currentSlide);
  var fullyVisibleSlides = [];

  for (var i = currentSlideIndex - fullSlidesBefore; i < currentSlideIndex + fullSlidesAfter + 1; i++) {
    if (i < 0) {
      // -1 won't match a slide index
      fullyVisibleSlides.push(wrapAround ? slideCount + i : -1);
    } else {
      fullyVisibleSlides.push(i > slideCount - 1 ? i - slideCount : i);
    }
  }

  return fullyVisibleSlides.includes(slideIndex);
};

exports.isFullyVisible = isFullyVisible;