import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { login } from '../../actions/Auth/login';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LoginScene from '../../components/Auth/LoginScene';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: 'admin@test.com',
      password: 'password'
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  };

  loginUser() {
    const credentials = { email:this.state.email,password:this.state.password};

    this.props.dispatch(login(credentials))
      .then((success)=> {
        if(success) {
          Actions.main();
        } else {
          alert('Wrong Credentials, Try again');
        }
      })
      .catch(()=>{alert('network error')});
  }

  handleRegisterRoute() {
    return Actions.register();
  }

  handleForgotPasswordRoute() {
    // @todo: implement route
    return Actions.main();
  }

  onFieldChange(field,value) {
    this.setState({[field]:value});
  }

  render() {
    const { login } = this.props;
    return (
      <View style={{flex:1}}>
        <LoginScene
          {...this.state}
          loginReducer={login}
          loginUser={this.loginUser}
          handleRegisterRoute={this.handleRegisterRoute}
          handleForgotPasswordRoute={this.handleForgotPasswordRoute}
          onFieldChange={this.onFieldChange}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    login : state.login
  }
}

export default connect(mapStateToProps)(Login);