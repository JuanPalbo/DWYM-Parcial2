import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";

const MostrarPlanetas = () => {
  const [planetas, setEquipos] = useState([]);
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;

  const fetchEquipos = async () => {
    try {
      const response = await fetch("http://161.35.143.238:8000/jcerizola");
      if (!response.ok) {
        throw new Error("Error en la petición");
      }
      const data = await response.json();
      setEquipos(data.results || data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEquipos();
  }, []);

  const EliminarEquipo = async (id) => {
    try {
      const response = await fetch(`http://161.35.143.238:8000/jcerizola/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error en la petición");
      }
      const data = await response.json();
      console.log("Equipo eliminado:", data);

      setEquipos((prevEquipos) => prevEquipos.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error al eliminar el planeta:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetch("http://161.35.143.238:8000/jcerizola")
        .then((response) => response.json())
        .then((data) => setEquipos(data.results || data))
        .catch((error) => console.error(error));
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <FlatList
          data={planetas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <TouchableOpacity
                style={styles.botonEquipo}
                onPress={() =>
                  router.navigate({
                    //ir a detalles
                    pathname: "/(tabs)/equipos/detallesEquipo",
                    params: item,
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.imagenEquipo}
                />
                <Text style={styles.textoEquipo}>{item.name}</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    router.navigate({
                      //ir a editar
                      pathname: "/(tabs)/equipos/editarEquipo",
                      params: item,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  //elimina el equipo
                  onPress={() => EliminarEquipo(item.id)}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
    alignSelf: "center",
    padding: 20,
  },
  tarjeta: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  botonEquipo: {
    alignItems: "center",
    marginBottom: 10,
  },
  planetImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  textoEquipo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#FF0000",
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MostrarPlanetas;
