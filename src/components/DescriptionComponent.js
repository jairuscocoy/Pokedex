import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import colors from '../assets/colors';

const DescriptionComponent = ({description, weight, height, type}) => {
  const borderColor = colors[type] || colors.primary;
  const color = colors[type] || colors.primary;
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={[styles.boxContainerRow, {borderColor}]}>
          <Text style={[styles.valueStat, {color}]}>{weight}</Text>
          <Text>weight</Text>
        </View>
        <View style={[styles.boxContainerRow, {borderColor}]}>
          <Text style={[styles.valueStat, {color}]}>{height}</Text>
          <Text>height</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  description: {
    textAlign: 'center',
    color: 'gray',
    marginVertical: 10,
  },

  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  boxContainerRow: {
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    marginBottom: 20,
  },

  valueStat: {
    fontSize: 26,
    fontWeight: '700',
  },
});

export default DescriptionComponent;
