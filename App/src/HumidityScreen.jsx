import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const HumidityScreen = () => {
  const [humidity, setHumidity] = useState(null);
  useEffect(() => {
    const databaseRef = firebase.database().ref('/');
    const humidityRef = databaseRef.child('humidity');
    const humidityListener = humidityRef.on('value', snapshot => {
      const humidityValue = snapshot.val();
      setHumidity(humidityValue);
    });
    return () => {
      humidityRef.off('value', humidityListener);
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
          value={humidity}
          radius={130}
          inActiveStrokeOpacity={0.5}
          activeStrokeWidth={15}
          title={'%'}
          inActiveStrokeWidth={20}
          progressValueStyle={{fontWeight: 'bold', color: 'black'}}
          activeStrokeSecondaryColor="yellow"
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

export default HumidityScreen;
