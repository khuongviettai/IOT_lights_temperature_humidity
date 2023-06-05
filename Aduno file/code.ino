#include "SHTSensor.h"
#include <WiFi.h>
#include <WiFiClient.h>
#include <FirebaseESP32.h>
#include <Wire.h>


// config firebase
#define FIREBASE_HOST "esp32-44021-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "AIzaSyDNuCke1ZXPAQZ3RxLuqxhMCgF1cUTDyoQ"

// WiFi Credentials
// config wifi 
#define WIFI_SSID "baka"
#define WIFI_PASSWORD "12345678"

// config for shtc3
#define SDA_PIN 21
#define SCL_PIN 22
// config for led
#define LED_PIN 18
#define BUTTON_PIN 4

SHTSensor sht;
FirebaseData firebaseData;
bool ledState = false;
void setup()
{
    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, LOW);
    pinMode(BUTTON_PIN, INPUT_PULLUP);
    Serial.begin(115200);
    Wire.begin();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.reconnectWiFi(true);
    sht.init();
   
}

void loop() {
  sht.readSample();
  float temperature = sht.getTemperature();
  float humidity = sht.getHumidity();

  if (!isnan(temperature) && !isnan(humidity)) {
    uploadDataToFirebase(temperature, humidity);
  } else {
    Serial.println("Failed to read data from SHTC3");
  }

  checkFirebaseCommands();

  delay(2000);
}

void uploadDataToFirebase(float temperature, float humidity) {
  if (Firebase.ready()) {
    if (Firebase.setFloat(firebaseData, "/temperature", temperature) && Firebase.setFloat(firebaseData, "/humidity", humidity)) {
      Serial.println("Data uploaded to Firebase");
    } else {
      Serial.println("Failed to upload data to Firebase");
      Serial.println(firebaseData.errorReason());
    }
  } else {
    Serial.println("Firebase not ready");
  }
}

void checkFirebaseCommands() {
  if (Firebase.ready()) {
    Firebase.getString(firebaseData, "/led");
    if (firebaseData.dataAvailable()) {
      String command = firebaseData.stringData();
      if (command == "on") {
        digitalWrite(LED_PIN, HIGH);
        Serial.println("LED turned on");
      } else if (command == "off") {
        digitalWrite(LED_PIN, LOW);
        Serial.println("LED turned off");
      }
    } else {
      Serial.println("Failed to get LED command from Firebase");
      Serial.println(firebaseData.errorReason());
    }
  } else {
    Serial.println("Firebase not ready");
  }
}