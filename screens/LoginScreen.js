import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ImageBackground } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

const Imagen1 = require("../assets/wallpaper.jpg");

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const errorMessages = {
        "auth/email-already-in-use": "El correo electrónico ya está en uso. Por favor, intenta con otro.",
        "auth/invalid-email": "El correo electrónico ingresado no es válido. Verifica y vuelve a intentarlo.",
        "auth/weak-password": "La contraseña es demasiado débil. Intenta con una más segura.",
        "auth/user-not-found": "No se encontró una cuenta con ese correo electrónico. ¿Deseas registrarte?",
        "auth/wrong-password": "La contraseña ingresada es incorrecta.",
        
    };
    

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Inicio de sesión exitoso");
            navigation.navigate("PokeCreate");
        } catch (err) {
            
            const errorMessage = errorMessages[err.code] || "Ocurrió un error inesperado. Intenta nuevamente.";  // Mapeo del código de error
            setError(errorMessage);  // Establecer el mensaje de error
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
