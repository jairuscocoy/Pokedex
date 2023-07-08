import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import React from 'react';
import ItemContainer from './ItemContainer';
import {useNavigation} from '@react-navigation/native';

const ItemRendered = ({index, name, types, imageUrl}) => {
  const navigation = useNavigation();
  const TypeComponent = () => {
    return (
      <View style={styles.typeContainer}>
        <Text style={styles.typeText}>Type:</Text>
        <View style={styles.typeRow}>
          {types.map(type => (
            <Text style={styles.typeName}>{type}</Text>
          ))}
        </View>
      </View>
    );
  };

  const GoToDetails = index => {
    navigation.navigate('Details', {
      name: name,
      types: types,
      index: index + 1,
      imageUrl: imageUrl,
    });
  };
  return (
    <ItemContainer type={types[0]} onPress={() => GoToDetails(index)}>
      <View style={{flex: 2, alignItems: 'center'}}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{width: 100, height: 100}}
        />
      </View>
      <View style={{flex: 3}}>
        <Text style={styles.name}>{name}</Text>
        <TypeComponent />
      </View>
    </ItemContainer>
  );
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  name: {
    color: 'white',
    fontSize: width * 0.04,
    textTransform: 'uppercase',
    fontWeight: '700',
  },

  typeText: {
    fontWeight: '700',
    marginVertical: 5,
    color: 'white',
  },
  typeRow: {
    flexDirection: 'row',
  },

  typeName: {
    marginRight: 10,
    color: 'white',
  },
});

export default ItemRendered;
