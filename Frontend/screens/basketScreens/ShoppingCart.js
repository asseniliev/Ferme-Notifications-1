import Styles from "../../modules/importedStyle";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import Product from "../../components/Product";
import { useSelector } from "react-redux";
import getTotal from "../../modules/GetTotal";

//Composant du ticket
function Totaux(props) {
  return (
    <View style={styles.ticket}>
      <Text style={styles.ticketText}>{props.title} :</Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={styles.ticketText}>
          {props.quantity} x {props.price}
        </Text>
        <Text style={styles.ticketText}>{props.quantity * props.price} €</Text>
      </View>
    </View>
  );
}

export default function ShoppingCart({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) null;

  const shoppingCart = useSelector((state) => state.productCounter.value);

  //Mapping du ticket
  const totaux = shoppingCart.map((data, i) => {
    return (
      <Totaux
        title={data.title}
        quantity={data.quantity}
        price={data.price}
        key={i}
      />
    );
  });

  const products = shoppingCart.map((data, i) => {
    return (
      <Product
        imageUrl={data.imageUrl}
        title={data.title}
        price={data.price}
        priceUnit={data.priceUnit}
        description={data.description}
        id={data.id}
        key={i}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>panier</Text>
      </View>
      <ScrollView style={styles.productContainerContainer}>
        <View style={styles.productContainer}>{products}</View>
        <View style={styles.line}></View>
        <View style={styles.ticketContainer}>{totaux}</View>
      </ScrollView>
      <View style={styles.line}></View>
      <View style={styles.total}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>{getTotal()} €</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[Styles.button, styles.button]}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={Styles.textButton}>Continue shopping</Text>
        </TouchableOpacity>
        {shoppingCart.length !== 0 ? (
          <TouchableOpacity
            style={[Styles.button, styles.button]}
            onPress={() => navigation.navigate("Summary")}
          >
            <Text style={Styles.textButton}>Valider mon panier</Text>
          </TouchableOpacity>
        ) : (
          <View style={[Styles.unclickableButton, styles.button]}>
            <Text style={Styles.textButton}>Valider mon panier</Text>
          </View>
        )}
      </View>
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
    paddingTop: 40,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
  },
  title: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
  },
  productContainerContainer: {
    flex: 1,
    width: "100%",
  },

  productContainer: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 5,
    flexDirection: "row",
    marginHorizontal: 5,
  },
  product: {
    margin: 10,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#ABABAB",
  },
  ticket: {
    flexDirection: "row",
    marginHorizontal: 25,
    width: "100%",
  },
  ticketText: {
    fontSize: 17,
    marginVertical: 5,
    flex: 1,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 22,
    marginVertical: 15,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingBottom: 6,
  },
  button: {
    width: "45%",
  },
});
