import {View} from 'react-native';
import React from 'react';
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
