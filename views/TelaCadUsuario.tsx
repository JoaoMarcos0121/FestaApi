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

export default function TelaCadUsuario() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCadastro() {
    if (!nome || !login || !senha) {
        Alert.alert("Atenção", "Por favor, preencha todos os campos.");
        return;
    }
    try {
      await api.post("usuarios", {
        nome: nome,
        login: login,
        senha: senha,
      });

      Alert.alert("Sucesso!", "Usuário cadastrado com sucesso.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro no Cadastro", "Não foi possível cadastrar o usuário. Tente novamente.");
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 50}}>
      <Text style={styles.titulo}>Cadastro de Usuários</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome completo"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#999"
        />
        
        <Text style={styles.label}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o login"
          value={login}
          onChangeText={setLogin}
          placeholderTextColor="#999"
        />
        
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
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