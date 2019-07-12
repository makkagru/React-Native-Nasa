import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Button,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native'; 
import { getAllItems, setImage, changeSwitchValue, changeItemName, changeLoadingValidation, changeFirtModalValid, changeSecondModalValid} from '../../action.js';
import { AsyncStorage } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Header, Container, Icon, Spinner, Bottom} from 'native-base';

class Home extends React.Component {

  async componentDidMount() { 
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
    if (!this.props.app.loading) {
      this.props.changeLoadingValidation();
    }
    await this.props.changeItemName();
    this.props.changeSwitchValue();
    await this.props.getAllItems(this.props.app.itemName);
    await this.setImageNumber();
    if (this.props.app.loading) {
      this.props.changeLoadingValidation();
    }
  }


  render() {
    const item = this.props.app.allItems[this.props.app.imageNumber];
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <View>
            <View style={styles.switch}>
              <Switch
                value={this.props.app.switchValue}
                onChange={() => this.onSwitchChange()}
              />
              <View style={{justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 7}}>
                  Toggle Items
                </Text>
              </View>
              </View>
          </View>
          <View style={{flex: 8, alignItems: 'center',}}>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Nasa Images
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end'}}>
              <Text style={{fontSize: 12, top: 4}}>
                {this.props.app.itemName}
              </Text>
            </View>
          </View>
          <View style={{flex: 2, alignItems: 'flex-end'}}>
            <TouchableOpacity>
              <Icon onPress={() => navigate('Likes')} name="heart" style={{color: 'blue', fontSize: 30}} />
              </TouchableOpacity>
          </View>
        </Header>
        {this.props.app.loading ? (
          <View style={styles.loadig}>
            <Spinner color='blue' />
          </View>
        ) : (
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
              {this.props.app.imageNumber === 0 &&
                <View>
                  <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.props.app.firstModalValidation}
                  >
                    <ImageBackground source={require('./space.jpg')} style={{width: '100%', height: '100%'}}>
                      <View style={styles.tutorial}>
                        <Text style={{color: '#fff', fontSize: 16}}>
                          Swipe left to change image
                        </Text>
                        <Button title='Ok' onPress={() => {
                          this.props.changeFirtModalValid();
                          this.props.changeSecondModalValid();   
                        }}>
                        </Button>
                      </View>
                    </ImageBackground>
                  </Modal>
                  <Modal
                    visible={this.props.app.secondModalValidation}
                    animationType="slide"
                    transparent={false}
                    >
                    <ImageBackground source={require('./image.jpg')} style={{width: '100%', height: '100%'}}>
                      <View style={styles.tutorial}>
                        <Text style={{fontSize: 16}}>
                          Swipe right to add to likes
                        </Text>
                        <Button title='Got it!' onPress={() => {
                          this.props.changeSecondModalValid();
                          }}></Button>
                      </View>
                    </ImageBackground>
                  </Modal>
                </View>
              }
              </ImageBackground>
            }
            </View>
          </GestureRecognizer>
          )
        }
        
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
    bottom: 4,
    fontSize: 20,
  },
  switch: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorial: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

})

const mapStateToProps = state => ({
  app: state,
});

const mapDispatchToProps = dispatch => ({
  getAllItems: (itemName) => dispatch(getAllItems(itemName)),
  setImage: (number, item) => dispatch(setImage(number, item)),
  changeSwitchValue: () => dispatch(changeSwitchValue()),
  changeItemName: () => dispatch(changeItemName()),
  changeLoadingValidation: () => dispatch(changeLoadingValidation()),
  changeFirtModalValid: () => dispatch(changeFirtModalValid()),
  changeSecondModalValid: () => dispatch(changeSecondModalValid()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);