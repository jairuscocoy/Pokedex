import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const InfoPerEvolution = ({index, name, level, imageUrl}) => {
  return (
    <View key={index} style={styles.row}>
      <Text style={styles.cell}>LVL. {level}</Text>
      <Text style={styles.cell}>{name}</Text>
      <View style={styles.imageContainer}>
        <Image source={{uri: imageUrl}} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
    padding: 10,
  },
  cell: {
    flex: 1,
    marginRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#808080',
  },
  image: {
    width: 70,
    height: 70,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#d6d6d6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    padding: 10,
  },
});

export default InfoPerEvolution;
