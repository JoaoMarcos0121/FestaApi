import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import api from "../components/Api";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  ListarClientes: undefined;
  TelaCad: undefined;
  TelaEditarCliente: {
    cliente: { id: number; nome: string; cpf: string; saldo: number };
  };
};

type EditarClienteRouteProp = RouteProp<
  RootStackParamList,
  "TelaEditarCliente"
>;

export default function TelaEditarCliente() {
  const route = useRoute<EditarClienteRouteProp>();
  const navigation = useNavigation();

  const { cliente } = route.params;

  const [id, setId] = useState(String(cliente?.id ?? ""));
  const [nome, setNome] = useState(cliente?.nome ?? "");
  const [cpf, setCpf] = useState(cliente?.cpf ?? "");
  const [saldo, setSaldo] = useState(String(cliente?.saldo ?? ""));

  async function handleEditar() {
    if (!nome || !cpf || !saldo) {
      Alert.alert("Atenção", "Todos os campos devem ser preenchidos.");
      return;
    }
    try {
      await api.put(`clientes/${id}`, {
        nome: nome,
        cpf: cpf,
        saldo: parseFloat(saldo.replace(",", ".")),
      });
      Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o cliente.");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 50,
      }}
    >
      <Text style={styles.titulo}>Editar Cliente</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Código</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={id}
          editable={false}
        />

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome completo"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Saldo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 50.00"
          value={saldo}
          onChangeText={setSaldo}
          keyboardType="decimal-pad"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.btn} onPress={handleEditar}>
          <Text style={styles.txtBtn}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 20,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
    color: "#2c3e50",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 18,
    color: "#333",
  },
  inputDisabled: {
    backgroundColor: "#e9ecef",
    color: "#888",
  },
  btn: {
    backgroundColor: "#1d3247ff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  txtBtn: {
    color: "#ff5100ff",
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
