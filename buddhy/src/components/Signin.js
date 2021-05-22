import React, { useState } from 'react';

import { useDispatch, useStore } from 'react-redux';
import { signin } from '../redux/signinSlice';
import { useNavigation } from '@react-navigation/native';

import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput as Input, Button, Checkbox } from 'react-native-paper';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [staySignedInEnabled, setStaySignedInEnabled] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const store = useStore();

  if (store.getState().signin.isSignedIn === true) {
    alert('이미 로그인 되어있습니다.');
    navigation.navigate('홈');
  }
  // empty hook states in this page
  const clearStates = () => {
    setEmail('');
    setPassword('');
    setErrorMessage('');
    setStaySignedInEnabled(false);
  };

  // handle login
  const validate = () => {
    if (email && password) {
      // if no filed is empty
      clearStates();
      // dispatch signin action and handle its promise
      dispatch(signin({ email, password })).then(() => {
        if (store.getState().signin.error === null) {
          // if login was successful
          clearStates();
          navigation.navigate('홈');
        } else {
          // if login failed
          setErrorMessage(store.getState().signin.error);
        }
      });
    } else {
      // if form wasn't complete
      setErrorMessage('이메일과 비밀번호를 모두 입력해 주세요');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Icon
            name="return-up-back"
            size={30}
            onPress={() => {
              clearStates();
              navigation.goBack();
            }}
          />
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.labelSection}>
          <Text>부디</Text>
          <Text>로그인</Text>
        </View>
        <View style={styles.formSection}>
          <Input
            mode="outlined"
            label="이메일"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="username@email.com"
          />
          <Input
            mode="outlined"
            label="비밀번호"
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="비밀번호"
            secureTextEntry={true}
          />
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
          <Button
            mode="contained"
            onPress={validate}
            loading={JSON.stringify(store.getState().signin.loading) === true}>
            로그인
          </Button>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Checkbox
              status={staySignedInEnabled ? 'checked' : 'unchecked'}
              onPress={() => {
                setStaySignedInEnabled(!staySignedInEnabled);
              }}
            />
            <Text>자동로그인</Text>
          </View>
          <Text style={{ textDecorationLine: 'underline' }}>
            {'>'} 이메일/비밀번호 찾기
          </Text>
        </View>

        <View style={styles.socialLoginSection}>
          <Button
            mode="contained"
            color="#2DB400"
            onPress={() => alert('Naver')}>
            네이버로 시작하기
          </Button>
        </View>
        <View style={styles.socialLoginSection}>
          <Button
            mode="contained"
            color="#FEE500"
            onPress={() => alert('Kakao')}>
            카카오로 시작하기
          </Button>
        </View>
        <View style={styles.signupSection}>
          <Text style={{ textAlign: 'center' }}>아직 회원이 아니신가요?</Text>
          <Button
            mode="contained"
            onPress={() => {
              clearStates();
              navigation.navigate('회원가입');
            }}>
            회원가입
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: '5%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '3%',
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  labelSection: {
    marginVertical: 20,
    alignItems: 'center',
  },
  formSection: {
    width: '90%',
  },
  socialLoginSection: {
    width: '90%',
    marginTop: 10,
  },
  signupSection: {
    width: '50%',
    marginTop: 30,
  },
});
export default Signin;
