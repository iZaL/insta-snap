import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Scene, TabBar, Modal, Schema, Actions, Switch } from 'react-native-router-flux';
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

const styles = StyleSheet.create({
  container: {
    flex:1, backgroundColor:'white',justifyContent: 'center',alignItems: 'center'
  }
});

export default class Scenes extends Component {
  render() {
    return (
      <Scene key="modal" component={Modal} >

        <Scene key="root" hideNavBar={true} >

          <Scene key="tabBar" component={TabBar} tabs={true}
                 tabBarStyle={{backgroundColor:'#343459', justifyContent:'center', alignItems:'center', alignSelf:'center', height:40, paddingTop:10}}
                 default="mediasRouter" selector={props=>props.default}
          >

            <Scene key="settingsTab" component={Medias} icon={TabIcon} selectedTabIcon="ion|ios-gear" tabIcon="ion|ios-gear-outline"
                   navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
                   titleStyle={{ color:'white', fontSize:17}}
                   barButtonTextStyle={{ fontSize:17, color:'white' }}
            />

            <Scene key="downloadsTab" icon={TabIcon} selectedTabIcon="ion|android-star" tabIcon="ion|android-star-outline"
                   navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
                   titleStyle={{ color:'white', fontSize:17}}
                   barButtonTextStyle={{ fontSize:17, color:'white' }}
            >
              <Scene key="downloadsScene" component={UserDownloads} />
            </Scene>

            <Scene key="favoritesTab" icon={TabIcon} selectedTabIcon="ion|android-favorite" tabIcon="ion|android-favorite-outline"
                   navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
                   titleStyle={{ color:'white', fontSize:17}}
                   barButtonTextStyle={{ fontSize:17, color:'white' }}
            >
              <Scene key="favoritesScene" component={UserFavorites} />
            </Scene>

            <Scene initial={true} key="mediasRouter" icon={TabIcon} selectedTabIcon="ion|briefcase" tabIcon="ion|briefcase"
                   navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
                   titleStyle={{ color:'white', fontSize:17}}
                   barButtonTextStyle={{ fontSize:17, color:'white' }}
                   style={styles.container}
            >
              <Scene key="mediasScene"  component={Medias} rightTitle="+" onRight={()=>Actions.mediaCapture()}   />
              <Scene key="mediaScene" component={Media} />
              <Scene key="mediaCommentsScene" component={MediaComments} />
              <Scene key="mediaFavoritesScene" component={MediaFavorites} />
              <Scene key="mediaDownloadsScene" component={MediaDownloads} />
              <Scene key="userMediasScene" component={UserMedias} />
              <Scene key="followersScene" component={Followers} />
              <Scene key="followingsScene" component={Followings} />
              <Scene key="userScene" component={User} />

            </Scene>

            <Scene key="home" hideNavBar={true} component={Home} icon={TabIcon} selectedTabIcon="ion|ios-home" tabIcon="ion|ios-home-outline" />

          </Scene>

          <Scene key="mediaCapture" hideNavBar={true} component={MediaCapture}  />
          <Scene key="loginDialog"  hideNavBar={true}  component={LoginDialog} />
          <Scene key="login" hideNavBar={true} component={Login}  />
          <Scene key="register" component={Register} hideNavBar={true} title="تسجيل الدخول"   />

        </Scene>

      </Scene>

    );
  }
}


