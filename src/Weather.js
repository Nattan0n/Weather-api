import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    const API_KEY = "9cbf6226a3b25f210b469efd448e311b";
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

    const getWeather = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}?q=${city}&appid=${API_KEY}`
            );
            console.log(response.data);
            setWeather(response.data);
        }catch (error) {
            console.error("Error fetching weather data",error);
        }
    };

    return(
        <View>
            <Text style={styles.text}>Weather🌍</Text>
            <TextInput 
                value={city}
                onChangeText={(newText)=>setCity(newText)}
                placeholder=''
                style={styles.container}
            />
            <Button title='Get weather' onPress={getWeather}/>
            {weather && (
                <View style={{marginBottom:10 ,marginTop:50 , backgroundColor:'#fff',}}>
                    <Text style={styles.text}>
                        Temperature 🌡️: {Math.round(weather.main.temp - 273.15)} ํC
                    </Text>
                    <Text style={styles.text}>Humidity 💧: {weather.main.humidity}</Text>
                    <Text style={styles.text}>Condition: {weather.weather[0].description}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        textAlign:'center',
        margin:10,
        fontSize:20,
    },
    container:{
        width:300,
        borderRadius:5,
        borderWidth:2 ,
        borderColor:"#000",
        backgroundColor:'#fff',
        padding:10,
        marginBottom:10,
        textAlign: 'center',
    },
});

export default Weather;