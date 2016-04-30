import React, { Component } from 'react';
import { StatusBar, Navigator } from 'react-native';
import { Router, Route, Schema, Animations, TabBar } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { loginUserByToken } from './actions/Auth/login';
import { Actions } from 'react-native-router-flux';
import Home from './containers/Home';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import User from './containers/User/User';
import UserFavorites from './containers/User/UserFavorites';
import UserDownloads from './containers/User/UserDownloads';
import Media from './containers/Media/Media';
import Medias from './containers/Media/Medias';
import MediaComments from './containers/Media/MediaComments';
import MediaFavorites from './containers/Media/MediaFavorites';
import MediaDownloads from './containers/Media/MediaDownloads';
import MediaCapture from './containers/Media/MediaCapture';
import UserMedias from './containers/User/UserMedias';
import Followers from './containers/User/Followers';
import Followings from './containers/User/Followings';
import Settings from './containers/Settings';
import TabIcon from './components/TabIcon';
import LoginDialog from './components/LoginDialog';

class App extends Component {

  componentDidMount() {
    //warning(false, "ScrollView doesn't take rejection well - scrolls anyway");

    StatusBar.setBarStyle('light-content');
    const {dispatch} = this.props;
    dispatch(loginUserByToken()).then((success)=>{
      if(success) {
        //Actions.tabBar();
      }
    });
  }

  render() {

    return (
      <Router hideNavBar={true} name="root">
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}
                navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
                titleStyle={{ color:'white', fontSize:17}}
                barButtonTextStyle={{ fontSize:17, color:'white' }}
        />
        <Schema name="withoutAnimation"/>
        <Schema name="tab" type="switch" icon={TabIcon} />

        <Route initial={true} name="tabBar">
          <Router footer={TabBar} hideNavBar={true} tabBarStyle={{backgroundColor:'#343459', justifyContent:'center', alignItems:'center', alignSelf:'center', height:40, paddingTop:10}}>
            <Route name="home" hideNavBar={true}  schema="tab"  selectedTabIcon="ion|ios-home" tabIcon="ion|ios-home-outline">
              <Router name="homeRouter">
                <Route name="homeScene" component={Home}/>
              </Router>
            </Route>

            <Route name="mediaTab" initial={true}  schema="tab" selectedTabIcon="ion|briefcase" tabIcon="ion|briefcase" >
              <Router name="mediaRoutes" >
                <Route name="mediasScene" component={Medias} rightTitle="+" rightButtonTextStyle={{ fontSize:25, fontWeight:'700'}} onRight={()=>Actions.mediaCapture()} />
                <Route name="mediaScene" component={Media} />
                <Route name="mediaCommentsScene" component={MediaComments} />
                <Route name="mediaFavoritesScene" component={MediaFavorites} />
                <Route name="mediaDownloadsScene" component={MediaDownloads} />
                <Route name="userMediasScene" component={UserMedias} />
                <Route name="followersScene" component={Followers} />
                <Route name="followingsScene" component={Followings} />
                <Route name="userScene" component={User} />
              </Router>
            </Route>
            <Route name="userDownloadsScene" schema="tab" component={UserDownloads}  selectedTabIcon="ion|android-star" tabIcon="ion|android-star-outline"   />
            <Route name="userFavoritesScene" schema="tab" component={UserFavorites}  selectedTabIcon="ion|android-favorite" tabIcon="ion|android-favorite-outline"   />
            <Route name="settingsScene" schema="tab" component={Settings} selectedTabIcon="ion|ios-gear" tabIcon="ion|ios-gear-outline"  />
          </Router>
        </Route>
        <Route  name="login" component={Login}  />
        <Route name="register" component={Register} title="تسجيل الدخول"   />
        <Route name="mediaCapture" hideTabBar={true} hideNavBar={true} component={MediaCapture}  />
        <Route name="loginDialog" schema="modal" hideNavBar={true}  component={LoginDialog} />

      </Router>
    );
  }
}

function mapStateToProps(state) {
  return;
}

export default connect(mapStateToProps)(App);
