import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const MyPage = props => {
  return (
    <View>
      <Header title="마이페이지" />
      <Text style={{ textAlign: 'center' }}>마이페이지</Text>
    </View>
  );
};

export default MyPage;
