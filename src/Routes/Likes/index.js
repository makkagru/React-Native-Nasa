import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { setLikesItems, changeLikeImageNumber, deleteLikeItem} from '../../action';
import { Icon, Header, } from 'native-base';

class Likes extends Component {
  async componentDidMount() {
    await this.setLikeItems();
  }

  setLikeItems = async () => {
    let nameItem = this.props.likes.itemName === 'curiosity' ? 'likes' : 'opportunityLikes';
    let responceRow = await AsyncStorage.getItem(nameItem);
    if (responceRow) {
      let responce = await JSON.parse(responceRow);
      await this.props.setLikesItems(responce);
    } else {
      let arr = [];
      await this.props.setLikesItems(arr);
    }
  }

  deleteLikeItem = async () => {
    let nameItem = this.props.likes.itemName === 'curiosity' ? 'likes' : 'opportunityLikes';
    let responceRow = await AsyncStorage.getItem(nameItem);
    if (responceRow) {
      let responce = await JSON.parse(responceRow);
      responce.splice(this.props.likes.likeImageNumber, 1);
      if (this.props.likes.likeImageNumber === responce.length && this.props.likes.likeImageNumber !== 0) {
        await this.props.changeLikeImageNumber(-1, this.props.likes.likeImageNumber);
      }
      await AsyncStorage.setItem(nameItem, JSON.stringify(responce));
      await this.setLikeItems();
    }
  }

  render() {
    let item = this.props.likes.likesItems[this.props.likes.likeImageNumber];
    return (
      <View>
        {this.props.likes.loading &&
          <Spinner color='blue' />
        }
        <Header>
          <View style={{flex: 1, alignItems: 'flex-start'}}>          
            <TouchableOpacity>
              <Icon onPress={() => this.props.navigation.goBack()} name='arrow-back'/>
            </TouchableOpacity>
          </View>
          <View style={{flex: 4, alignItems: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Likes
              </Text>
              <Text style={{fontSize: 12}}>
                {this.props.likes.itemName}
              </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => this.deleteLikeItem()}>
              <Icon name="trash" />
            </TouchableOpacity>
          </View>
        </Header>
        {item ? (
          <View>
            <ImageBackground source={{uri: `${item.img_src}`}} style={{width: '100%', height: '95%',}}>
              <View style={styles.icons}>
                <TouchableOpacity disabled={this.props.likes.likeImageNumber === 0} onPress={() => this.props.changeLikeImageNumber(-1, this.props.likes.likeImageNumber)}>
                  <Icon name="arrow-back" style={{color: '#fff', fontSize: 50}} />
                </TouchableOpacity>
                <TouchableOpacity disabled={this.props.likes.likeImageNumber === this.props.likes.likesItems.length - 1} onPress={() => this.props.changeLikeImageNumber(1, this.props.likes.likeImageNumber)}>
                  <Icon name="arrow-forward" style={{color: '#fff', fontSize: 50,}} />                
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          ) : (
          <View>
            <ImageBackground style={{width: '100%', height: '95%'}} source={require('./image.jpg')}>
              <View style={styles.emptyText}>
                <Text style={{fontSize: 26, color: '#fff'}}>
                  Nothing to see here
                </Text>
                <Text style={{color: '#fff',}}>
                  Swipe right to add here
                </Text>
              </View>
            </ImageBackground>
          </View>
          )
        }
      </View>
      );
  }
}

styles = StyleSheet.create({
  icons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',

  }
})

const mapStateToProps = state => ({
  likes: state,
})

const matDispatchToProps = dispatch => ({
  setLikesItems: (array) => dispatch(setLikesItems(array)),
  changeLikeImageNumber: (number, imageNumber) => dispatch(changeLikeImageNumber(number, imageNumber)),
  deleteLikeItem: (item, array) => dispatch(deleteLikeItem(item, array)),
})

export default connect(mapStateToProps, matDispatchToProps)(Likes);