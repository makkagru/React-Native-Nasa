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
import { Icon, Header, Left, Right } from 'native-base';

class Likes extends Component {
  async componentDidMount() {
    await this.setLikeItems();
  }

  setLikeItems = async () => {
    let nameItem = this.props.likes.itemName === 'curiosity' ? 'likes' : 'opportunityLikes';
    console.log(nameItem);
    let responceRow = await AsyncStorage.getItem(nameItem);
    console.log(responceRow);
    if (responceRow) {
      let responce = await JSON.parse(responceRow);
      console.log(responce);
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
        {item ? (
          <View>
            <Header>
              <Left>
                <TouchableOpacity>
                  <Icon onPress={() => this.props.navigation.goBack()} name='arrow-back'/>
                </TouchableOpacity>
              </Left>
              <Right>
                <TouchableOpacity onPress={() => this.deleteLikeItem()}>
                  <Icon name="trash" />
                </TouchableOpacity>
              </Right>
            </Header>
            <ImageBackground source={{uri: `${item.img_src}`}} style={{width: '100%', height: '92%',}}>
              <View style={style.icons}>
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
            <Text>
              Empty
            </Text>
          </View>
          )
        }
      </View>
      );
  }
}

style = StyleSheet.create({
  icons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
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