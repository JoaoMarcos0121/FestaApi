import * as React from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./views/Home";
import ListarClientes from "./views/ListaClientes";
import TelaCad from "./views/TelaCadastro";
import TelaEditarCliente from "./views/TelaEditarCliente";
import TelaEditarUsuario from "./views/TelaEditarUsuario";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Início",
        headerTitleAlign: "center",
      },
    },
    ListarClientes: {
      screen: ListarClientes,
      options: {
        title: "Clientes Cadastrados",
        headerTitleAlign: "center",
      },
    },
    TelaCad: {
      screen: TelaCad,
      options: {
        title: "Novo Cliente",
        headerTitleAlign: "center",
      },
    },
    TelaEditarCliente: {
      screen: TelaEditarCliente,
      options: {
        title: "Editar Cliente",
        headerTitleAlign: "center",
      },
    },
    TelaEditarUsuario: {
      screen: TelaEditarUsuario,
      options: {
        title: "Usuários",
        headerTitleAlign: "center",
      },
    },
  },
  screenOptions: {
    headerStyle: {
      backgroundColor: "#1d3247ff",
    },
    headerTintColor: "#ff5100ff",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 18,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
