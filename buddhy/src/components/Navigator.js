import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/drawer/CustomDrawer';

import Home from '../screens/HomeScreen';
import Signin from '../components/Signin';
import Signup from '../components/Signup';
import MyPage from '../screens/MyPageScreen';
import Support from '../screens/SupportScreen';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="홈"
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="홈" component={Home} />
        <Drawer.Screen name="로그인" component={Signin} />
        <Drawer.Screen name="회원가입" component={Signup} />
        <Drawer.Screen name="마이페이지" component={MyPage} />
        <Drawer.Screen name="고객센터" component={Support} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
