import React, { Component, PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from '../../../node_modules/react-redux';
import { Actions } from 'react-native-router-flux';
import { register, onRegisterFormFieldChange } from '../../actions/Auth/register';
import RegisterScene from './../../components/Auth/RegisterScene';
import LoadingIndicator from './../../components/LoadingIndicator';

class Register extends Component {

  constructor(props) {

    super(props);

    const {fields} = this.props.register.form;

    this.state = {
      fields: {
        name: fields.name,
        email: fields.email,
        password: fields.password,
        passwordConfirmation: fields.passwordConfirmation,
        mobile: fields.mobile
      }
    };
  }


  onFieldChange(value, field) {
    let changedField = field[0];
    const { dispatch } = this.props;
    dispatch(onRegisterFormFieldChange(changedField, value[changedField]));
    this.setState({fields: value});
  }

  handleRegister() {
    const {dispatch} = this.props;
    const fields = this.state.fields;
    console.log('fields', JSON.stringify(fields));
    dispatch(register(fields, (cb)=> {
      Actions.login();
    }));
  }

  handleLoginRoute() {
    Actions.login();
  }

  render() {
    const { register } = this.props;

    if (register.form.error != null) {
      alert('Error, Please try again');
    }

    return (

      <ScrollView style={{padding:10,paddingTop: 64}}>

        {register.isFetching ? <LoadingIndicator style={{ marginTop:10}} /> : <View />}

        <RegisterScene
          register={register}
          fields={this.state.fields}
          onRegisterPress={this.handleRegister.bind(this)}
          onLoginRoutePress={this.handleLoginRoute.bind(this)}
          onChange={this.onFieldChange.bind(this)}
        />

      </ScrollView>
    );
  }

}

function mapStateToProps(state) {
  const { register } = state;
  return {
    ...state,
    register
  }
}

export default connect(mapStateToProps)(Register);
