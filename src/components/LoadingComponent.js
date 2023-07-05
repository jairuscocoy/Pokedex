import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../assets/colors';

const LoadingComponent = () => {
  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color={colors.blue} />
      <Text style={{alignSelf: 'center', color: 'white', marginTop: 20}}>
        Loading...
      </Text>
    </View>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    width,
    height,
  },
});

export default LoadingComponent;
