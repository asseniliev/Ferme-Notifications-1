import backendUrl from "../../modules/backendUrl";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import Product from "../../components/Product";
import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import Styles from "../../modules/importedStyle";
import { getLoggedUser } from "../../modules/isUserLogged";
import nextDeliveryDate from "../../modules/nextDeliveryDate"

export default function Home({ navigation }) {
  const [productList, setProductList] = useState([]);
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });

  const loggedUser = getLoggedUser();

  useEffect(() => {
    fetch(`${backendUrl}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProductList(data.result);
      });
  }, []);

  const products = productList.map((data, i) => {
    return (
      <Product
        imageUrl={data.imageUrl}
        title={data.title}
        price={data.price}
        priceUnit={data.priceUnit}
        description={data.description}
        id={data._id}
        key={i}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {fontsLoaded && (
          <Text style={styles.title}>
            {"  "}ferme de {"\n"} mereynal
          </Text>
        )}
      </View>
      <ScrollView style={styles.productContainerContainer}>
        <View style={styles.carouselContainer}>
          <Carousel />
        </View>
        {loggedUser.accesstoken !== "" ? (
        <View style={styles.nextDeliveryDate}><Text>Prochaine livraison possible le {nextDeliveryDate()}</Text></View>)
        : <></>}
        <View style={styles.productContainer}>
          {products}
        </View>
        {loggedUser.accesstoken !== "" ? (
          <View style={styles.basket}>
            <TouchableOpacity onPress={() => navigation.navigate("Panier")} style={Styles.button} >
              <Text style={Styles.textButton}>Mon panier</Text>
            </TouchableOpacity>
          </View>
        ) : <></>}
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
  },
  title: {
    fontSize: 21,
    color: "#3A7D44",
    fontFamily: "BelweBold",
  },
  productContainerContainer: {
    width: "100%",
  },
  carouselContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  nextDeliveryDate: {
    alignItems: "center",
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

  basket: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
});
