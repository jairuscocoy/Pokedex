import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEvolution} from '../store/reducers/getEvolution';
import LoadingComponent from '../components/LoadingComponent';
import InfoPerEvolution from './InfoPerEvolution';

const EvolutionComponent = ({evolutionData}) => {
  const EvolutionPerLevel = () => {
    return evolutionData?.map((data, index) => (
      <InfoPerEvolution
        index={index}
        name={data.species}
        imageUrl={data.spriteURL}
        level={data.level}
      />
    ));
  };
  return (
    <View>
      <EvolutionPerLevel />
    </View>
  );
};

export default EvolutionComponent;
