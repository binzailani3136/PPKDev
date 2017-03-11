import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import { Icons } from '@theme';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating ? this.props.rating : 0,
      max: this.props.max ? this.props.max : 5,
      iconWidth: this.props.iconWidth ? this.props.iconWidth : 36,
      iconHeight: this.props.iconHeight ? this.props.iconHeight : 36,
      iconSelected: this.props.iconSelected ? this.props.iconSelected : Icons.rating_apples_small[0],
      iconUnselected: this.props.iconUnselected ? this.props.iconUnselected : Icons.rating_apples_small[1],
      editable: this.props.editable != null ? this.props.editable : true,
    };
  }

  _onRate(rating) {
    this.setState({ rating });
    if (this.props.onRate) {
      this.props.onRate(rating);
    }
  }

  render() {
    let icons=[];
    for (let i = 1; i <= this.state.max; i++) {
      icons.push(
        <TouchableWithoutFeedback
          disabled={!this.state.editable}
          key={i}
          style={{ height: this.state.iconHeight, width: this.state.iconWidth }}
          onPress={() => this._onRate(i)}>
          <Image
            style={{ height: this.state.iconHeight, width: this.state.iconWidth }}
            source={this.state.rating >= i ? this.state.iconSelected : this.state.iconUnselected} />
        </TouchableWithoutFeedback>);
    }
    return (
      <View style={[this.props.style, { flexDirection: 'row' }]}>
        {icons}
      </View>
    );
  }
}

export default Rating;
