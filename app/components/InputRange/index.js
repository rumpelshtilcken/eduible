import { Component, PropTypes } from 'react';
import Slider from 'rc-slider';

import stylesheet from './index.css';

class InputRange extends Component {
  state = {
    value: [1, 9999999]
  };

  handleLowerBoundChange = (e) => {
    if (e.target.value <= this.state.value[1] && e.target.value >= 1) {
      this.handleRangeChange({ lowerPrice: +parseInt(e.target.value, 10) });
    }
  };

  handleUpperBoundChange = (e) => {
    if (e.target.value >= this.state.value[0] && e.target.value <= 9999999) {
      this.handleRangeChange({ upperPrice: +parseInt(e.target.value, 10) });
    }
  };

  handleSliderChange = (value) => {
    this.handleRangeChange({
      upperPrice: value[1],
      lowerPrice: value[0]
    });
  };

  handleRangeChange = ({ upperPrice, lowerPrice }) => {
    const { value } = this.state;
    const lower = lowerPrice || value[0];
    const upper = upperPrice || value[1];

    this.setState({ value: [lower, upper] }, () =>
      this.props.onChange({ minCost: this.state.value[0], maxCost: this.state.value[1] })
    );
  };

  render() {
    const Range = Slider.Range;

    return (
      <div>
        <Range
          min={1}
          max={9999999}
          allowCross={false}
          value={this.state.value}
          onChange={this.handleSliderChange}
        />
        <div className="rangeInputContainer">
          <input
            className="lower"
            type="text"
            value={this.state.value[0]}
            onChange={this.handleLowerBoundChange}
          />
          &nbsp;-&nbsp;
          <input
            className="upper"
            type="text"
            value={this.state.value[1]}
            onChange={this.handleUpperBoundChange}
          />
        </div>
        <style jsx global>
          {stylesheet}
        </style>
      </div>
    );
  }
}
InputRange.propTypes = {
  onChange: PropTypes.func
};

export default InputRange;
