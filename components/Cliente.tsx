import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface propCliente {
  id: number;
  nome: String;
  cpf: String;
  saldo: number;
  onDelete?: () => void;
  onEditar?: () => void;
}

export default function Cliente({
  id,
  nome,
  cpf,
  saldo,
  onDelete,
  onEditar,
}: propCliente) {
  return (
    <>
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.nome}>{nome}</Text>
          <Text style={styles.detalhe}>Código: {id}</Text>
          <Text style={styles.detalhe}>CPF: {cpf}</Text>
          <Text style={styles.saldo}>Saldo: R$ {saldo}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.btnEditar]}
            onPress={onEditar}
          >
            <Text style={styles.txtBtn}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnExcluir]}
            onPress={onDelete}
          >
            <Text style={styles.txtBtn}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "column",
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  infoContainer: {
    marginBottom: 15,
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1d3247ff",
    marginBottom: 8,
  },
  detalhe: {
    fontSize: 16,
    color: "#1d3247ff",
    marginBottom: 4,
  },
  saldo: {
    fontSize: 18,
    color: "#1d3247ff",
    fontWeight: "500",
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  btnEditar: {
    backgroundColor: "#1d3247ff",
  },
  btnExcluir: {
    backgroundColor: "#1d3247ff",
  },
  txtBtn: {
    textAlign: "center",
    color: "#ff5100ff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
