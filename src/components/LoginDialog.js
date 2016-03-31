import React, { PropTypes, Component } from 'react';
import { StyleSheet,View,Text,Image } from 'react-native';
import { assets } from './../utils/assets';
import Button from 'apsl-react-native-button';
import { Actions } from 'react-native-router-flux';

export default class LoginDialog extends Component {

  componentWillReceiveProps(nextProps) {
    console.log('next props ',nextProps);
  }

  render() {
    return (
      <Image source={assets.bg} style={styles.container}>
        <View style={styles.dialogWrapper}>
          <Text style={styles.dialogText}>
            {this.props.dialogText}
          </Text>
          <Button
            style={styles.button}
            onPress={()=>Actions.login()}
            textStyle={{fontSize: 18, color:'white'}}
          >
            Login
          </Button>
          <Text style={styles.orText}>
            Don't have an account ?
          </Text>
          <Button
            style={styles.button}
            onPress={()=>Actions.register()}
            textStyle={{fontSize: 18, color:'white'}}
          >
            Sign up now !
          </Button>
          <Text style={styles.minFeatureText} onPress={()=>Actions.pop()}>Browse the site with limited features</Text>

        </View>
      </Image>
    );
  }
}

LoginDialog.propTypes = ({
  dialogText:PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    padding: 10,
    justifyContent:'center',
  },
  dialogWrapper:{
    backgroundColor:'white',
    opacity:0.9,
    paddingTop:50,
    paddingBottom:100,
    padding:20,
    margin:30,
    alignItems:'center'
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