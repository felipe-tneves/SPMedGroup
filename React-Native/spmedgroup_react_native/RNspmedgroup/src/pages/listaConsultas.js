import React, { Component } from "react";

import { Text, StyleSheet, View, FlatList, TouchableOpacity, AsyncStorage, ImageBackground } from "react-native";

import api from "../services/api";
import Login from "./login";
// import console = require("console");

class ListaConsultas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      token: ""
    };
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.carregarConsultas();
  }

  carregarConsultas = async () => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      const resposta = await api.get('/consulta', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        }
      });
      const dadosDaApi = resposta.data;
      console.warn(dadosDaApi)
      this.setState({ listaConsultas: dadosDaApi });
    } catch (error) {
      alert('ERROR ' + error);
    }
  }

  render() {
    return (

      <View style={styles.main}>
        <ImageBackground style={styles.img}
          source={require("../assets/img/barraLogo.png")} style={styles.img}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Login")
              AsyncStorage.removeItem("userToken")
            }}
          ><Text style={styles.sair}>Sair</Text></TouchableOpacity>
          <View style={styles.duas}>
            <Text style={styles.mainHeaderText}>{"ListaConsulta".toUpperCase()}</Text>
            <View style={styles.mainHeaderLine} />
          </View>
        </ImageBackground>


        <View style={styles.mainBody}>
          <FlatList
            contentContainerStyle={styles.mainBodyConteudo}
            data={this.state.listaConsultas}
            keyExtractor={item => item.id}
            renderItem={this.renderizaItem}
          />
        </View>
      </View>

    );
  }

  renderizaItem = ({ item }) => (
    <View style={styles.flatItemLinha}>



      <View style={styles.flatItemContainer}>

        <Text style={styles.flatItemNomeLista}>Nome do Medico:</Text>
        <Text style={styles.flatItemNome}>{item.idMedicoNavigation.nome}</Text>

        <Text style={styles.flatItemNomeLista}>Situação:</Text>
        <Text style={styles.flatItemNome}>{item.situacao}</Text>

        <Text style={styles.flatItemNomeLista}>Anamnesia:</Text>
        <Text style={styles.flatItemNome}>{item.anamnesia}</Text>

        <Text style={styles.flatItemNomeLista}>Nome do Paciente:</Text>
        <Text style={styles.flatItemNome}>{item.idProntuarioNavigation.nome}</Text>

        <Text style={styles.flatItemNomeLista}>Data da Consulta:</Text>
        <Text style={styles.flatItemNome}>{item.dataCons}</Text>

        <Text style={styles.flatItem}></Text>
        <View style={styles.mainHeaderLineFinal} />
      </View>
    </View>


  );
}

const styles = StyleSheet.create({
  tabNavigatorIconHome: {
    width: 25,
    height: 25,
    tintColor: "#FFFFFF"
  },
  duas:
  {
    display: "flex",
    alignItems: "center",
    marginTop: 50
  },
  img: {
    width: "100%",
    height: 180,
    marginTop: 0,
  },
  // conteúdo da main
  main: {
    flex: 1,
    backgroundColor: "#F1F1F1"
  },
  // cabecalho
  mainHeaderRow: {
    flexDirection: "row"
  },
  mainHeader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  // texto do cabecalho
  mainHeaderText: {
    fontSize: 20,
    letterSpacing: 5,
    color: "#29A9E0",
    fontFamily: "OpenSans-Regular",
  },
  // linha de separacao do cabecalho
  mainHeaderLine: {
    width: 170,
    paddingTop: 10,
    borderBottomColor: "#999999",
    borderBottomWidth: 0.9
  },
  mainHeaderLineFinal: {
    width: 300,
    paddingTop: 10,
    borderBottomColor: "#999999",
    borderBottomWidth: 0.9,
    color: "#29A9E0"
  },
  // corpo do texto
  mainBody: {
    // backgroundColor: "#999999",
    flex: 4,
  },
  // conteúdo da lista
  mainBodyConteudo: {
    paddingTop: 30,
    paddingRight: 50,
    paddingLeft: 50
  },
  flatItemNomeLista: {
    fontSize: 21,
    marginTop: 6,
    fontWeight: "600",
    paddingTop: 4
  },
  flatItemNome: {
    fontSize: 20,
    marginTop: 6,
    marginLeft: 20
  },
  flatItemContainer: {
    marginTop: 20
  },
  sair: {
    fontSize: 20,
    color: "red",
    marginLeft: 350,
    marginTop: 47
  }
});

export default ListaConsultas;