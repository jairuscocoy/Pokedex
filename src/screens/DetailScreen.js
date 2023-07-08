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
import {
  getPokemonData,
  getPokemonDescriptions,
} from '../store/reducers/getPokemonData';
import {getEvolution} from '../store/reducers/getEvolution';
import LoadingComponent from '../components/LoadingComponent';
import BaseStatsComponent from '../components/BaseStatsComponent';
import EvolutionComponent from '../components/EvolutionComponent';
import DescriptionComponent from '../components/DescriptionComponent';

const Article = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {pokemonData, pokemonDescription, evolutionData, isLoading, error} =
    useSelector(state => state.pokemonData);
  const [statePokemonData, setStatePokemonData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const {name, types, index, imageUrl} = route.params;
  const backgroundColor = colors[types[0]] || colors.primary;

  const handleTabPress = tabName => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    dispatch(getPokemonData(index));
    dispatch(getEvolution(index));
    dispatch(getPokemonDescriptions(index));
  }, [dispatch]);

  useEffect(() => {
    if (pokemonData) {
      setStatePokemonData(pokemonData);
    }
  }, [pokemonData]);

  const renderTabContent = () => {
    if (activeTab === 0) {
      return (
        <DescriptionComponent
          description={pokemonDescription}
          height={statePokemonData.height}
          weight={statePokemonData.weight}
          type={types[0]}
        />
      );
    } else if (activeTab === 1) {
      return (
        <BaseStatsComponent
          backgroundColor={backgroundColor}
          statePokemonData={statePokemonData}
        />
      );
    } else if (activeTab === 2) {
      return <EvolutionComponent evolutionData={evolutionData} />;
    }
    return null;
  };

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

  const LowerContainer = () => {
    return (
      <View style={styles.lowerContainer}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 0 && styles.activeTab]}
            onPress={() => handleTabPress(0)}>
            <Text style={styles.tabText}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 1 && styles.activeTab]}
            onPress={() => handleTabPress(1)}>
            <Text style={styles.tabText}>Base Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 2 && styles.activeTab]}
            onPress={() => handleTabPress(2)}>
            <Text style={styles.tabText}>Evolution</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContent}>{renderTabContent()}</View>
      </View>
    );
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
    backgroundColor: 'white',
  },

  image: {
    width: width * 0.55,
    height: width * 0.55,
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.24,
  },

  //tabbar

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'blue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContent: {
    padding: 10,
  },
});

export default Article;
