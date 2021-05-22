import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/signupSlice';
import { useNavigation } from '@react-navigation/native';

import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput as Input, Button, Checkbox } from 'react-native-paper';

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.signup);

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [firstTermsAccepted, setFirstTermsAccepted] = useState(false);
  const [secondTermsAccepted, setSecondTermsAccepted] = useState(false);
  const [thirdTermsAccepted, setThirdTermsAccepted] = useState(false);

  const clearStates = () => {
    setEmail('');
    setPassword1('');
    setPassword2('');
    setErrorMessage('');
  };
  const validate = () => {
    console.log('SELECTOR: ' + selector.hasUniqueNickname);
    if (email && password1 && password2) {
      // if no filed is empty
      clearStates();
      // dispatch signin action and handle its promise
      dispatch(signup({ email, password1, password2 })).then(() => {
        if (selector.error === null) {
          // if signup was successful
          clearStates();
          // navigation.navigate('홈');
          // setErrorMessage('signup successful');
        } else {
          // if signup failed
          setErrorMessage(selector.error.email);
        }
      });
    } else {
      // if form wasn't complete
      setErrorMessage('이메일과 비밀번호를 모두 입력해 주세요');
    }
  };
  return (
    <View style={styles.container}>
      {/* Page Header*/}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon
            name="return-up-back"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.headerCenter}>
          <Text style={{ fontSize: 17 }}>회원가입</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={{ fontSize: 10, color: 'white' }}>회원가입</Text>
        </View>
      </View>
      {/* Page Content */}
      <View style={styles.content}>
        <View style={styles.horizontalInputWrapper}>
          <View style={styles.textInput}>
            <Input
              mode="outlined"
              label="아이디(이메일)"
              placeholder="username@email.com"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputButton}>
            <Button mode="contained">중복확인</Button>
          </View>
        </View>
        <Text> </Text>
        <View style={styles.verticalInputWrapper}>
          <View>
            <Input
              mode="outlined"
              label="비밀번호"
              placeholder="영문과 숫자 포함 8자 이상"
              secureTextEntry={true}
              value={password1}
              onChangeText={text => setPassword1(text)}
            />
          </View>
          <View>
            <Input
              mode="outlined"
              label="비밀번호 확인"
              placeholder="영문과 숫자 포함 8자 이상"
              secureTextEntry={true}
              value={password2}
              onChangeText={text => setPassword2(text)}
            />
          </View>
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>
        <View style={styles.horizontalInputWrapper}>
          <View style={{ width: '30%' }}>
            <Input mode="outlined" label="이름" placeholder="실명" />
            <Text> </Text>
          </View>
          <View style={{ width: '40%' }}>
            <Input
              mode="outlined"
              label="닉네임"
              placeholder="닉네임이 실명 대신 노출됩니다."
            />
            <Text> </Text>
          </View>
          <View style={{ width: '20%' }}>
            <Button mode="contained" style={{ fontSize: 2 }}>
              닉네임 중복확인
            </Button>
          </View>
        </View>
        <View style={styles.horizontalInputWrapper}>
          <View style={styles.textInput}>
            <Input mode="outlined" placeholder="010-0000-0000" />
          </View>
          <View style={styles.inputButton}>
            <Button mode="contained" titleStyle={{ fontSize: 13 }}>
              인증번호 발송
            </Button>
          </View>
        </View>
        <View style={styles.horizontalInputWrapper}>
          <View style={styles.textInput}>
            <Input
              mode="outlined"
              errorStyle={{ color: 'red' }}
              errorMessage={errorMessage ? errorMessage : ''}
            />
          </View>
          <View style={styles.inputButton}>
            <Button mode="contained" titleStyle={{ fontSize: 13 }}>
              인증번호 확인
            </Button>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Checkbox
            status={firstTermsAccepted ? 'checked' : 'unchecked'}
            onPress={() => {
              setFirstTermsAccepted(!firstTermsAccepted);
            }}
          />
          <Text>서비스 이용약관 동의(필수)</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Checkbox
            status={secondTermsAccepted ? 'checked' : 'unchecked'}
            onPress={() => {
              setSecondTermsAccepted(!secondTermsAccepted);
            }}
          />
          <Text>개인정보 이용 및 수집 동의(필수)</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Checkbox
            status={thirdTermsAccepted ? 'checked' : 'unchecked'}
            onPress={() => {
              setThirdTermsAccepted(!thirdTermsAccepted);
            }}
          />
          <Text>제 3자 제공 마케팅 동의(선택)</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ width: '95%' }}>
          <Button mode="contained" onPress={validate} loading={false}>
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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '3%',
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  horizontalInputWrapper: {
    flexDirection: 'row',
  },
  textInput: {
    width: '70%',
    height: '100%',
  },
  inputButton: {
    width: '30%',
    height: '100%',
  },
  verticalInputWrapper: {
    flexDirection: 'column',
    width: '70%',
  },
  headerLeft: {},
  headerCenter: {},
  headerRight: {},
  footer: {
    backgroundColor: 'white',
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Signup;
