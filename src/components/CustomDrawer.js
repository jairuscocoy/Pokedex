import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import colors from '../assets/colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const logout = async () => {
    await AsyncStorage.removeItem('@token');
    navigation.replace('Login');
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../assets/images/ghost.png')}
          resizeMode="contain"
        />
        <Text style={styles.name}>Hi Jairus!</Text>
      </View>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={() => {
          logout();
        }}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    height: height * 0.3,
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: height * 0.1,
  },
  logo: {
    width: width * 0.09,
    height: width * 0.09,
  },
  name: {
    color: 'white',
    fontSize: width * 0.05,
    paddingTop: 12,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: height * 0.2,
    left: width * 0.27,
  },
  logout: {
    color: 'red',
    fontSize: width * 0.04,
  },
});

export default CustomDrawer;
