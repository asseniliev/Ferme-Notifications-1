import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";

export default function OrderSummaryScreen({ navigation }) {
  const address = useSelector((state) => {
    if (state.users) return state.users.value.deliveryAddress.address;
    else return "";
  });

  const [payCash, setPayCash] = useState(true);
  const [orderTotal, setOrderTotal] = useState(0);
  const shoppingCart = useSelector((state) => state.productCounter.value);

  useEffect(() => {
    let total = 0;
    for (const product in shoppingCart) {
      total += shoppingCart[product].quantity * shoppingCart[product].price;
    }
    setOrderTotal(total);
  }, [shoppingCart]);

  //Get next Thursday date
  const today = new Date();
  const currentDay = today.getDay();
  const daysUntilThursday = 5 - currentDay + 7;
  let nextThursday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilThursday
  );
  const day = nextThursday.getDate().toString().padStart(2, "0");
  const month = (nextThursday.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
  const year = nextThursday.getFullYear().toString().substr(-4);

  const formattedDate = `${day}/${month}/${year}`;

  function handleOnPlaceOrder() {
    if (payCash) {
      navigation.navigate("Complete");
    } else {
      navigation.navigate("UnderConstruction");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textTitle}>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.navigate("ShoppingCart")}
        >
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{fontSize: 26}}> Order Summary{"             "}</Text>
      </View>
      <View style={styles.topSection}>
        <View style={styles.summaryLine}>
          <Text style={styles.text}>TOTAL</Text>
          <Text style={styles.text}>{orderTotal} €</Text>
        </View>
        <Text style={styles.text}>Delivery Address:</Text>
        <Text style={styles.text}>{address}</Text>
        <View style={styles.summaryLine}>
          <Text style={styles.text}>Planned delivery date: </Text>
          <Text style={styles.text}>{formattedDate}</Text>
        </View>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.text}>Select payment method{"\n"}</Text>
        <RadioButton.Group
          onValueChange={(newValue) => setPayCash(newValue)}
          value={payCash}
        >
          <View style={styles.radioButtonLine}>
            <RadioButton value={false} />
            <Text style={styles.text} onPress={() => setPayCash(false)}>
              Online Payment
            </Text>
          </View>
          <View style={styles.radioButtonLine}>
            <RadioButton value={true} />
            <Text style={styles.text} onPress={() => setPayCash(true)}>
              Cash Payment at Reception
            </Text>
          </View>
        </RadioButton.Group>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => handleOnPlaceOrder()}
          style={styles.buttonFull}
        >
          <Text style={styles.textButton}>Place Order</Text>
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
    paddingTop: "15%",
  },
  
  topSection: {
    flex: 1,
    width: "90%",
    marginLeft: "5%",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  summaryLine: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  middleSection: {
    flex: 1,
    width: "90%",
    marginLeft: "5%",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  radioButtonLine: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bottomSection: {
    flex: 0.6,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowContainer: {
    width: 80,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 40,
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
