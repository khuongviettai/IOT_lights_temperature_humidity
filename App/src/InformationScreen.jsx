import React from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import esp32 from '../img/esp32.png';
import cambien from '../img/cambien.png';

const InformationScreen = () => {
  return (
    <SafeAreaView>
      <View style={{width: '100%', height: '100%'}}>
        <View style={{width: '100%', height: '10%'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 30,
            }}>
            Đề tài 27
          </Text>
        </View>
        <View style={{width: '100%', height: '25%'}}>
          <Text
            style={{
              marginTop: 20,
              marginStart: 10,
              fontWeight: '700',
              fontSize: 16,
            }}>
            Thành viên
          </Text>
          <Text style={{fontSize: 16, marginLeft: 15, marginTop: 10}}>
            19522151: Khương Viết Tài
          </Text>
        </View>
        <View style={{width: '100%', height: '60%'}}>
          <Text
            style={{
              marginStart: 10,
              fontWeight: '700',
              fontSize: 16,
            }}>
            Thiết bị
          </Text>
          <View
            style={{
              width: '95%',
              height: '95%',
              marginStart: 10,
              marginTop: 20,
            }}>
            <ScrollView
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
              }}>
              <View
                style={{flexDirection: 'row', marginTop: 50, marginStart: 40}}>
                <Text>ESP32</Text>
                <Image
                  source={esp32}
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 20,
                    marginBottom: 30,
                  }}
                />
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 50, marginStart: 40}}>
                <Text>Cảm Biến</Text>
                <Image
                  source={cambien}
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 20,
                    marginBottom: 30,
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InformationScreen;
