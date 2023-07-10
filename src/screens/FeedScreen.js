import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPokemon} from '../store/reducers/fetchPokemon';
import {fetchMorePokemon} from '../store/reducers/fetchMorePokemon';
import LoadingComponent from '../components/LoadingComponent';
import ItemRendered from '../components/ItemRendered';
const Feed = () => {
  const [offset, setOffset] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {pokemonList, isLoading, isLoadingMore, error} = useSelector(
    state => state.pokemon,
  );

  useEffect(() => {
    loadPokemon();
  }, []);
  const loadPokemon = useCallback(() => {
    dispatch(fetchPokemon(offset));
  }, []);

  const loadMorePokemon = useCallback(() => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    dispatch(fetchMorePokemon(newOffset));
  }, [offset]);

  useEffect(() => {
    setOffset(0);
  }, [isRefreshing]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderItem = ({item}) => (
    <ItemRendered
      key={item.id}
      name={item.name}
      index={item.id}
      types={item.types}
      imageUrl={item.imageUrl}
    />
  );

  const renderFooter = () => {
    if (isLoadingMore) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return null;
    }
  };

  const handleListRefresh = () => {
    setIsRefreshing(true);
    dispatch(fetchPokemon(0));
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={item => item}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.1}
        refreshControl={<RefreshControl onRefresh={handleListRefresh} />}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Feed;
