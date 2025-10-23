import { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Usuario from "../components/Usuario";
import api from "../components/Api";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React from "react";

type UsuarioType = { id: number; nome: string; login: string; senha: string };

type RootStackParamList = {
  Home: undefined;
  ListarUsuario: undefined;
  TelaCadUsuario: undefined;
  TelaEditarUsuario: { usuario: UsuarioType };
};

type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "ListarUsuario"
>;

export default function ListarUsuario() {
  const navigation = useNavigation<NavigationProps>();
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

  async function buscaUsuarios() {
    try {
      const response = await api.get("usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de usuários.");
    }
  }

  function editar(item: UsuarioType) {
    navigation.navigate("TelaEditarUsuario", { usuario: item });
  }

  useFocusEffect(
    React.useCallback(() => {
      buscaUsuarios();
    }, [])
  );

  function confirmarExclusao(id: number, nome: string) {
    Alert.alert(
      "Confirmar Exclusão",
      `Você tem certeza que deseja excluir o usuário "${nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => excluir(id) },
      ]
    );
  }

  async function excluir(id: number) {
    try {
      await api.delete(`usuarios/${id}`);
      Alert.alert("Sucesso", "Usuário excluído com sucesso!");
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch (e: any) {
      Alert.alert("Erro ao excluir", e?.message ?? "Erro desconhecido");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de Usuários</Text>
        <TouchableOpacity
          style={styles.btnCadastrar}
          onPress={() => navigation.navigate("TelaCadUsuario")}
        >
          <Text style={styles.txtBtnCadastrar}>Novo Usuário</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Usuario
            nome={item.nome}
            login={item.login}
            // senha={item.senha}
            id={item.id}
            onDelete={() => confirmarExclusao(item.id, item.nome)}
            onEditar={() => editar(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e4ff",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1d3247ff",
  },
  btnCadastrar: {
    backgroundColor: "#06436bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  txtBtnCadastrar: {
    textAlign: "center",
    fontSize: 18,
    color: "#ff5100ff",
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
});
