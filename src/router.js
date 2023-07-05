import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import DetailsScreen from './screens/DetailScreen';
import FeedScreen from './screens/FeedScreen';
import Login from './screens/LoginScreen';
import CustomDrawer from './components/CustomDrawer';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from './components/LoadingComponent';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Pokedex" component={MainStack} />
    </Drawer.Navigator>
  );
}

function Router() {
  const [initialRouteName, setInitialRouteName] = useState('');

  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('@token');
      if (userData) {
        setInitialRouteName('Feed');
      } else {
        setInitialRouteName('Login');
      }
    } catch (error) {
      setInitialRouteName('Login');
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <LoadingComponent />
      ) : (
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Feed"
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Router;
