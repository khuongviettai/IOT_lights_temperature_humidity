import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/HomeScreen';
import TemperatureScreen from './src/TemperatureScreen';
import HumidityScreen from './src/HumidityScreen';
import {NavigationContainer} from '@react-navigation/native';
// @ts-ignore
import home from './img/home.png';
// @ts-ignore
import temperature from './img/temperature.png';
// @ts-ignore
import humidity from './img/humidity.png';
// @ts-ignore
import person from './img/person.png';
import InformationScreen from './src/InformationScreen';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Image
                  source={home}
                  style={{tintColor: color, width: size, height: size}}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Temperature"
            component={TemperatureScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Image
                  source={temperature}
                  style={{tintColor: color, width: size, height: size}}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Humidity"
            component={HumidityScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Image
                  source={humidity}
                  style={{tintColor: color, width: size, height: size}}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Info"
            component={InformationScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <Image
                  source={person}
                  style={{tintColor: color, width: size, height: size}}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default App;
