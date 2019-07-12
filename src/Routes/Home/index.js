import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Button,
  TouchableOpacity,
  Switch
} from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native'; 
import { getAllItems, setImage, changeLoadingValid, changeSwitchValue, changeItemName} from '../../action.js';
import { AsyncStorage } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Header, Container, Icon, Right, Spinner, Bottom, Left} from 'native-base';

class Home extends React.Component {

  async componentDidMount() {  
    await AsyncStorage.removeItem('number');
    await AsyncStorage.removeItem('likes');
    await AsyncStorage.removeItem('opportunityLikes');
    await AsyncStorage.removeItem('opportunityNumber');

    await this.props.getAllItems(this.props.app.itemName);
    await this.setImageNumber();
  }

  changeNumber = async () => {
    let nameItem = this.props.app.itemName === 'curiosity' ? 'number' : 'opportunityNumber';
    let res = await AsyncStorage.getItem(nameItem);
    if (res) {
      let result = Number(res) + 1;
      await AsyncStorage.setItem(nameItem, JSON.stringify(result));
      await this.setImageNumber();
      } else {
        await AsyncStorage.setItem(nameItem, JSON.stringify(1));
        await this.setImageNumber();
      }
    }

  setImageNumber = async () => {
    let nameItem = this.props.app.itemName === 'curiosity' ? 'number' : 'opportunityNumber';
    let res = await AsyncStorage.getItem(nameItem);
      if (res) {
        await this.props.setImage(res);
      } else {
        await this.props.setImage(0);
      }
  }

  setLikesImages = async () => {
    let nameItem = this.props.app.itemName === 'curiosity' ? 'likes' : 'opportunityLikes';
    let res = await AsyncStorage.getItem(nameItem);
    if (res) {
      let item = this.props.app.allItems[this.props.app.imageNumber];
      let result = JSON.parse(res);
      let responce = result.find(el => el.img_src === item.img_src);
      if (!responce) {
        let newArr = [...result, item];
        await AsyncStorage.setItem(nameItem, JSON.stringify(newArr));
      }
    } else {
      let arr = [];
      let item = this.props.app.allItems[this.props.app.imageNumber];
      arr.push(item);
      await AsyncStorage.setItem(nameItem, JSON.stringify(arr));
      let a = await AsyncStorage.getItem(nameItem);
    }
  }

  onSwitchChange = async () => {
    await this.props.changeItemName();
    this.props.changeSwitchValue();
    await this.props.getAllItems(this.props.app.itemName);
    await this.setImageNumber();
  }


  render() {
    const item = this.props.app.allItems[this.props.app.imageNumber];
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', width: '100%',}}>
              Nasa Images
            </Text>
          </View>
          <Right>
            <TouchableOpacity>
              <Icon onPress={() => navigate('Likes')} name="heart" style={{color: 'blue', fontSize: 30}} />
              </TouchableOpacity>
          </Right>
        </Header>
        {this.props.app.loading &&
          <Spinner color='blue' />
        }
        <GestureRecognizer 
          onSwipeLeft={() => this.changeNumber()}
          onSwipeRight={() => {this.setLikesImages(); this.changeNumber()}}
        >
          <View style={{marginTop: 2}}>
          {item &&
            <ImageBackground 
              source={{uri: `${item.img_src}`}}
              style={{width: '100%', height: 502}}
            >
            <View style={style.switch}>
              <Switch
                value={this.props.app.switchValue}
                onChange={() => this.onSwitchChange()}
              />
            </View>
            </ImageBackground>
          }
          </View>
        </GestureRecognizer>
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  switch: {
    flex: 6,
    height: '100%',
    justifyContent: 'flex-end',
  },
})

const mapStateToProps = state => ({
  app: state,
});

const mapDispatchToProps = dispatch => ({
  getAllItems: (itemName) => dispatch(getAllItems(itemName)),
  setImage: (number, item) => dispatch(setImage(number, item)),
  changeLoadingValid: () => dispatch(changeLoadingValid()),
  changeSwitchValue: () => dispatch(changeSwitchValue()),
  changeItemName: () => dispatch(changeItemName()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);