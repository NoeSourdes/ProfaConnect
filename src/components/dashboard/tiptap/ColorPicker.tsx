"use client";

import { Button } from "@/src/components/ui/button";
import { Baseline } from "lucide-react";
import React from "react";
import { SwatchesPicker } from "react-color";

type ColorPickerProps = {
  onColorChange: (color: string) => void;
};

class ColorPicker extends React.Component<
  ColorPickerProps,
  { displayColorPicker: boolean; color: string }
> {
  state = {
    displayColorPicker: false,
    color: "#000000",
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: any) => {
    this.setState({ color: color.hex });
    this.props.onColorChange(color.hex);
  };

  render() {
    const popover: React.CSSProperties = {
      position: "absolute",
      zIndex: 2,
    };

    const cover: React.CSSProperties = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    };
    return (
      <div>
        <Button variant="ghost" size="icon" onClick={this.handleClick}>
          <Baseline size={18} color={this.state.color} />
        </Button>
        {this.state.displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={this.handleClose} />
            <SwatchesPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPicker;
