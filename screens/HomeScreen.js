// HomeScreen.js
import React from "react";
import { View, Button, Text, StyleSheet, Image } from "react-native";

const Imagen1 = require('../assets/wallpaper.jpg');

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={Imagen1} style={styles.backgroundImage}></Image>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>¿Qué te gustaría hacer?</Text>
            <View style={styles.containerButton}>
            <Button
                title="Registrarme"
                onPress={() => navigation.navigate("Register")}
            />
            <Text></Text>
            <Button
                title="Iniciar sesión"
                onPress={() => navigation.navigate("Login")}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 40,
    },
    containerButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.7
    }
});

export default HomeScreen;
