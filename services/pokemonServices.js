import { collection, addDoc, getDocs, query, where,doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Importar la configuración de Firebase

// Función para guardar un Pokémon
export const createPokemon = async (name, type) => {
    const user = auth.currentUser; // Obtener el usuario actual
    if (!user) throw new Error("Usuario no autenticado");

    const newPokemon = {
        name,
        type,
        userId: user.uid, // Agregar el UID del usuario
    };

    try {
        const docRef = await addDoc(collection(db, "pokemons"), newPokemon);
        return { id: docRef.id, ...newPokemon }; // Retornar el Pokémon con el ID
    } catch (err) {
        throw new Error("Error al guardar el Pokémon: " + err.message);
    }
};

// Función para eliminar un Pokémon
export const deletePokemon = async (pokemonId) => {
    try {
        const pokemonRef = doc(db, "pokemons", pokemonId);
        await deleteDoc(pokemonRef);
    } catch (err) {
        throw new Error("Error al eliminar el Pokémon: " + err.message);
    }
};

// Función para obtener los Pokémon del usuario actual
export const fetchUserPokemons = async () => {
    const user = auth.currentUser; // Obtener el usuario actual
    if (!user) throw new Error("Usuario no autenticado");

    try {
        const q = query(
            collection(db, "pokemons"),
            where("userId", "==", user.uid) // Filtrar por UID del usuario
        );
        const querySnapshot = await getDocs(q);

        const pokemons = [];
        querySnapshot.forEach((doc) => {
            pokemons.push({ id: doc.id, ...doc.data() });
        });

        return pokemons;
    } catch (err) {
        throw new Error("Error al cargar los Pokémon: " + err.message);
    }
};
