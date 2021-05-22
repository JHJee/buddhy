import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Home = props => {
  const isSignedIn = useSelector(state => state.signin.isSignedIn);
  // const userType = useSelector(state => state.signin.userType);

  return (
    <View style={styles.container}>
      <Header title="홈" />
      <View style={styles.buttonGroupContainer}>
        {isSignedIn ? (
          <Button mode="contained" style={styles.button}>
            마이페이지
          </Button>
        ) : (
          <>
            <Button mode="contained" style={styles.button}>
              로그인
            </Button>
            <Button mode="contained" style={styles.button}>
              회원가입
            </Button>
          </>
        )}
        <Button mode="contained" style={styles.button}>
          고객센터
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonGroupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 20,
    width: '60%',
  },
});
export default Home;
