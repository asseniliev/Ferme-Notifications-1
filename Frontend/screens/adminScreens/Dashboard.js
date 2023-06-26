import backendUrl from "../../modules/backendUrl";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { Badge } from "react-native-elements";
import { useEffect, useState } from "react";
import { getLoggedUser } from "../../modules/isUserLogged";

export default function Dashboard({ navigation }) {
  const loggedUser = getLoggedUser();

  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });

  const [confirmedBasket, setConfirmedBasket] = useState(0);
  const [validedBasket, setValidedBasket] = useState(0);

  useEffect(() => {
    fetch(`${backendUrl}/orders`)
      .then((response) => response.json())
      .then((data) => {
        let confirmedCount = 0;
        let validatedCount = 0;
        data.result.forEach((order) => {
          if (order.status === "created") {
            validatedCount++;
          } else if (order.status === "confirmed") {
            confirmedCount++;
          }
        });
        setConfirmedBasket(confirmedCount);
        setValidedBasket(validatedCount);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {fontsLoaded && <Text style={styles.title}>tableau de bord</Text>}
      </View>
      <ScrollView style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ListOfProducts")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Liste des produits</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                validedBasket !== 0 ? "CheckingOrdersScreen" : "RoadmapScreen"
              )
            }
            style={styles.button}
          >
            <Text style={styles.textButton}>Paniers</Text>
            <Text style={styles.textButton}>
              À confirmer :{"  "}
              <Badge
                value={validedBasket}
                badgeStyle={{ backgroundColor: "red" }}
              />
            </Text>
            <Text style={styles.textButton}>
              Confirmés :{"  "}
              <Badge value={confirmedBasket} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Préparer paniers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Blog</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Map et marchés</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Le manifest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.button}
          >
            <Text style={styles.textButton}>User view</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Dette client</Text>
            <Badge
              value={0}
              containerStyle={{ position: "absolute", top: -4, right: -4 }}
              badgeStyle={{ backgroundColor: "red" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Statistiques</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Modification commande</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.button}
          >
            <Text style={styles.textButton}>Gestion des utilisateurs</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F5F9",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",

    paddingTop: 30,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
  },
  title: {
    fontSize: 21,
    color: "#3A7D44",
    fontFamily: "BelweBold",
  },
  buttonContainer: {
    width: "100%",
  },
  buttons: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 10,
    flexDirection: "row",
    marginHorizontal: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    height: 70,
    backgroundColor: "#3A7D44",
    borderRadius: 10,
    marginHorizontal: 9,
    marginVertical: 5,
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
