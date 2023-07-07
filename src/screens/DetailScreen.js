import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../assets/colors';
import {useRoute} from '@react-navigation/native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

import {useDispatch, useSelector} from 'react-redux';
import {getPokemonData} from '../store/reducers/getPokemonData';
import * as Progress from 'react-native-progress';
import LoadingComponent from '../components/LoadingComponent';

const Article = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [statePokemonData, setStatePokemonData] = useState([]);
  const {pokemonData, isLoading, error} = useSelector(
    state => state.pokemonData,
  );
  const {name, types, index, imageUrl} = route.params;
  const backgroundColor = colors[types[0]] || colors.primary;

  useEffect(() => {
    dispatch(getPokemonData(index));
  }, [dispatch]);

  useEffect(() => {
    if (pokemonData) {
      setStatePokemonData(pokemonData);
    }
  }, [pokemonData]);

  const TypeContainer = () => {
    return (
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        {types.map(type => (
          <View style={styles.typeContainer}>
            <Text style={styles.type}>{type}</Text>
          </View>
        ))}
      </View>
    );
  };

  const ImageContainer = () => {
    return (
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.image}
      />
    );
  };
  const UpperContainer = () => {
    return (
      <View style={[styles.container, {backgroundColor}]}>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.pop()}>
          <ArrowLeftIcon size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.upperContainer1}>
          <Text style={styles.name}> {name}</Text>
          <Text style={styles.name}>#{index}</Text>
        </View>
        <TypeContainer />
        <ImageContainer />
      </View>
    );
  };

  const BaseStatsComponent = () => {
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
  };

  const LowerContainer = () => {
    return <View style={styles.lowerContainer}>{<BaseStatsComponent />}</View>;
  };
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <ScrollView style={{flex: 1}}>
      <UpperContainer />
      <LowerContainer />
    </ScrollView>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    height: height * 0.5,
    // paddingTop: height * 0.07,
  },

  upperContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },

  name: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: width * 0.07,
  },

  type: {
    color: 'white',
  },
  typeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',

    marginRight: 20,
    padding: 12,
    borderRadius: 50,
  },

  lowerContainer: {
    flex: 1,
    height: height * 0.5,
  },

  image: {
    width: width * 0.55,
    height: width * 0.55,
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.24,
  },

  //BaseStatcontainer

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

export default Article;
