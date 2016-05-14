import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FormButton from './FormButton';

export default class LoginDialog extends Component {

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.dialogText}>
            {this.props.message}
          </Text>
          <FormButton
            style={styles.button}
            onPress={()=>Actions.login()}
            buttonText="Login"
         />
          <Text style={styles.orText}>
            Don't have an account ?
          </Text>
          <FormButton
            style={styles.button}
            onPress={()=>Actions.register()}
            buttonText="Sign up now !"
          />
          <Text style={styles.minFeatureText} onPress={()=>Actions.pop()}>Browse the site with limited features</Text>

        </View>
    );
  }
}

LoginDialog.propTypes = {
  message:PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    backgroundColor:'white',
    padding:10,
    margin:10,
    marginTop: 100,
  },
  dialogWrapper:{
    backgroundColor:'green',
    opacity:0.9,
    padding:20,
    marginTop:30,
  },
  dialogText:{
    fontSize:16,
    padding:10,
  },
  orText:{
    paddingBottom:10,
    paddingTop:20
  },
  minFeatureText:{
    paddingTop:20
  },
  button: {
    backgroundColor: '#5BC3BE',
    borderColor: '#5BC3BE',
    borderRadius: 0,
    opacity:1
  }
});
