import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AgregarEquipo = () => {
  const [nombre, setNombre] = useState(""); // nombre
  const [descripcion, setDescripcion] = useState(""); // descripción
  const [puntos, setPuntos] = useState(0); // Cantidad de puntos
  const [golesAFavor, setGolesAFavor] = useState(0); // Cantidad de goles a favor
  const [logo, setLogo] = useState(""); // URL de la imagen

  const handleAgregarEquipo = async () => {
    if (!nombre || !descripcion || !puntos || !golesAFavor) {
      Alert.alert(
        "Error",
        "Falta completar algún campo."
      );
      return;
    }

    try {
      const response = await fetch("http://161.35.143.238:8000/jcerizola", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          description: descripcion,
          goals: golesAFavor,
          points: puntos,
          logo: logo,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor");
      }

      const data = await response.json();
      console.log("Equipo agregado:", data);

      // Resetear los campos al terminar
      setNombre("");
      setDescripcion("");
      setPuntos(0);
      setGolesAFavor(0);
      setLogo("");
      Alert.alert("Éxito", "El equipo ha sido agregado.");
    } catch (error) {
      console.error("Error al agregar el equipo:", error);
      Alert.alert(
        "Error",
        "No se pudo agregar el equipo. Intenta nuevamente."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Agregar Equipo</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del equipo"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripción del equipo"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad de puntos"
          value={puntos}
          onChangeText={setPuntos}
          keyboardType="numeric"
        />
         <TextInput
          style={styles.input}
          placeholder="Cantidad de puntos"
          value={golesAFavor}
          onChangeText={setGolesAFavor}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="URL de la imagen"
          value={logo}
          onChangeText={setLogo}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAgregarEquipo}
        >
          <Text style={styles.botonAgregar}>Agregar Equipo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  moonItem: {
    fontSize: 16,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e6f7ff",
    borderRadius: 5,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonAgregar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    

  }

});

export default AgregarEquipo;
