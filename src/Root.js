import React,{ Component } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './reducers/configure-store';
import App from './App';
import Scenes from './Scenes';

class Root extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Scenes />
      </Provider>
    )
  }
}

export default Root;