import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ImageBackground } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

const Imagen1 = require("../assets/wallpaper.jpg");

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Inicio de sesión exitoso");
            navigation.navigate("Home");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <ImageBackground source={Imagen1} style={styles.backgroundImage} resizeMode="cover">
          
            <View style={styles.overlay} />

           
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar sesión</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Button title="Iniciar sesión" onPress={handleLogin} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)", 
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "white", 
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: "white", 
    },
    error: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
});

export default LoginScreen;
