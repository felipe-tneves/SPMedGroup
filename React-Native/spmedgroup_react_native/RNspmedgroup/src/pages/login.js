import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Image
} from "react-native";

import api from "../services/api";

class Login extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);
        this.state = { email: "", senha: "" };
    }

    realizaLogin = async () =>{
        const resposta = await api.post("/login", {
            email: this.state.email,
            senha: this.state.senha
        });

        let token = resposta.data.token;
        await AsyncStorage.setItem("userToken", token);
        this.props.navigation.navigate("ListaConsultasNavigator");
    };

    render(){
        return(
            <View style={styles.main}>
              <Image source={require("../assets/img/barraLogo.png")} style={styles.barraLogo}></Image>
              <Text style={styles.titulo}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={email => this.setState({ email })}
              // defaultValue="a@a.a"
            />
  
            <TextInput
              style={styles.input}
              placeholder="senha"
              password="true"
              secureTextEntry={true}
              type="password"
              onChangeText={senha => this.setState({ senha })}
              // defaultValue="123"
            />
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={this.realizaLogin}
            >
              <Text style={styles.btnLoginText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(183, 39, 255, 0.79)"
    },
    barraLogo:{
      width: "100%",
      height: 200,
      marginTop: 0,
      marginBottom: 10
    },
    titulo:{
      fontSize: 25,
      color: "#29A9E0"
    },
    main: {
      width: "100%",
      height: "100%",
      alignContent: "center",
      alignItems: "center"
    },
    btnLogin: {
      height: 38,
      elevation: 3, // Android
      width: 240,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#FFFFFF",
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
    },
    btnLoginText: {
      fontSize: 15,
      fontFamily: "Myriad Pro",
      color: "#29A9E0",
      letterSpacing: 4
    },
    
    input: {
      borderWidth: 2,
      borderRadius: 5,
      borderColor: "#29A9E0",
      marginTop: 20,
      width: 270,
      marginBottom: 20,
      fontSize: 15,
      paddingLeft: 20
    }
  });

  export default Login;