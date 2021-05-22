import React from 'react';
import { Appbar } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Header = props => {
  const navigation = useNavigation();
  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu-outline"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Appbar.Content
        title={props.title}
        titleStyle={{ alignSelf: 'center' }}
      />
      <Appbar.Action
        icon="notifications-outline"
        onPress={() => {
          alert('notifications');
        }}
      />
    </Appbar.Header>
  );
};

export default Header;
