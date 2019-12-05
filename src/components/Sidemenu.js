import React, {PureComponent} from 'react';
import {
  Container,
  Content,
  Button,
  Left,
  Body,
  Icon,
  Text,
  List,
  ListItem,
} from 'native-base';
import {StyleSheet, Image, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import headerImage from '../assets/header.png';

const {width, height} = Dimensions.get('window');

const sidemenu = [
  {
    itemname: 'Store',
    itemicon: 'ios-cart',
    page: 'store',
  },
  {
    itemname: 'Messages',
    itemicon: 'ios-chatboxes',
    page: 'messages',
  },
  {
    itemname: 'Verse of the Day',
    itemicon: 'ios-flag',
    page: 'verse',
  },
  {
    itemname: 'Reading History',
    itemicon: 'ios-timer',
    page: 'history',
  },
  {
    itemname: 'Notes',
    itemicon: 'ios-document',
    page: 'notes',
  },
  {
    itemname: 'Highlights',
    itemicon: 'md-clipboard',
    page: 'highlights',
  },
  {
    itemname: 'Saved Passages',
    itemicon: 'md-book',
    page: 'passages',
  },
];

export default class SideMenu extends PureComponent {
  constructor(props) {
    super(props);
  }

  navigateTo = nav_item => {
    try {
      Actions[nav_item.page]();
    } catch (error) {
      Actions.viewPage({nav_item});
    }

    this.props.closeDrawer();
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <List
            dataArray={sidemenu}
            keyExtractor={item => item.page}
            renderRow={item => (
              <ListItem
                icon
                style={styles.itemContainer}
                onPress={() => this.navigateTo(item)}>
                <Left>
                  <Icon name={item.itemicon} style={styles.itemIcon} />
                </Left>
                <Body>
                  <Text style={styles.itemText}>{item.itemname}</Text>
                </Body>
              </ListItem>
            )}
          />
          <Button full transparent light style={styles.footer}>
            <Text style={styles.itemText} note>
              Shona Study Bible v1.0.1
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: 300,
    height: 180,
  },
  appLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    marginTop: 16,
  },
  itemContainer: {},
  itemIcon: {
    color: 'gray',
    fontSize: 24,
  },
  itemText: {
    color: 'gray',
    fontSize: 18,
  },
});
