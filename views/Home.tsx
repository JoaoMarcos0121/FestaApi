import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Controlador de Festa</Text>
      <Text style={styles.subtitulo}>Gerencie seus clientes</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("ListarClientes" as never)}
        >
          <Text style={styles.txtBtn}>Gerenciar Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnSecundario]} // Estilo diferente para o segundo botão
          onPress={() => navigation.navigate("Usuario" as never)}
        >
          <Text style={styles.txtBtn}>Usuários</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3e3e4ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1d3247ff",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 18,
    color: "#1d3247ff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
  },
  btn: {
    backgroundColor: "#1d3247ff",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  btnSecundario: {
    backgroundColor: "#0f4d52ff",
  },
  txtBtn: {
    textAlign: "center",
    fontSize: 20,
    color: "#ff5100ff",
    fontWeight: "bold",
  },
});