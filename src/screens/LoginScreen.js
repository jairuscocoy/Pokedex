import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors';
import TextinputComponent from '../components/TextinputComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../components/LoadingComponent';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUserName, setErrUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitLogin = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!username) {
      setErrUsername('Please enter your username trainor!');
      isValid = false;
    } else if (username !== 'ash') {
      setErrUsername('Wrong username');
      isValid = false;
    }

    if (!password) {
      setErrorPassword('You forgot to enter your password!');
      isValid = false;
    } else if (password !== 'ash123') {
      setErrorPassword('Wrong password!');
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    if (username === 'ash' && password === 'ash123') {
      // alert('enter!');
      setTimeout(async () => {
        try {
          await AsyncStorage.setItem('@token', username);
          setLoading(false);
          navigation.navigate('Feed');
        } catch (e) {
          setLoading(false);
          alert(e);
        }
      }, 3000);
    } else {
      setLoading(false);
      alert('Wrong credentials! :(');
    }
  };

  const handleUsernameFocus = () => {
    setErrUsername('');
  };
  const handlePasswordFocus = () => {
    setErrorPassword('');
  };
  if (loading) {
    return <LoadingComponent />;
  } else {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Text style={styles.title}> Jairus' Pokedex</Text>
          <Image
            style={styles.logo}
            source={require('../assets/images/pokeball.png')}
            resizeMode="contain"
          />
          <TextinputComponent
            placeholder="Username"
            isSecure={false}
            value={username}
            setValue={setUsername}
            errorMessage={errorUserName}
            onFocus={handleUsernameFocus}
          />
          <TextinputComponent
            placeholder="Password"
            isSecure={true}
            value={password}
            setValue={setPassword}
            errorMessage={errorPassword}
            onFocus={handlePasswordFocus}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              submitLogin();
            }}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: height * 0.08,
  },

  title: {
    color: colors.secondary,
    fontSize: width * 0.08,
    marginBottom: 20,
  },
  logo: {
    width: width * 0.2,
    height: width * 0.2,
    marginBottom: 34,
  },

  button: {
    marginTop: 34,
    backgroundColor: colors.blue,
    width: width * 0.8,
    height: height * 0.06,
    borderWidth: 1,
    borderRadius: width * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginText: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
});
export default LoginScreen;
