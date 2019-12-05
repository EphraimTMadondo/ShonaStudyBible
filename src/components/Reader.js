/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Item,
} from 'native-base';
import {Image} from 'react-native';
import Autolink from 'react-native-autolink';
import {gray, cream, purple} from '../styles/colors';
import {Actions} from 'react-native-router-flux';
import {Database} from '../helpers/database';

const shonaDB = new Database('shona.sqlite');

class Reader extends Component {
  componentDidMount() {
    shonaDB.listVerses().then(result => console.log(result));
  }

  render() {
    const {fontSize, fontPadding} = this.props;
    return (
      <Container style={{backgroundColor: cream}}>
        <Header hasSegment>
          <Left style={{flex: 0}} />
          <Body style={{flex: 0}} />
          <Right style={{flex: 1, justifyContent: 'space-between'}}>
            <Button transparent onPress={() => Actions.drawerOpen()}>
              <Icon name="md-menu" style={{color: gray}} />
            </Button>
            <Button transparent>
              <Image
                style={{width: 30, height: 30}}
                resizeMode="contain"
                source={require('../assets/books.png')}
              />
            </Button>
            <Button transparent>
              <Icon name="md-book" style={{color: gray}} />
            </Button>
            <Button transparent>
              <Icon
                name="shopping-cart"
                type="MaterialIcons"
                style={{color: gray}}
              />
            </Button>
            <Button transparent>
              <Icon name="ios-settings" style={{color: gray}} />
            </Button>
            <Button transparent>
              <Icon type="MaterialIcons" name="search" style={{color: gray}} />
            </Button>
          </Right>
        </Header>
        <Content>
          <Item
            style={{
              backgroundColor: purple,
              marginLeft: 0,
            }}>
            <Body style={{flexDirection: 'row'}}>
              <Button transparent small>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Select Verse
                </Text>
              </Button>
              <Button warning small>
                <Text> KJV 1Sa 19:9-14 </Text>
              </Button>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="ios-settings" style={{color: '#fff'}} />
              </Button>
            </Right>
          </Item>
          <Autolink
            style={{fontSize: fontSize, padding: fontPadding}}
            onPress={(url, match) => console.log({url, match})}
            renderLink={(url, match, index) => (
              <Text
                key={index}
                style={{
                  color: '#463CBA',
                  fontWeight: 'bold',
                  fontSize: fontSize + 2,
                }}>
                {` ${String(url).replace('ssb.com/', '')} `}
              </Text>
            )}
            // eslint-disable-next-line prettier/prettier
            text={'https://ssb.com/1 And Saul sought to smite David even to the wall with the javelin; but he slipped away out of Saul\'s presence, and he smote the javelin into the wall: and David fled, and escaped that night. Saul also sent messengers unto David\'s house, to watch him, and to slay him in the morning: and Michal David\'s wife told him, saying, If thou save not thy life to night, to morrow thou shalt be slain. So Michal let David down through a window: and he went, and fled, and escaped. And Michal took an image, and laid it in the bed, and put a pillow of goats\' hair for his bolster, and covered it with a cloth. And when Saul sent messengers to take David, she said, He is sick. And Saul sent the messengers again to see David, saying, Bring him up to me in the bed, that I may slay him. And when the messengers were come in, behold, there was an image in the bed, with a pillow of goats\' hair for his bolster. And Saul said unto Michal, Why hast thou deceived me so, and sent away mine enemy, that he is escaped? And Michal answered Saul, He said unto me, Let me go; why should I kill thee?'}
          />
        </Content>
      </Container>
    );
  }
}
export default Reader;
