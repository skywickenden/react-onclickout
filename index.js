'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var ClickOutComponent = (function (_React$Component) {
  _inherits(ClickOutComponent, _React$Component);

  function ClickOutComponent() {
    _classCallCheck(this, ClickOutComponent);

    _get(Object.getPrototypeOf(ClickOutComponent.prototype), 'constructor', this).call(this);
  }

  _createClass(ClickOutComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this,
          el = ReactDOM.findDOMNode(this),
          windowTouchMoved = false,
          elTouchMoved = false;

      self.__windowListener = function (e) {
        if (e.__clickedElement === el) return;

        var clickOutHandler = self.onClickOut || self.props.onClickOut;
        if (!clickOutHandler) {
          return console.warn('onClickOut is not defined.');
        }

        clickOutHandler.call(self, e);
      };

      self.__elementListener = function (e) {
        e.__clickedElement = el;
      };
      
      self.__windowTouchStartListener = function (e) {
        windowTouchMoved = false;
      };

      self.__elementTouchStartListener = function (e) {
        elTouchMoved = false;
      };   
      
      
      self.__windowTouchMoveListener = function (e) {
        elTouchMoved = true;
      };

      self.__elementTouchMoveListener = function (e) {
        windowTouchMoved = true;
      };      
      
      self.__windowTouchEndListener = function (e) {
        if (!elTouchMoved) self.__windowListener(e);
      };

      self.__elementTouchEndListener = function (e) {
        if (!elTouchMoved) self.__elementListener(e);
      };       
      
      setTimeout(function () {
        if (self.__unmounted) return;
        window.addEventListener('click', self.__windowListener);
        el.addEventListener('click', self.__elementListener);

        window.addEventListener('touchstart', self.__windowTouchStartListener);        
        el.addEventListener('touchstart', self.__elementTouchStartListener);     
        window.addEventListener('touchmove', self.__windowTouchMoveListener);        
        el.addEventListener('touchmove', self.__elementTouchMoveListener);   
        window.addEventListener('touchend', self.__windowTouchEndListener);        
        el.addEventListener('touchend', self.__elementTouchEndListener);   
      }, 0);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.__windowListener);
      window.removeEventListener('touchstart', this.__windowTouchStartListener);
      window.removeEventListener('touchmove', this.__windowTouchMoveListener);
      window.removeEventListener('touchend', this.__windowTouchEndListener);
      ReactDOM.findDOMNode(this).removeEventListener('click', this.__elementListener);
      ReactDOM.findDOMNode(this).removeEventListener('touchstart', this.__elementTouchStartListener);
      ReactDOM.findDOMNode(this).removeEventListener('touchmove', this.__elementTouchMoveListener);
      ReactDOM.findDOMNode(this).removeEventListener('touchend', this.__elementTouchEndListener);
      this.__unmounted = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return Array.isArray(this.props.children) ? React.createElement(
        'div',
        null,
        this.props.children
      ) : React.Children.only(this.props.children);
    }
  }]);

  return ClickOutComponent;
})(React.Component);

module.exports = ClickOutComponent;
