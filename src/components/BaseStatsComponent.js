import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {memo} from 'react';
import * as Progress from 'react-native-progress';

const BaseStatsComponent = memo(({statePokemonData, backgroundColor}) => {
  return statePokemonData.stats?.map(stat => (
    <View style={styles.BaseStatsContainer}>
      <View style={styles.row} key={stat.stat.name}>
        <Text style={styles.statName}>{stat.stat.name}</Text>
        <Text style={styles.statScore}>{stat.base_stat}</Text>
        <Progress.Bar
          progress={stat.base_stat / 100}
          width={200}
          color={backgroundColor}
          unfilledColor="#d4d4d4"
          borderWidth={0}
        />
      </View>
    </View>
  ));
});

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  BaseStatsContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statName: {
    flex: 1,
    marginRight: 8,
    textAlign: 'right',
    textTransform: 'uppercase',
    fontSize: width * 0.03,
    fontWeight: '700',
    color: '#808080',
  },
  statScore: {
    width: 40,
    marginRight: 8,
    textAlign: 'right',
  },
});

export default BaseStatsComponent;
