import { useState, useEffect } from "react";
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
import Cliente from "../components/Cliente";
import api from "../components/Api";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React from "react";

type ClienteType = { id: number; nome: string; cpf: string; saldo: number };

export default function ListarClientes() {
  const navigation = useNavigation<NavigationProps>();
  const [clientes, setCliente] = useState<ClienteType[]>([]);

  async function buscaClientes() {
    try {
      const response = await api.get("clientes");
      setCliente(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      Alert.alert("Erro", "Não foi possível carregar a lista de clientes.");
    }
  }
  
  type RootStackParamList = {
    Home: undefined;
    ListarClientes: undefined;
    TelaCad: undefined;
    TelaEditarCliente: { cliente: ClienteType };
  };

  type NavigationProps = NativeStackNavigationProp<RootStackParamList, "ListarClientes">;

  function editar(item: ClienteType) {
    navigation.navigate("TelaEditarCliente", { cliente: item });
  }
  
  // useFocusEffect é chamado toda vez que a tela entra em foco
  useFocusEffect(
    React.useCallback(() => {
      buscaClientes();
    }, [])
  );

  function confirmarExclusao(id: number, nome: string) {
    Alert.alert(
      "Confirmar Exclusão",
      `Você tem certeza que deseja excluir o cliente "${nome}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => excluir(id) },
      ]
    );
  }

  async function excluir(id: number) {
    try {
      await api.delete(`clientes/${id}`);
      Alert.alert("Sucesso", "Cliente excluído com sucesso!");
      // atualiza a lista sem precisar de nova chamada a api
      setCliente(clientes.filter(cliente => cliente.id !== id));
    } catch (e: any) {
      Alert.alert("Erro ao excluir", e?.message ?? "Erro desconhecido");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Lista de Clientes</Text>
        <TouchableOpacity
          style={styles.btnCadastrar}
          onPress={() => navigation.navigate("TelaCad" as never)}
        >
          <Text style={styles.txtBtnCadastrar}>Novo Cliente</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={clientes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Cliente
            nome={item.nome}
            cpf={item.cpf}
            saldo={item.saldo}
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
    borderBottomColor: '#e3e3e4ff',
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
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
});