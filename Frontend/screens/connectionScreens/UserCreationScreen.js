import backendUrl from "../../modules/backendUrl";

import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserCreationScreen({ navigation }) {
  const [message, setMessage] = useState(
    "New Account is in process of creation"
  );

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`${backendUrl}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          let message = "New account is almost created.\n";
          message += `A mail was sent to mailbox ${data.user.email} :\n`;
          message +=
            "You must click on the provided link to finalize the account activation.";
          setMessage(message);
        } else {
          setMessage(data.error);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text}>
          <FontAwesome name="arrow-left" size={24} color="#000000" />
          {"        "} Account Creation
        </Text>
        <Image source={require("../../assets/fla1.jpg")} style={styles.image} />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.text}>{message}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Log")}
        style={styles.buttonFull}
      >
        <Text style={styles.textButton}>Return to Login Screen</Text>
      </TouchableOpacity>
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
    width: "100%",
  },
  bottomSection: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
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
    backgroundColor: "#3A7D44",
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
