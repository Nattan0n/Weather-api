import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const API_KEY = "9cbf6226a3b25f210b469efd448e311b";
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
    const [errorText, setErrorText] = useState("");

    const getWeather = async () => {
        try {
            const trimmed_City = city.trim();
            const response = await axios.get(
                `${BASE_URL}?q=${trimmed_City}&appid=${API_KEY}`
            );
            console.log(response.data);
            const responseData = response.data;
    
            if (!responseData.name) {
                setErrorText("City not found");
                setWeather(null);
                Alert.alert("City not found", "ไม่พบเมืองที่คุณป้อน.");
            } else {
                setErrorText("");
                setWeather(responseData);
            }
        } catch (error) {
            console.error("Error fetching weather data", error);
            setErrorText("Error fetching weather data");
            Alert.alert("Error", "เกิดข้อผิดพลาดขณะดึงข้อมูลสภาพอากาศ กรุณาตรวจสอบว่าคุณป้อนชื่อเมืองหรือประเทศให้ถูกต้อง");
        }
    };
    

    const clearData = () => {
        setCity("");
        setWeather(null);
    };

    return (
        <View>
            <Text style={styles.text}>Weather🌍</Text>
            {/* <Text style={styles.errorText}>{errorText}</Text> */}
            <TextInput
                value={city}
                onChangeText={(newText) => setCity(newText)}
                placeholder=""
                style={styles.container}
            />
            <Button title="Get weather" onPress={getWeather} />
            {weather && (
                <View style={{ marginBottom: 10, marginTop: 50, backgroundColor: '#fff' }}>
                    <Text style={styles.text}>
                        Temperature 🌡️: {Math.round(weather.main.temp - 273.15)} ํC
                    </Text>
                    <Text style={styles.text}>Humidity 💧: {weather.main.humidity}</Text>
                    <Text style={styles.text}>Condition: {weather.weather[0].description}</Text>
                    <Button title="Clear All" color={'red'} onPress={clearData} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        margin: 10,
        fontSize: 20,
    },
    container: {
        width: 300,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    // errorText: {
    //     textAlign: 'center',
    //     margin: 10,
    //     fontSize: 20,
    //     color: 'red',
    // },
});

export default Weather;

