import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_KEY = '002dd05eb941c88b78ce5358f32983bd';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    getWeatherData(city);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./assets/single-tree-early-morning-mist.jpg')}
        style={styles.bgImage}>
        <View style={styles.weatherContainer}>
          <Text style={styles.heading}>Weather Manager</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search city"
              value={city}
              onChangeText={setCity}
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
          {weatherData && (
            <View style={styles.resultContainer}>
              <Text style={styles.cityName}>{city}</Text>
              <Text style={styles.weatherType}>{weatherData.weather[0].main}</Text>
              <View style={styles.tempContainer}>
                <Text style={styles.tempText}>
                  Temp: {weatherData.main.temp}°F
                </Text>
                <Text style={styles.tempText}>
                  Min Temp: {weatherData.main.temp_min}°F
                </Text>
                <Text style={styles.tempText}>
                  Max Temp: {weatherData.main.temp_max}°F
                </Text>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    flex: 2,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
  }, 
  weatherContainer: {
    padding: 20,
    borderColor: 'brown', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    marginTop: 160, 
    margin: 20, 
    borderRadius: 20,  
    justifyContent: 'center', 
  },
  heading: {
    color: 'blue',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16, 
    borderRadius: 10,  
    borderOultineColor: 'blue',  
    borderBottomColor: 'blue', 
    
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E7E7E9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
    flex: 1, 
    fontFamily: 'Roboto', 
    fontWeight: 'bold',
    fontSize: 20, 
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: 'Roboto',
    fontSize: 20, 
    color: 'white', 
    fontWeight: 'bold', 
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',

  },
  resultContainer: { 
    color: 'brown',
    borderRadius: 8,
    padding: 20,
    width: '80%', 
    borderColor: 'brown', 
    
  },
  cityName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'brown',
    marginBottom: 8,
  },
  weatherType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 8,
  },
  tempContainer: {
    alignItems: 'flex-start',
    borderColor: 'yellow',
    color: 'white',
  },
  tempText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default WeatherApp;
