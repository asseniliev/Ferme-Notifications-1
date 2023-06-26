import backendUrl from "../../modules/backendUrl";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Order from "../../components/Order";

export default function CheckingOrders({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [validatedBasket, setValidatedBasket] = useState([]);
  const [circleColor, setCircleColor] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const [reRender, setReRender] = useState(true);

  useEffect(() => {
    fetch(`${backendUrl}/orders`)
      .then((response) => response.json())
      .then((data) => {
        const createdOrders = data.result.filter(
          (order) => order.status === "created"
        );
        setValidatedBasket(createdOrders);
        setIsLoading(false);

        //Fonction qui crée un objet avec comme clef toutes les id des orders et comme valeur pour toutes les clefs true
        const isVisible = createdOrders.reduce(
          (acc, order) => ({ ...acc, [order._id]: true }),
          {}
        );
        setIsVisible(isVisible);

        //Fonction qui crée un objet avec comme clef toutes les id des orders et comme valeur pour toutes les clefs la couleur grise
        const initialColors = createdOrders.reduce(
          (acc, order) => ({ ...acc, [order._id]: "#ABABAB" }),
          {}
        );
        setCircleColor(initialColors);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });

  }, [navigation, reRender]);

  function handleConfirmed(id) {
    const url = `${backendUrl}/orders/${id}/status`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "confirmed" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.result);
          // Met à jour la couleur du cercle pour la commande spécifique
          setCircleColor((prevColors) => ({
            ...prevColors,
            [id]: "#3A7D44",
          }));
        } else {
          console.log("erreur : commande non confirmée");
        }
      });
  }

  function handleCancel(id) {
    const url = `${backendUrl}/orders/${id}/isCancelled`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data.result);
          setReRender(!reRender)
        } else {
          console.log("erreur : commande non supprimée");
        }
      });
  }

  // Change l'état de isVisible de true à false
  function makesDisappear(id) {
    setIsVisible((prevDisappear) => ({
      ...prevDisappear,
      [id]: false,
    }));
  }

  const validatedOrders = validatedBasket.map((data, i) => {
    let lastName = "";
    let firstName = "";
    if (data.user) {
      lastName = data.user.lastName;
      firstName = data.user.firstName;
    }

    function showAlert(id) {
      Alert.alert(
        'Attention !',
        'Êtes-vous sur de vouloir supprimer cette commande ?',
        [
          { text: 'OK', onPress: () => {
            console.log('OK appuyé')
            makesDisappear(data._id)
            handleCancel(id)
            }
          },
          { text: 'Annuler', onPress: () => console.log('Annuler appuyé'), style: 'cancel' }
        ],
        { cancelable: false }
      );
    };

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
            id={data._id}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <AntDesign
              name="checkcircle"
              size={50}
              color={circleColor[data._id]}
              style={{ paddingBottom: 30 }}
              onPress={() => {
                handleConfirmed(data._id);
                setCircleColor((prevColors) => ({
                  ...prevColors,
                  [data._id]: "#ABABAB",
                }));
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
            name="delete"
            size={30}
            color="#ABABAB"
            onPress={() => showAlert(data._id)}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

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
            <Text style={styles.title1}>paniers à{"\n"}confirmer</Text>
            <Text
              style={styles.title2}
              onPress={() => {
                
                navigation.navigate("RoadmapScreen")
                setReRender(!reRender)
              }}
            >
              {"  "}Feuille{"\n"}de route
            </Text>
          </>
        )}
      </View>
      <ScrollView style={styles.ordersList}>{validatedOrders}</ScrollView>
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
  orderContainerContainer: {
    flexDirection: "row",
    width: "100%",
  },
  orderContainer: {
    width: 320,
    paddingLeft: 13,
    paddingRight: 3,
    paddingVertical: 13,
  },
  buttonContainer: {
    //justifyContent: "spaceBetween",
    alignItems: "center",

    paddingTop: 70,
  },
});
