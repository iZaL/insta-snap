import React,{ Component } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './reducers/configure-store';
import App from './App';

export default class Root extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <App />
      </Provider>
    )
  }
}