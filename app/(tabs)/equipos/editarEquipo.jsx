import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function editar() {
  const params = useLocalSearchParams(); // Obtener los parámetros desde la URL
  const { id, name, description, goals, points, logo } = params;
  const router = useRouter();

  const [newName, setNewName] = useState(name || "");
  const [newDescription, setNewDescription] = useState(description || "");
  const [newGoals, setNewGoals] = useState(goals || 0);
  const [newPoints, setNewPoints] = useState(points || 0);
  const [newLogo, setNewLogo] = useState(logo || "");

  const EditarEquipo = async (idEquipo) => {
    try {
      const response = await fetch(
        `http://161.35.143.238:8000/jcerizola/${idEquipo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            description: newDescription,
            goals: newGoals,
            points: newPoints,
            logo: newLogo,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      console.log("Equipo editado:", data);
      Alert.alert("Éxito", "El equipo fue editado con éxito.");
      router.push("/(tabs)/equipos"); 
    } catch (error) {
      console.error("Error al editar el equipo:", error);
      Alert.alert("Error", "No se pudo editar el equipo.");
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Editar Equipo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nuevo Nombre"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva Descripción"
        value={newDescription}
        onChangeText={setNewDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Nuevos Goles"
        value={newGoals}
        onChangeText={setNewGoals}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nuevos Puntos"
        value={newPoints}
        onChangeText={setNewPoints}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva URL del logo"
        value={newLogo}
        onChangeText={setNewLogo}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => EditarEquipo(id)}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.push("/(tabs)/equipos")}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28A745",
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF0000",
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
