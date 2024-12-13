// HomeScreen.js
import React from "react";
import { View, Button, Text, StyleSheet, ImageBackground } from "react-native";

const Imagen1 = require('../assets/wallpaper.jpg');

const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={Imagen1}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>¿Qué te gustaría hacer?</Text>
                <View style={styles.containerButton}>
                    <Button
                        title="Registrarme"
                        onPress={() => navigation.navigate("Register")}
                    />
                    <Text> </Text>
                    <Button
                        title="Iniciar sesión"
                        onPress={() => navigation.navigate("Login")}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1, // La imagen ocupa todo el espacio disponible
        justifyContent: "center", // Centra los elementos en el eje vertical
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Capa semitransparente para oscurecer el fondo
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: "white",
        marginBottom: 40,
    },
    containerButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeScreen;
