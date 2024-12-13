import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import Ionicons from 'react-native-vector-icons/Ionicons'
import PokeCreate from "./screens/PokeCreate";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de pestañas
const MyTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false, 
                tabBarStyle: { backgroundColor: "red" },
                tabBarActiveTintColor: "white", 
                tabBarInactiveTintColor: "lightgray", 
            }}
        >
            <Tab.Screen name="Inicio"  component={HomeScreen}  options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }} />
           
        </Tab.Navigator>
    );
};

// Navegador principal con Stack
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={MyTabs}
                    options={{
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "red" },
                        headerShown: true,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "red" },
                    }}
                />
                 <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "red" },
                    }}
                />
                 <Stack.Screen
                    name="PokeCreate"
                    component={PokeCreate}
                    options={{
                        headerTintColor: "white",
                        headerTitleAlign: "center",
                        headerStyle: { backgroundColor: "red" },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
