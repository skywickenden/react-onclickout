'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class ClickOutComponent extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    let self    = this
      , el      = ReactDOM.findDOMNode(this)
      ;

    self.__windowListener = function(e) {
      if (e.__clickedElement === el) return;

      var clickOutHandler = self.onClickOut || self.props.onClickOut;
      if (!clickOutHandler) {
        return console.warn('onClickOut is not defined.');
      }

      clickOutHandler.call(self, e);
    };

    self.__elementListener = function(e) {
      e.__clickedElement = el;
    };

    setTimeout(function() {
      if (self.__unmounted) return;
      window.addEventListener('click', self.__windowListener);
      window.addEventListener('touchstart', self.__windowListener);
      el.addEventListener('click', self.__elementListener);
      el.addEventListener('touchstart', self.__elementListener);
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.__windowListener);
    ReactDOM.findDOMNode(this).removeEventListener('click', this.__elementListener);
    this.__unmounted = true;
  }

  render() {
    return Array.isArray(this.props.children) ?
      <div>{this.props.children}</div> :
      React.Children.only(this.props.children);
  }
}

module.exports = ClickOutComponent
