import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from "react-navigation";

import ListaConsultas from "./pages/listaConsultas";
import Login from "./pages/login";

const AuthStack = createStackNavigator({ Login });

const ListaConsultasNavigator = createStackNavigator(
    {
        ListaConsultas
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            ListaConsultasNavigator,
            AuthStack
        },
        {
            initialRouteName: "AuthStack"
        }
    )
);