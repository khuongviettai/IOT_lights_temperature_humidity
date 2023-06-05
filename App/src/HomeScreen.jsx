import React, {useEffect, useState} from 'react';
import {SafeAreaView, Switch, View, Text, Image, Button} from 'react-native';
import light from '../img/light.png';
import DatePicker from 'react-native-date-picker';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const HomeScreen = () => {
  const [enabledLight, setEnabledLight] = useState(null);
  const toggleSwitchLight = () => {
    const updatedState = !enabledLight;
    setEnabledLight(updatedState);
    const lightStatus = updatedState ? 'on' : 'off';
    firebase.database().ref('/').update({led: lightStatus});
  };

  useEffect(() => {
    const lightRef = firebase.database().ref('led');
    const lightListener = lightRef.on('value', snapshot => {
      const lightStatus = snapshot.val();
      const updatedState = lightStatus === 'on';
      setEnabledLight(updatedState);
    });
    return () => {
      lightRef.off('value', lightListener);
    };
  }, []);

  const [countdownCancelled, setCountdownCancelled] = useState(false);

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [countdownDate, setCountdownDate] = useState(null);
  const [countdownDateCancelled, setCountdownDateCancelled] = useState(false);

  useEffect(() => {
    if (date && !countdownDateCancelled) {
      const countdownInterval2 = setInterval(() => {
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        if (diff <= 0) {
          setCountdownDate(null);
          const lightStatus = enabledLight ? 'off' : 'on';
          firebase.database().ref('/').update({led: lightStatus});
          clearInterval(countdownInterval2);
          setCountdownDate(null);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setCountdownDate(`${days}:${hours}:${minutes}:${seconds}`);
        }
      }, 1000);

      return () => {
        clearInterval(countdownInterval2);
      };
    }
  }, [date, countdownDateCancelled]);

  const cancelCountdownDate = () => {
    setCountdownDateCancelled(true);
    setCountdownDate(null);
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={{height: '100%', width: '100%'}}>
        <View style={{height: 50, width: '100%', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Controller ESP32
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: '30%',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 180,
              height: 180,
              width: 180,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: enabledLight ? 'red' : 'white',
            }}>
            <Image source={light} style={{width: 150, height: 150}} />
          </View>
          <Switch
            style={{marginTop: 20}}
            trackColor={{false: '#F5F5F5', true: '#81b0ff'}}
            thumbColor={enabledLight ? '#FFFFF' : '#F5F5F5'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchLight}
            value={enabledLight}
          />
        </View>
        <Text
          style={{
            marginTop: 50,
            marginStart: 20,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Cài đặt thời gian bật tắt đèn
        </Text>

        {/* date */}
        <View
          style={{
            width: '100%',
            marginTop: 30,
            height: 50,
            flexDirection: 'row',
            marginStart: 10,
            flexWrap: 'wrap',
          }}>
          <View>
            <Button title="Set Time" onPress={() => setOpenDate(true)} />
            <DatePicker
              modal
              open={openDate}
              date={date}
              onConfirm={date => {
                setOpenDate(false);
                setDate(date);
                setCountdownDate(null);
                setCountdownDateCancelled(false);
              }}
              onCancel={() => {
                setOpenDate(false);
                cancelCountdownDate();
              }}
            />
          </View>
          {countdownDate !== null && (
            <View style={{marginTop: 8, marginLeft: 50}}>
              <Text style={{fontSize: 12}}>
                Thời gian: {date ? date.toLocaleDateString() : 'Chưa chọn'}
              </Text>
              <Text style={{fontSize: 12}}>Đếm ngược: {countdownDate}</Text>
            </View>
          )}
          {countdownDate !== null && (
            <View style={{marginTop: 8, marginLeft: 50}}>
              <Text style={{color: 'red'}} onPress={cancelCountdownDate}>
                Cancel
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
