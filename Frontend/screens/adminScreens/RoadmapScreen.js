import backendUrl from "../../modules/backendUrl";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import importedStyle from "../../modules/importedStyle";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Order from "../../components/Order";

export default function RoadmapScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [confirmedBasket, setconfirmedBasket] = useState([]);
  const [scudoColor, setScudoColor] = useState({});
  const [ordersByCity, setOrdersByCity] = useState({});
  const [isOpen, setIsOpen] = useState({});
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    fetch(`${backendUrl}/orders`)
      .then((response) => response.json())
      .then((data) => {
        const createdOrders = data.result.filter(
          (order) => order.status === "confirmed"
        );
        setconfirmedBasket(createdOrders);

        // Regroupe les commandes par ville
        const ordersByCity = createdOrders.reduce((acc, order) => {
          const city = order.city;
          if (!acc[city]) {
            acc[city] = [];
          }
          acc[city].push(order);
          return acc;
        }, {});
        setOrdersByCity(ordersByCity);
        setIsLoading(false);

        //Fonction qui crée un objet avec comme clef toutes les id des orders et comme valeur pour toutes les clefs la couleur grise
        const scudoColor = createdOrders.reduce(
          (acc, order) => ({ ...acc, [order._id]: "#ABABAB" }),
          {}
        );
        setScudoColor(scudoColor);

        //Fonction qui crée un objet avec comme clef toutes les id des orders et comme valeur pour toutes les clefs true
        const isVisible = createdOrders.reduce(
          (acc, order) => ({ ...acc, [order._id]: true }),
          {}
        );
        setIsVisible(isVisible);

        //Fonction qui crée un objet avec comme clef toutes les noms des villes et comme valeur pour toutes les clefs false
        const initialToggle = Object.keys(ordersByCity).reduce((acc, city) => {
          acc[city] = false;
          return acc;
        }, {});
        setIsOpen(initialToggle);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  }, [navigation]);

  // Passe le status de la commande à "delivered"
  function handleConfirmed(id) {
    const url = `${backendUrl}/orders/${id}/status`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "delivered" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.result);
          // Met à jour la couleur du scudo pour la commande spécifique
          setScudoColor((prevColors) => ({
            ...prevColors,
            [id]: "#F82D2D",
          }));
        } else {
          console.log("erreur commande non confirmée");
        }
      });
  }

  // Passe le status de la commande à "created"
  function handleCreated(id) {
    const url = `${backendUrl}/orders/${id}/status`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "created" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.result);
          // // Met à jour la couleur du scudo pour la commande spécifique
          // setScudoColor((prevColors) => ({
          //   ...prevColors,
          //   [id]: "#F82D2D",
          // }));
        } else {
          console.log("erreur: status non changé");
        }
      });
  }

  // Affiche une information sur le changement de status de la commande
  function showAlert(id) {
    Alert.alert(
      "Information",
      'Vous venez de réintégrer la commande dans les "à confirmer" ',
      [
        {
          text: "OK",
          onPress: () => {
            console.log("OK appuyé");
            handleCreated(id);
          },
        },
      ],
      { cancelable: false }
    );
  }

  // Change l'étât du toggle des villes de open à close et de close à open
  function toggleCityDetails(city) {
    setIsOpen((prevToggles) => ({
      ...prevToggles,
      [city]: !prevToggles[city],
    }));
  }

  // Change l'état de isVisible de true à false
  function makesDisappear(id) {
    setIsVisible((prevDisappear) => ({
      ...prevDisappear,
      [id]: false,
    }));
  }

  // Rassemble les commandes par ville
  const validatedOrders = Object.entries(ordersByCity).map(([city, orders]) => (
    <View key={city}>
      <TouchableOpacity
        onPress={() => toggleCityDetails(city)}
        style={styles.dropDownButton}
      >
        <Text style={styles.cityTitle}>
          {"  "}
          {city}
        </Text>
        <Text style={[styles.cityTitle, { paddingTop: 6 }]}>
          <AntDesign
            name={isOpen[city] ? "up" : "down"}
            size={30}
            color="#fff"
          />
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {isOpen[city] &&
          orders.map((data, i) => {
            let lastName = "";
            let firstName = "";
            let deliveryAddress = "";
            if (data.user) {
              lastName = data.user.lastName;
              firstName = data.user.firstName;
              deliveryAddress = data.user.deliveryAddress.address;
            }
            if (isVisible[data._id])
              return (
                <View style={styles.orderContainerContainer} key={i}>
                  <View style={styles.orderContainer}>
                    <Order
                      lastName={lastName}
                      firstName={firstName}
                      date={data.date}
                      orderNumber={data.orderNumber}
                      totalAmount={data.totalAmount}
                      isPaid={data.isPaid}
                      items={data.items}
                      deliveryAddress={deliveryAddress}
                      id={data._id}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="truck-delivery"
                        size={50}
                        color={scudoColor[data._id]}
                        style={{ paddingBottom: 30 }}
                        onPress={() => {
                          handleConfirmed(data._id);
                          setScudoColor((prevColors) => ({
                            ...prevColors,
                            [data._id]: "#ABABAB",
                          }));
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="arrow-left-bottom-bold"
                        size={30}
                        color="#ABABAB"
                        onPress={() => {
                          showAlert(data._id);
                          makesDisappear(data._id);
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
          })}
      </ScrollView>
    </View>
  ));

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {"\n"}
          {"\n"}
          {"\n"} Chargement en cours...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {fontsLoaded && (
          <>
            <View style={styles.title1Container}>
              <AntDesign name="caretleft" size={24} color="#F3A712" />
              <Text
                style={styles.title2}
                onPress={() => navigation.navigate("Dashboard")}
              >
                {"  "}tableau{"\n"}
                {"  "}de bord
              </Text>
            </View>
            <Text
              style={styles.title2}
              onPress={() => {
                navigation.navigate("CheckingOrdersScreen")
              }}
            >
              paniers à{"\n"}confirmer
            </Text>
            <Text style={styles.title1}>
              {"  "}Feuille{"\n"}de route
            </Text>
          </>
        )}
      </View>
      <ScrollView>
        {validatedOrders}
        <View style={styles.deliveryButton}>
          <TouchableOpacity
            onPress={() => console.log("clic")}
            style={importedStyle.button}
          >
            <Text style={importedStyle.textButton}>
              Livrer toutes le commandes{" "}
              <MaterialCommunityIcons
                name="truck-delivery"
                size={20}
                color={"#fff"}
              />
            </Text>
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
    paddingTop: 30,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  title1Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title1: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
  },
  title2: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#F3A712",
  },

  cityTitle: {
    fontSize: 30,
    paddingHorizontal: 10,
    height: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  dropDownButton: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "#ABABAB",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  orderContainerContainer: {
    flexDirection: "row",
    width: "100%",
    fontWeight: "bold",
  },
  orderContainer: {
    width: 320,
    paddingLeft: 13,
    paddingRight: 3,
    paddingVertical: 13,
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 70,
  },
  deliveryButton: {
    alignItems: "center",
    width: "100%",
    marginVertical: 30,
  },
});
