import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const TemperatureScreen = () => {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    const databaseRef = firebase.database().ref('/');
    const temperatureRef = databaseRef.child('temperature');
    const temperatureListener = temperatureRef.on('value', snapshot => {
      const temperatureValue = snapshot.val();
      setTemperature(temperatureValue);
    });
    return () => {
      temperatureRef.off('value', temperatureListener);
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View>
        <CircularProgress
          value={temperature}
          radius={130}
          inActiveStrokeOpacity={0.5}
          activeStrokeWidth={15}
          title={'°C'}
          inActiveStrokeWidth={20}
          progressValueStyle={{fontWeight: 'bold', color: 'black'}}
          activeStrokeSecondaryColor="red"
          inActiveStrokeColor="white"
          duration={5000}
          dashedStrokeConfig={{
            count: 50,
            width: 4,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TemperatureScreen;
