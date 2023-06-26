import backendUrl from "../../modules/backendUrl";

import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCounter } from "../../reducers/productCounter";

export default function OrderEndScreen({ navigation }) {
  const [message, setMessage] = useState("New order is in process of creation");

  const user = useSelector((state) => state.user.value);
  const shoppingCart = useSelector((state) => state.productCounter.value);

  const dispatch = useDispatch();

  useEffect(() => {
    let totalAmount = 0;
    const items = [];

    for (const product of shoppingCart) {
      const id = product.id;
      const title = product.title;
      const qty = product.quantity;
      const price = product.price;
      const priceUnit = product.priceUnit;
      totalAmount += qty * price;
      items.push({
        id: id,
        title: title,
        quantity: qty,
        price: price,
        priceUnit: priceUnit,
      });
    }

    const order = {
      id: user.id,
      city: user.deliveryAddress.city,
      date: Date.now(),
      items: items,
      totalAmount: totalAmount,
    };

    fetch(`${backendUrl}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          let message = `Order No. ${data.order} was created.\n`;
          message += "Thank you for purchasing from Ferme de Meyrenal!";
          setMessage(message);
          dispatch(resetCounter());
        } else {
          setMessage(data.error);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.textTitle}>{"              "} Thank You!</Text>
        <Image
          source={require("../../assets/shoppingBasket.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.text}>
          {message}
          {"\n"}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={styles.buttonFull}
        >
          <Text style={styles.textButton}>Return to Home Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: "5%",
  },
  topSection: {
    flex: 1,
    width: "100%",
  },
  bottomSection: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
  },
  textTitle: {
    fontSize: 30,
    marginBottom: "2%",
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonFull: {
    backgroundColor: "#3a7d44",
    marginLeft: "2%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: "5%",
    width: "90%",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
