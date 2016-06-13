import React, { PropTypes, Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ListView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class UserList extends Component {

  static propTypes = {
    users : PropTypes.array.isRequired,
    authUserID: PropTypes.number.isRequired,
    loadUser:PropTypes.func.isRequired,
    followUser:PropTypes.func.isRequired
  };

  renderRow(user) {

    return (
      <View>
        <View style={styles.cellContainer}>
          <View style={styles.cellWrapper}>
            <TouchableHighlight onPress={() => this.props.loadUser(user)} underlayColor="transparent">
              <View style={{flexDirection:'row'}}>
                <View style={styles.imageContainer}>
                  {user.thumbnail ? <Image style={styles.image} source={{uri:user.thumbnail.name}}/> : <View/>}
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    {user.name}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.followWrapper}>
            { user.id == this.props.authUserID ? <View/> :
              <TouchableHighlight onPress={() => this.props.followUser(user)} underlayColor="transparent">
                {user.isFollowing  ?
                  <Icon
                    name='done'
                    size={30}
                    color={'green'}
                    style={styles.followIcon}
                  />
                  :
                  <Icon
                    name='add-circle'
                    size={30}
                    color={'gray'}
                    style={styles.followIcon}
                  />
                }
              </TouchableHighlight>
            }
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }

  render() {
    const {users} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    let dataSource = users ? ds.cloneWithRows(users) : ds.cloneWithRows([]);

    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.container}
        enableEmptySections={true}
      />
    )
  }

}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFD',
    marginTop:5,
    marginBottom:5,
  },
  cellContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:10,
    marginBottom:10
  },
  cellWrapper: {
    flex:5
  },
  imageContainer: {
    flex:1,
  },
  image: {
    height: 30,
    width: 30,
  },
  titleContainer: {
    flex:4,
  },
  title: {
    fontSize: 15,
    textAlign: 'left',
    color: '#DA552F',
  },
  separator: {
    height:1,
    backgroundColor:'#E8E8E8'
  },
  followWrapper: {
    flex:1,
    justifyContent:'flex-end'
  },
  followIcon: {
    height:30,
    width:30,
  }

})
