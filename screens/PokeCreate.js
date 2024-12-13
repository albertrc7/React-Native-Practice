import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, FlatList, StyleSheet, ImageBackground, Modal, ScrollView, TouchableOpacity} from "react-native";
import { createPokemon, fetchUserPokemons, deletePokemon } from "../services/pokemonServices";

const Imagen1 = require("../assets/wallpaper.jpg");
const Imagen2 = require("../assets/pokeball.jpg");

const PokeCreate = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [showModal, setShowModal] = useState(false);  // Estado para controlar la visibilidad del modal

    // Cargar Pokémon al inicio
    useEffect(() => {
       const loadPokemons = async () => {
    try {
        const userPokemons = await fetchUserPokemons();
        if (Array.isArray(userPokemons)) {
            setPokemons(userPokemons);
        } else {
            console.error("Los datos no son un arreglo válido");
        }
    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }
};


        loadPokemons();
    }, []);

    // Crear un Pokémon
    const handleCreatePokemon = async () => {
        if (name.trim() === "" || type.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const newPokemon = await createPokemon(name, type); // Llamada al servicio
            setPokemons([...pokemons, newPokemon]); // Agregar a la lista local
            setName("");
            setType("");
            setShowModal(false); // Cerrar el modal después de crear el Pokémon
            alert("Pokémon creado con éxito");
        } catch (err) {
            console.error(err.message);
            alert(err.message);
        }
    };

     // Eliminar un Pokémon
     const handleDeletePokemon = async (id) => {
        try {
            await deletePokemon(id); // Llamada al servicio para eliminar el Pokémon
            setPokemons(pokemons.filter(pokemon => pokemon.id !== id)); // Eliminar el Pokémon de la lista local
            alert("Pokémon eliminado con éxito");
        } catch (err) {
            console.error(err.message);
            alert("Error al eliminar el Pokémon.");
        }
    };
    const renderPokemon = ({ item }) => (
        <View style={styles.pokemonContainer}>
            <View style={styles.pokemonInfoContainer}>
                <View>
                <Text style={styles.pokemonText} numberOfLines={1}>
                     <Text style={{ fontWeight: "bold" }}>Nombre: </Text>{item.name}
                </Text>
                <Text style={styles.pokemonText} numberOfLines={1}>
                    <Text style={{ fontWeight: "bold" }}>Tipo: </Text>{item.type}
                </Text>
                </View>
                
                <Button
            title="X"
            onPress={() => handleDeletePokemon(item.id)} 
            color="#FF0000" 
        />
                
            </View>
        </View>
    );
    
    return (
        <ImageBackground source={Imagen1} style={styles.backgroundImage} resizeMode="cover">
            <View style={styles.overlay} />
            <View style={styles.container}>
                <Button 
                    title="Crear Pokémon" 
                    onPress={() => setShowModal(true)} // Mostrar el modal al presionar el botón
                />

                {/* Modal para el formulario de creación */}
                <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowModal(false)} // Cerrar modal al presionar fuera del modal
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContentContainer}>
                            <ImageBackground 
                                source={Imagen2} 
                                style={styles.modalBackground} 
                                resizeMode="cover" // Asegura que la imagen ocupe todo el fondo
                            >
                                <ScrollView contentContainerStyle={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Crear Pokémon</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nombre del Pokémon"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Tipo de Pokémon"
                                        value={type}
                                        onChangeText={setType}
                                    />
                                    
                                    <Button title="Guardar Pokémon" onPress={handleCreatePokemon} />
                                    
                                    <Button title="Cerrar" onPress={() => setShowModal(false)} />
                                </ScrollView>
                            </ImageBackground>
                        </View>
                    </View>
                </Modal>

                <Text style={styles.listTitle}>Pokémon creados:</Text>
                {pokemons.length > 0 ? (
                    <FlatList
                        data={pokemons}
                        keyExtractor={(item) => item.id}
                        renderItem={renderPokemon}
                    />
                ) : (
                    <Text style={styles.noPokemonText}>Aún no has creado ningún Pokémon.</Text>
                )}
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
        justifyContent: "flex-start",
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
        minWidth: '95%',
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: "white",
    },
    listTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 20,
        color: "white",
        textAlign: "center",
    },
    noPokemonText: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    pokemonContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    pokemonInfoContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginRight: "10",
    },
    pokemonText: {
        fontSize: 16,
       
        maxWidth: 250,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Sombra oscura para el fondo del modal
    },
    modalContentContainer: {
        width: "80%", // Ajusta al tamaño del modal
        borderRadius: 10,
        overflow: "hidden", // Para que la imagen no se salga de los bordes
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 50,
    },
  
    modalContent: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Fondo semitransparente para los campos
        padding: 40,
        borderRadius: 10,
        alignItems: "center",
    },
});

export default PokeCreate;
