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
import { useNavigation } from "@react-navigation/native";

export default function TelaCadastro() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [saldo, setSaldo] = useState("");

  async function handleCadastro() {
    if (!nome || !cpf || !saldo) {
        Alert.alert("Atenção", "Por favor, preencha todos os campos.");
        return;
    }
    try {
      await api.post("clientes", {
        nome: nome,
        cpf: cpf,
        saldo: parseFloat(saldo.replace(",", ".")), // Converte para número
      });

      Alert.alert("Sucesso!", "Cliente cadastrado com sucesso.");
      navigation.goBack(); // Volta para a tela de lista(listaclientes)
    } catch (error) {
      Alert.alert("Erro no Cadastro", "Não foi possível cadastrar o cliente. Tente novamente.");
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 50}}>
      <Text style={styles.titulo}>Cadastro de Clientes</Text>

      <View style={styles.form}>
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
        
        <Text style={styles.label}>Saldo Inicial</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 50.00"
          value={saldo}
          onChangeText={setSaldo}
          keyboardType="decimal-pad"
          placeholderTextColor="#999"
        />
        
        <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
          <Text style={styles.txtBtn}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e4ff',
    padding: 20,
  },
  titulo:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1d3247ff',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    color: '#333'
  },
  btn:{
    backgroundColor:"#1d3247ff",
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  txtBtn:{
    color: '#ff5100ff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});