import "babel-polyfill";
import "element-closest";
import "./index.css";
import React, { Component } from "react";
import YearInput from "./components/YearInput";
import PickerPanel from "./components/PickerPanel/index";

class YearPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: this.props.selected ? +this.props.selected : "",
      yearIsSelected: false,
      selectedYear: this.props.selected
        ? +this.props.selected
        : new Date().getFullYear(),
      panelIsOpen: false,
      panelTop: 0,
      panelLeft: 0
    };
  }

  componentDidMount() {
    this.panelPosition();

    document.addEventListener(
      "scroll",
      function(event) {
        this.panelPosition();
      }.bind(this)
    );

    document.addEventListener(
      "click",
      function(event) {
        if (!event.target.closest(".year-picker")) {
          this.closePanel();
        }
      }.bind(this)
    );

    document.addEventListener(
      "keydown",
      function(event) {
        event.preventDefault();
        if (this.state.panelIsOpen) {
          switch (event.keyCode) {
            case 38: //arrow up
              this.increaseYear();
              break;
            case 40: //arrow down
              this.decreaseYear();
              break;
            case 37: //arrow left
              this.jumpBackward();
              break;
            case 39: //arrow right
              this.jumpForward();
              break;
            case 27: //esc
              this.closePanel();
          }
        }
      }.bind(this)
    );
  }

  panelPosition = () => {
    const picker = document.querySelector(".year-picker");
    
    if (!picker) {
        return;
    }
        
    const X = picker.getBoundingClientRect().left; // расстояние от левой стороны окна до левой стороны элемента
    const Y = picker.getBoundingClientRect().bottom; //расстояние от верхней стороны окна до нижней стороны элемента

    const elementHeight = picker.getBoundingClientRect().height; // Высота элемента
    const elementWidth = picker.getBoundingClientRect().width; // Ширина элемента

    const windowHeight = window.innerHeight; //высота окна браузера
    const windowWidth = window.innerWidth; // ширина окна браузера

    const topTrue = Y - elementHeight - 10 > 220;
    const halfTopTrue = Y - elementHeight - 10 > 110;
    const botTrue = windowHeight - Y - 10 > 220;
    const halfBotTrue = windowHeight - Y - 10 > 110;
    const leftTrue = X + elementHeight / 2 > 120;
    const rightTrue = windowWidth - X - elementWidth / 2 > 120;

    if (topTrue && !botTrue && leftTrue && rightTrue) {
      const top = -230;
      const left = -120 + elementWidth / 2;
      this.setState({ panelTop: top, panelLeft: left });
    } else if (!topTrue && botTrue && rightTrue && leftTrue) {
      const top = elementHeight + 10;
      const left = -120 + elementWidth / 2;
      this.setState({ panelTop: top, panelLeft: left });
    } else if (halfBotTrue && halfTopTrue && leftTrue && !rightTrue) {
      const top = -110 + elementHeight / 2;
      const left = -250;
      this.setState({ panelTop: top, panelLeft: left });
    } else if (halfBotTrue && halfTopTrue && !leftTrue && rightTrue) {
      const top = -110 + elementHeight / 2;
      const left = elementWidth + 10;
      this.setState({ panelTop: top, panelLeft: left });
    } else if (!topTrue && botTrue && leftTrue && !rightTrue) {
      const top = 0;
      const left = -250;
      this.setState({ panelTop: top, panelLeft: left });
    } else if (topTrue && !rightTrue && leftTrue && !botTrue) {
      const top = -220 + elementHeight;
      const left = -250;
      this.setState({ panelTop: top, panelLeft: left });
    } else if (!topTrue && rightTrue && !leftTrue && botTrue) {
      const top = 0;
      const left = elementWidth + 10;
      this.setState({ panelTop: top, panelLeft: left });
    } else if (topTrue && rightTrue && !leftTrue && !botTrue) {
      const top = -220 + elementHeight;
      const left = elementWidth + 10;
      this.setState({ panelTop: top, panelLeft: left });
    }
  };

  openPanel = event => {
    this.panelPosition();
    this.setState({ panelIsOpen: true });
  };

  closePanel = event => {
    this.setState({ panelIsOpen: false });
  };

  callback = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.currentYear);
    }
  };

  choiseYear = year => {
    this.setState(
      {
        selectedYear: year,
        currentYear: year,
        yearIsSelected: true
      },
      () => this.callback()
    );
    this.closePanel();
  };

  clearYear = () => {
    this.setState({
      selectedYear: new Date().getFullYear(),
      currentYear: "",
      yearIsSelected: false
    });
  };

  increaseYear = event => {
    this.setState({ selectedYear: this.state.selectedYear + 1 });
  };

  decreaseYear = event => {
    this.setState({ selectedYear: this.state.selectedYear - 1 });
  };

  jumpForward = event => {
    this.setState({ selectedYear: this.state.selectedYear + 5 });
  };

  jumpBackward = event => {
    this.setState({ selectedYear: this.state.selectedYear - 5 });
  };

  thisYear = event => {
    const year = new Date().getFullYear();
    this.setState({
      currentYear: year,
      selectedYear: year,
      yearIsSelected: true
    });
    this.closePanel();
  };

  render() {
    return (
      <div className="year-picker">
        <YearInput
          value={this.state.currentYear}
          openPanel={this.openPanel}
          selected={this.state.yearIsSelected}
          clear={this.clearYear}
        />
        <PickerPanel
          isOpen={this.state.panelIsOpen}
          selectedYear={this.state.selectedYear}
          currentYear={this.state.currentYear}
          increaseYear={this.increaseYear}
          decreaseYear={this.decreaseYear}
          jumpForward={this.jumpForward}
          jumpBackward={this.jumpBackward}
          thisYear={this.thisYear}
          choiseYear={this.choiseYear}
          top={this.state.panelTop}
          left={this.state.panelLeft}
        />
      </div>
    );
  }
}

export default YearPicker;
