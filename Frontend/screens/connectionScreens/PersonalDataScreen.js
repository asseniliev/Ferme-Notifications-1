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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalData } from "../../reducers/users";

export default function PersonalDataScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorText, setErrorText] = useState("");

  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.user.value);

  useEffect(() => {
    if (loggedUser.accesstoken !== null) {
      setFirstName(loggedUser.firstName);
      setLastName(loggedUser.lastName);
      setPhoneNumber(loggedUser.phoneNumber);
    }

  }, []);

  function handleOnNext() {
    if (lastName === "") {
      setErrorText("Insert a valid last name");
    } else if (firstName === "") {
      setErrorText("Insert a valid first name");
    } else if (phoneNumber === "") {
      setErrorText("Insert a phone number");
    } else {
      const personalData = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      };
      dispatch(setPersonalData(personalData));
      if (loggedUser.accesstoken)
        navigation.navigate("UserModification");
      else
        navigation.navigate("UserCreation");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.topSection}>
          <Text style={styles.text}>
            <FontAwesome name="arrow-left" size={24} color="#000000" />
            {"          "} Détails d'accès
          </Text>
          <Image source={require("../../assets/fla1.jpg")} style={styles.image} />
        </View>
        <View style={styles.middleSection}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(value) => setLastName(value)}
            value={lastName}
          />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(value) => setFirstName(value)}
            value={firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            onChangeText={(value) => setPhoneNumber(value)}
            value={phoneNumber}
          />
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() => handleOnNext()}
            style={styles.buttonFull}
          >
            <Text style={styles.textButton}>Next</Text>
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
    justifyContent: "flex-end",
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
