import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../redux/signinSlice';

import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const signoutToken = useSelector(state => state.signin.userData.key);
  const isSignedIn = useSelector(state => state.signin.isSignedIn);
  const userType = useSelector(state => state.signin.userType);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Icon size={50} icon="person" />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>
                  {isSignedIn ? '회원' : '비회원'}님
                </Title>
                <Caption style={styles.caption}>안녕하세요</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="홈"
              onPress={() => {
                props.navigation.navigate('홈');
              }}
            />

            {isSignedIn ? (
              // if signed in
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="settings-outline" color={color} size={size} />
                )}
                label="마이페이지"
                onPress={() => {
                  props.navigation.navigate('마이페이지');
                }}
              />
            ) : (
              // if not signed in
              <>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="log-in-outline" color={color} size={size} />
                  )}
                  label="로그인"
                  onPress={() => {
                    props.navigation.navigate('로그인');
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Icon name="person-add-outline" color={color} size={size} />
                  )}
                  label="회원가입"
                  onPress={() => {
                    props.navigation.navigate('회원가입');
                  }}
                />
              </>
            )}
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="information-circle-outline"
                  color={color}
                  size={size}
                />
              )}
              label="고객센터"
              onPress={() => {
                props.navigation.navigate('고객센터');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {isSignedIn && (
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="log-out-outline" color={color} size={size} />
            )}
            label="로그아웃"
            onPress={() => {
              dispatch(signout(signoutToken));
            }}
          />
        </Drawer.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default CustomDrawer;
