import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  id: number;
  nome: string;
  login: string;
  senha: string;
  onDelete: () => void;
  onEditar: () => void;
};

export default function Usuario({ nome, login, senha, onDelete, onEditar }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.detalhe}>Login: {login}</Text>
        <Text style={styles.detalhe}>Senha: {senha}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btnEditar} onPress={onEditar}>
          <Text style={styles.txtBtn}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnExcluir} onPress={onDelete}>
          <Text style={styles.txtBtn}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
shadowRadius: 3,
elevation: 3,
},
infoContainer: {
marginBottom: 10,
},
nome: {
fontSize: 18,
fontWeight: 'bold',
color: '#1d3247ff',
marginBottom: 5,
},
detalhe: {
fontSize: 14,
color: '#666',
marginBottom: 3,
},
buttonContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginTop: 10,
},
btnEditar: {
backgroundColor: '#06436bff',
flex: 1,
padding: 10,
borderRadius: 8,
marginRight: 5,
},
btnExcluir: {
backgroundColor: '#d32f2f',
flex: 1,
padding: 10,
borderRadius: 8,
marginLeft: 5,
},
txtBtn: {
color: '#fff',
textAlign: 'center',
fontWeight: 'bold',
fontSize: 14,
},
});