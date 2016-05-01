import React,{ Component } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './reducers/configure-store';
import App from './App';

class Root extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    )
  }
}

export default Root;