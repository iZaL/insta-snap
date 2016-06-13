import React, {PropTypes, Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TextInput, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class UserScene extends Component {


  render() {
    const {user} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.infoColumnWrapper}>
          <View style={styles.infoWrapper}>
            <TouchableHighlight onPress={() => this.props.loadUserMedias(user)} underlayColor="transparent">
              <Text style={styles.count}>200 Medias</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.props.loadFollowers(user)} underlayColor="transparent">
              <Text style={styles.count}>200 Followers</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.props.loadFollowings(user)} underlayColor="transparent">
              <Text style={styles.count}>200 Followings</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.imageWrapper}>
          <TouchableHighlight onPress={() => ''} underlayColor="transparent">
            <View>
              <Image style={styles.image} source={{uri:user.image}} />
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.imageWrapper}>
          <Text style={styles.username}>
            {user.name}
          </Text>
          { user.id === this.props.authUserID ? <View/> :
            <TouchableHighlight onPress={()=>this.props.followUser(user)} underlayColor="transparent">
              { user.isFollowing ?
                <View style={styles.followingWrapperFollowing}>
                  <Icon
                    name="done"
                    size={18}
                    color="white"
                    style={styles.checked}
                  />
                  <Text style={[styles.following]}> Following </Text>
                </View>
                :
                <View style={styles.followingWrapperFollow}>
                  <Icon
                    name="add-circle"
                    size={18}
                    color="white"
                    style={styles.checked}
                  />
                  <Text style={[styles.following]}> Follow </Text>
                </View>
              }
            </TouchableHighlight>
          }

        </View>

      </View>
    );
  }

}

UserScene.propTypes = {
  authUserID : PropTypes.number.isRequired,
  user:PropTypes.object.isRequired,
  followUser:PropTypes.func.isRequired,
  loadFollowers:PropTypes.func.isRequired,
  loadUserMedias:PropTypes.func.isRequired,
  loadFollowings:PropTypes.func.isRequired
};


var styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    padding:10

  },
  imageWrapper:{
    flex:1,
    justifyContent:'center',
    alignSelf:'center'
  },
  image:{
    height:60,
    width:60,
    borderRadius:30,
    alignSelf:'center'
  },
  username:{
    fontSize:15,
    color:'maroon',
    fontWeight:'400',
    textAlign:'center'
  },
  infoWrapper:{
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  count: {
    fontSize:14,
    alignSelf:'center',
    color:'gray',
    fontWeight:'400',
    paddingTop:5,
    paddingBottom:5
  },
  countInfo: {
    fontSize:12,
    color:'gray'
  },
  infoColumnWrapper:{
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignSelf:'center'
  },
  followingWrapperFollow:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    borderColor:'gray',
    padding:5,
    backgroundColor:'blue'
  },
  followingWrapperFollowing:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    padding:5,
    backgroundColor:'green'
  },
  mediaContainer:{
    flexDirection:'row'
  },
  mediaWrapper: {
  },
  follow:{
    color:'#5BC3BE'
  },
  following: {
  },
  add :{
    color:'#5BC3BE',
    width:20,
    height:20
  },
  checked: {
    width:20,
    height:20
  }


});
