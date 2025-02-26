"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styleUtilities = require("../utilities/style-utilities");

var _utilities = require("../utilities/utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MIN_ZOOM_SCALE = 0;
var MAX_ZOOM_SCALE = 1;

var ScrollTransition = /*#__PURE__*/function (_React$Component) {
  _inherits(ScrollTransition, _React$Component);

  var _super = _createSuper(ScrollTransition);

  function ScrollTransition(props) {
    var _this;

    _classCallCheck(this, ScrollTransition);

    _this = _super.call(this, props);
    _this.getListStyles = _this.getListStyles.bind(_assertThisInitialized(_this));
    return _this;
  }
  /* eslint-disable complexity */


  _createClass(ScrollTransition, [{
    key: "getSlideTargetPosition",
    value: function getSlideTargetPosition(currentSlideIndex, positionValue) {
      var offset = 0; // Below lines help to display peeking slides when number of slides is less than 3.

      var peekSlide = true;

      switch (this.props.cellAlign) {
        case 'left':
          peekSlide = this.props.children.length <= 2 && currentSlideIndex !== 0 ? false : true;
          break;

        case 'center':
          peekSlide = this.props.children.length > 2 || this.props.currentSlide !== currentSlideIndex - 1 ? true : false;
          break;
      }

      if (this.props.animation === 'zoom' && peekSlide && (this.props.currentSlide === currentSlideIndex + 1 || this.props.currentSlide === 0 && currentSlideIndex === this.props.children.length - 1)) {
        offset = this.props.slideOffset;
      } else if (this.props.animation === 'zoom' && (this.props.currentSlide === currentSlideIndex - 1 || this.props.currentSlide === this.props.children.length - 1 && currentSlideIndex === 0)) {
        offset = -this.props.slideOffset;
      }

      var targetPosition = (this.props.slideWidth + this.props.cellSpacing) * currentSlideIndex;
      var alignmentOffset = (0, _styleUtilities.getAlignmentOffset)(currentSlideIndex, this.props);
      var relativePosition = positionValue - alignmentOffset;
      var startSlideIndex = Math.min(Math.abs(Math.floor(relativePosition / this.props.slideWidth)), this.props.slideCount - 1);

      if (this.props.wrapAround && currentSlideIndex !== startSlideIndex) {
        var slidesOutOfView = Math.max(this.props.slideCount - Math.ceil(this.props.frameWidth / this.props.slideWidth), // Total slides in view
        0);
        var slidesOutOfViewBefore = Math.floor(slidesOutOfView / 2);
        var slidesOutOfViewAfter = slidesOutOfView - slidesOutOfViewBefore;
        var direction = (0, _utilities.getSlideDirection)(startSlideIndex, this.props.currentSlide, this.props.isWrappingAround);

        if (direction < 0) {
          var temp = slidesOutOfViewBefore;
          slidesOutOfViewBefore = slidesOutOfViewAfter;
          slidesOutOfViewAfter = temp;
        }

        var slidesInViewBefore = Math.ceil(alignmentOffset / this.props.slideWidth);
        var slidesBefore = slidesInViewBefore + slidesOutOfViewBefore;
        var slidesInViewAfter = Math.ceil((this.props.frameWidth - alignmentOffset) / this.props.slideWidth) - 1;
        var slidesAfter = slidesInViewAfter + slidesOutOfViewAfter;
        var distanceFromStart = Math.abs(startSlideIndex - currentSlideIndex);

        if (currentSlideIndex < startSlideIndex) {
          if (distanceFromStart > slidesBefore) {
            targetPosition = (this.props.slideWidth + this.props.cellSpacing) * (this.props.slideCount + currentSlideIndex);
          }
        } else if (distanceFromStart > slidesAfter) {
          targetPosition = (this.props.slideWidth + this.props.cellSpacing) * (this.props.slideCount - currentSlideIndex) * -1;
        }
      }

      return targetPosition + offset || 0;
    }
    /* eslint-enable complexity */

  }, {
    key: "formatChildren",
    value: function formatChildren(children) {
      var _this2 = this;

      var _this$props = this.props,
          top = _this$props.top,
          left = _this$props.left,
          currentSlide = _this$props.currentSlide,
          slidesToShow = _this$props.slidesToShow,
          vertical = _this$props.vertical;
      var positionValue = vertical ? top : left;
      return _react["default"].Children.map(children, function (child, index) {
        var isVisible = (0, _utilities.isFullyVisible)(index, _this2.props);
        var inert = isVisible ? {} : {
          inert: 'true'
        };
        return /*#__PURE__*/_react["default"].createElement("li", _extends({
          className: "slider-slide".concat((0, _utilities.getSlideClassName)(index, currentSlide, slidesToShow)),
          style: _this2.getSlideStyles(index, positionValue),
          key: index,
          onClick: _utilities.handleSelfFocus,
          tabIndex: -1
        }, inert), child);
      });
    }
  }, {
    key: "getSlideStyles",
    value: function getSlideStyles(index, positionValue) {
      var targetPosition = this.getSlideTargetPosition(index, positionValue);
      var transformScale = this.props.animation === 'zoom' && this.props.currentSlide !== index ? Math.max(Math.min(this.props.zoomScale, MAX_ZOOM_SCALE), MIN_ZOOM_SCALE) : 1.0;
      return {
        boxSizing: 'border-box',
        display: this.props.vertical ? 'block' : 'inline-block',
        height: (0, _styleUtilities.getSlideHeight)(this.props),
        left: this.props.vertical ? 0 : targetPosition,
        listStyleType: 'none',
        marginBottom: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
        marginLeft: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
        marginRight: this.props.vertical ? 'auto' : this.props.cellSpacing / 2,
        marginTop: this.props.vertical ? this.props.cellSpacing / 2 : 'auto',
        MozBoxSizing: 'border-box',
        position: 'absolute',
        top: this.props.vertical ? targetPosition : 0,
        transform: "scale(".concat(transformScale, ")"),
        transition: 'transform .4s linear',
        verticalAlign: 'top',
        width: this.props.vertical ? '100%' : this.props.slideWidth
      };
    }
  }, {
    key: "getListStyles",
    value: function getListStyles(styles) {
      var deltaX = styles.deltaX,
          deltaY = styles.deltaY;

      var listWidth = this.props.slideWidth * _react["default"].Children.count(this.props.children);

      var spacingOffset = this.props.cellSpacing * _react["default"].Children.count(this.props.children);

      var transform = "translate3d(".concat(deltaX, "px, ").concat(deltaY, "px, 0)");
      var transition = this.props.heightMode === 'current' && this.props.hasInteraction ? 'height 0.2s ease-out' : '0s';
      return {
        boxSizing: 'border-box',
        cursor: this.props.dragging === true ? 'pointer' : 'inherit',
        display: 'block',
        height: this.props.vertical ? listWidth + spacingOffset : this.props.slideHeight,
        margin: this.props.vertical ? "".concat(this.props.cellSpacing / 2 * -1, "px 0px") : "0px ".concat(this.props.cellSpacing / 2 * -1, "px"),
        padding: 0,
        position: 'relative',
        MozBoxSizing: 'border-box',
        msTransform: "translate(".concat(deltaX, "px, ").concat(deltaY, "px)"),
        touchAction: "pinch-zoom ".concat(this.props.vertical ? 'pan-x' : 'pan-y'),
        transform: transform,
        WebkitTransform: transform,
        width: 'auto',
        transition: transition
      };
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.formatChildren(this.props.children);
      var deltaX = this.props.deltaX;
      var deltaY = this.props.deltaY;
      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: "slider-list",
        style: this.getListStyles({
          deltaX: deltaX,
          deltaY: deltaY
        })
      }, children);
    }
  }]);

  return ScrollTransition;
}(_react["default"].Component);

exports["default"] = ScrollTransition;
ScrollTransition.propTypes = {
  animation: _propTypes["default"].oneOf(['zoom']),
  cellAlign: _propTypes["default"].string,
  cellSpacing: _propTypes["default"].number,
  currentSlide: _propTypes["default"].number,
  deltaX: _propTypes["default"].number,
  deltaY: _propTypes["default"].number,
  dragging: _propTypes["default"].bool,
  frameWidth: _propTypes["default"].number,
  hasInteraction: _propTypes["default"].bool,
  heightMode: _propTypes["default"].oneOf(['first', 'current', 'max']),
  isWrappingAround: _propTypes["default"].bool,
  left: _propTypes["default"].number,
  slideCount: _propTypes["default"].number,
  slideHeight: _propTypes["default"].number,
  slideOffset: _propTypes["default"].number,
  slidesToScroll: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  slideWidth: _propTypes["default"].number,
  top: _propTypes["default"].number,
  vertical: _propTypes["default"].bool,
  wrapAround: _propTypes["default"].bool,
  zoomScale: _propTypes["default"].number
};
ScrollTransition.defaultProps = {
  cellAlign: 'left',
  cellSpacing: 0,
  currentSlide: 0,
  deltaX: 0,
  deltaY: 0,
  dragging: false,
  frameWidth: 0,
  heightMode: 'max',
  isWrappingAround: false,
  left: 0,
  slideCount: 0,
  slideHeight: 0,
  slidesToScroll: 1,
  slideWidth: 0,
  top: 0,
  vertical: false,
  wrapAround: false,
  zoomScale: 0.85
};