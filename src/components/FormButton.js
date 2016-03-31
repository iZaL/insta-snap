import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'apsl-react-native-button';

export default class FormButton extends Component{

  static propTypes=  {
    isDisabled: PropTypes.bool,
    onPress: PropTypes.func,
    buttonText: PropTypes.string
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          isDisabled={this.props.isDisabled}
          onPress={this.props.onPress}
          textStyle={{fontSize: 18, color:'white'}}
        >
          {this.props.buttonText}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: '#5BC3BE',
    borderColor: '#5BC3BE',
    borderRadius: 0
  }
});