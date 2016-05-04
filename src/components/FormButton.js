import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'react-native-button';

export default class FormButton extends Component{

  static propTypes=  {
    isDisabled: PropTypes.bool,
    onPress: PropTypes.func,
    buttonText: PropTypes.string
  };

  render() {
    return (
        <Button
          containerStyle={[styles.container,this.props.containerStyle]}
          disabled={this.props.disabled}
          onPress={this.props.onPress}
          style={[styles.textStyle,this.props.textStyle]}
        >
          {this.props.buttonText}
        </Button>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#343459',
    borderColor: '#343459',
    borderRadius: 0,
    padding:10
  },
  textStyle: {
    fontSize: 18,
    color:'white'
  }
});