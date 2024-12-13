import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ImageBackground } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Imagen1 = require("../assets/wallpaper.jpg");

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Usuario registrado correctamente");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <ImageBackground source={Imagen1} style={styles.backgroundImage} resizeMode="cover">
          
            <View style={styles.overlay} />
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
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
            <Button title="Registrar" onPress={handleRegister} />
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
    error: { color: "red", marginBottom: 10 },
    backgroundImage: { flex: 1, justifyContent: "center"},
    overlay: { ...StyleSheet.absoluteFillObject,backgroundColor: "rgba(0, 0, 0, 0.3)"},
    container: { flex: 1, justifyContent: "center", padding: 20},
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "white"},
    input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5, backgroundColor: "white"},
    error: { color: "red", marginBottom: 10, textAlign: "center"},
});

export default RegisterScreen;
