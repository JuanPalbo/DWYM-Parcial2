import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

const DetallesEquipo = () => {
  const params = useLocalSearchParams(); // Obtener los parámetros desde la URL
  const { name, description, goals, points, logo } = params;
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Detalles del Equipo</Text>
        {image && <Image source={{ uri: logo }} style={styles.imagenEquipo} />}
        <Text style={styles.detailText}>
          <Text style={styles.label}>Nombre: </Text>
          {name}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Descripción: </Text>
          {description}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Goles a favor: </Text>
          {goals}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.label}>Puntos: </Text>
          {points}
        </Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.push("/(tabs)/equipos")}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  imagenEquipo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  detailText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  cancelButton: {
    width: "80%",
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

export default DetallesEquipo;
