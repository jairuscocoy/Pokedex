import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../assets/colors';

const ItemContainer = ({children, type, onPress}) => {
  const backgroundColor = colors[type] || colors.primary;
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.container, {backgroundColor}]}>
      {children}
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 5,
    width: width * 0.9,
    borderRadius: width * 0.02,
    paddingVertical: 10,
    flexDirection: 'row',
  },
});
export default ItemContainer;
