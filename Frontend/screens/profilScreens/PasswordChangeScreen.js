import backendUrl from "../../modules/backendUrl";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUser } from "../../reducers/users";

export default function UserSignInScreen({ navigation }) {
  const [errorText, setErrorText] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const loggedUser = useSelector(state => state.user.value);

  function handleOnSave() {
    if (password === "") {
      setErrorText("Insert a valid password");
    } else if (repeatPassword === "") {
      setErrorText("Repeat the password");
    } else if (password !== repeatPassword) {
      setErrorText("The two passwords must match");
    } else {
      //console.log(loggedUser);
      const url = `${backendUrl}/users/${loggedUser.id}`;
      const body = {
        password: password
      }
      fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            navigation.navigate("PasswordChangeSuccess");
          } else {
            setErrorText(data.message);
          }
        });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.text}>
            <FontAwesome name="arrow-left" size={24} color="#000000" />
            {"      "} Modifier mot de pass
          </Text>
          <Image source={require("../../assets/fla1.jpg")} style={styles.image} />
        </View>
        <View style={styles.middleSection}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Nouveau mot de pass"
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Répéter le nouveau mot de passe"
            onChangeText={(value) => setRepeatPassword(value)}
            value={repeatPassword}
          />
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() => handleOnSave()}
            style={styles.buttonFull}
          >
            <Text style={styles.textButton}>Sauvegarder</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    flex: 0.5,
    width: "100%",
  },
  middleSection: {
    flex: 0.4,
    width: "100%",
    height: "35%",
    marginVertical: "5%",
    justifyContent: "center",
  },
  bottomSection: {
    flex: 0.2,
    width: "100%",
    height: "5%",
    justifyContent: "center",
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 26,
    lineHeight: 40,
  },
  errorText: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 30,
    color: "red",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    backgroundColor: "#D9D9D9",
    marginLeft: "2%",
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    width: "96%",
    marginBottom: "5%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonHalf: {
    backgroundColor: "#3A7D44",
    marginLeft: "2%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: "5%",
    width: "40%",
    alignItems: "center",
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
