'use strict';
var React = require('React');
import { Scene, Modal, Actions } from 'react-native-router-flux';
import TabIcon from './components/TabIcon';
import Home from './modules/Home/Home';
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
import Settings from './modules/Settings/Settings';
import LoginDialog from './components/LoginDialog';

export const scenes = Actions.create(

  <Scene key="root" component={Modal}>

      <Scene key="tabBar" tabs={true} hideNavBar={true}
             navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
             tabBarStyle={{backgroundColor:'#343459', justifyContent:'center', alignItems:'center', alignSelf:'center', height:40, paddingTop:10}}
      >

        <Scene key="settingsTab"  icon={TabIcon} selectedTabIcon="ion|ios-gear" tabIcon="ion|ios-gear-outline"
               navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
               titleStyle={{ color:'white', fontSize:17}}
               barButtonTextStyle={{ fontSize:17, color:'white' }}
               title="Settings"
        >
          <Scene key="settingsScene" component={Settings} />
        </Scene>

        <Scene key="downloadsTab"  icon={TabIcon} selectedTabIcon="ion|android-star" tabIcon="ion|android-star-outline"
               navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
               titleStyle={{ color:'white', fontSize:17}}
               barButtonTextStyle={{ fontSize:17, color:'white' }}
        >
          <Scene key="downloadsScene" component={UserDownloads}/>
        </Scene>

        <Scene key="favoritesTab"  icon={TabIcon} selectedTabIcon="ion|android-favorite" tabIcon="ion|android-favorite-outline"
               navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
               titleStyle={{ color:'white', fontSize:17}}
               barButtonTextStyle={{ fontSize:17, color:'white' }}
        >
          <Scene key="favoritesScene" component={UserFavorites} />
        </Scene>

        <Scene  key="mediasRouter" icon={TabIcon} selectedTabIcon="ion|briefcase" tabIcon="ion|briefcase"
                navigationBarStyle={{backgroundColor: '#343459',borderBottomColor: '#343459'}}
                titleStyle={{ color:'white', fontSize:17}}
                barButtonTextStyle={{ fontSize:17, color:'white' }}
        >
          <Scene key="mediasScene"  component={Medias} rightTitle="+" onRight={() => Actions.mediaCapture()}
          />
          <Scene key="mediaScene" component={Media}
          />
          <Scene key="mediaCommentsScene" component={MediaComments} title="Comment"
          />
          <Scene key="mediaFavoritesScene" component={MediaFavorites} title="Favorites"
          />
          <Scene key="mediaDownloadsScene" component={MediaDownloads} title="Downloads"
          />
          <Scene key="userMediasScene" component={UserMedias} title="Downloads"
          />
          <Scene key="followersScene" component={Followers} title="Followers"
          />
          <Scene key="followingsScene" component={Followings} title="Followings"
          />
          <Scene key="userScene" component={User}
          />

        </Scene>

        <Scene key="home" initial={true}  icon={TabIcon} selectedTabIcon="ion|ios-home" tabIcon="ion|ios-home-outline" >
          <Scene key="homeScene" component={Home} hideNavBar={true}/>
        </Scene>

        <Scene key="login"  component={Login} hideNavBar={true} component={Login}  />
        <Scene key="mediaCapture" component={MediaCapture} hideNavBar={true} component={MediaCapture} hideTabBar={true}  />
        <Scene key="loginDialog"  component={LoginDialog} hideNavBar={true}  component={LoginDialog} />
        <Scene key="register" component={Register} hideNavBar={true} title="تسجيل الدخول"   />

      </Scene>

  </Scene>

);
