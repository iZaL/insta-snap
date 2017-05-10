import React, { Component, PropTypes } from 'react';
import {  StyleSheet, Text, View, Image, TouchableHighlight, TextInput, Button } from 'react-native';
import FormButton from './../FormButton';
import LoadingIndicator from './../../components/LoadingIndicator';

export default class LoginScene extends Component {

  static propTypes = {
    handleForgotPasswordRoute:PropTypes.func.isRequired,
    handleRegisterRoute:PropTypes.func.isRequired,
    handleLogin:PropTypes.func.isRequired,
    onFieldChange:PropTypes.func.isRequired,
    email:PropTypes.string.isRequired,
    password:PropTypes.string.isRequired,
  };

  render() {

    const { email, password, onFieldChange, handleLogin, handleRegisterRoute, handleForgotPasswordRoute } = this.props;

    return (
      <View style={styles.container}>

        <Text style={styles.title}>Log in</Text>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => onFieldChange('email',value)}
          value={email}
          maxLength={40}
          placeholderTextColor="gray"
        />
        <View style={styles.separator}/>

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={[styles.textInput]}
          onChangeText={(value) => onFieldChange('password',value)}
          value={password}
          maxLength={40}
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
        <View style={styles.separator}/>

        <TouchableHighlight onPress={()=>handleLogin()} title="Login" style={[styles.button,{marginTop:50}]} underlayColor='transparent' >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

      </View>

    )
  }

}

var styles = StyleSheet.create({

  container:{
    flex:1,
    margin:40,
    marginTop:170
  },
  label: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop:15,
    marginBottom:2
  },
  textCenter: {
    alignSelf: 'center'
  },
  mTop20: {
    marginTop: 20
  },
  textInput:{
    height: 25,
    borderRightColor:'transparent',
    borderTopColor:'transparent',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth:1,
    fontSize:14,
  },
  title:{
    fontSize:20,
    fontWeight:'700',
    textAlign:'center',
    marginBottom:20
  },
  separator:{
    height:0.5,
    backgroundColor:'#CCCCCC',
  },
  link :{
    marginTop:20,
    color:'#1B82F9',
    fontSize:13
  },
  button : {
    backgroundColor:'#98599D',
    borderRadius:30,
    padding:10,
    height:40,
    marginTop:20,
    width:200,
    alignSelf:'center'
  },
  buttonText:{
    color:'white',
    textAlign:'center',
    fontSize:17,
    fontWeight:'700',
  }
});

