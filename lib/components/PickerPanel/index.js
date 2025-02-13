"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Button = require("../Header/Button");

var _Button2 = _interopRequireDefault(_Button);

var _CurrentYear = require("../Header/CurrentYear");

var _CurrentYear2 = _interopRequireDefault(_CurrentYear);

var _JumpButton = require("../Header/JumpButton");

var _JumpButton2 = _interopRequireDefault(_JumpButton);

var _yearsList = require("../Body/yearsList");

var _yearsList2 = _interopRequireDefault(_yearsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PickerPanel(_ref) {
  var selectedYear = _ref.selectedYear,
      isOpen = _ref.isOpen,
      increaseYear = _ref.increaseYear,
      decreaseYear = _ref.decreaseYear,
      jumpForward = _ref.jumpForward,
      jumpBackward = _ref.jumpBackward,
      thisYear = _ref.thisYear,
      choiseYear = _ref.choiseYear,
      top = _ref.top,
      left = _ref.left;

  if (!isOpen) {
    return null;
  }

  var style = {
    top: top + "px",
    left: left + "px"
  };

  function headerWheel(e) {
    e.preventDefault();
    var delta = e.deltaY;
    if (delta < 0) {
      increaseYear();
    } else {
      decreaseYear();
    }
  }

  function panelKey(e) {
    console.log(e.altKey);
    console.log(e.key);
    console.log(e.keyCode);
    console.log(e.metaKey);
  }

  return _react2.default.createElement(
    "div",
    { className: "picker-panel popup-left", style: style, onKeyUp: panelKey },
    _react2.default.createElement(
      "div",
      { className: "header", onWheel: headerWheel },
      _react2.default.createElement(_JumpButton2.default, { onClick: jumpBackward, direction: "backward" }),
      _react2.default.createElement(_Button2.default, { onClick: decreaseYear, direction: "backward" }),
      _react2.default.createElement(_CurrentYear2.default, { year: selectedYear }),
      _react2.default.createElement(_Button2.default, { onClick: increaseYear, direction: "forward" }),
      _react2.default.createElement(_JumpButton2.default, { onClick: jumpForward, direction: "forward" })
    ),
    _react2.default.createElement(
      "div",
      { className: "body" },
      _react2.default.createElement(_yearsList2.default, { choiseYear: choiseYear, selectedYear: selectedYear })
    )
  );
}

exports.default = PickerPanel;
