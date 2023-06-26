import backendUrl from "../../modules/backendUrl"

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";
import { useFonts } from "expo-font";
import { AntDesign } from '@expo/vector-icons';

export default function ContactChoiceScreen({ navigation }) {
  const [editable, setEditable] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactByMessage, setContactByMessage] = useState(true);
  const [textMessage, setTextMessage] = useState("");
  const [errorText, setErrorText] = useState();
  const user = useSelector((state) => state.user.value);

  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) null;

  //let contactFields;
  useEffect(() => {
    if (user.accesstoken !== "") {
      setEmail(user.email);
      setEditable(false);
      setName(user.firstName + " " + user.lastName);
      setPhone(user.phoneNumber);
    }
  }, []);

  const contactFields = () => {
    if (contactByMessage) {
      return (
        <Fragment>
          <TextInput
            style={styles.input}
            editable={editable}
            placeholder="Email"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TextInput
            style={styles.messageBox}
            placeholder="Enter your message here... "
            onChangeText={(value) => setTextMessage(value)}
            value={textMessage}
            multiline={true}
            numberOfLines={8}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <TextInput
            style={styles.input}
            editable={editable}
            placeholder="Name"
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <TextInput
            style={styles.input}
            editable={editable}
            placeholder="Phone"
            onChangeText={(value) => setPhone(value)}
            value={phone}
          />
        </Fragment>
      );
    }
  };

  function handleOnNotify() {
    if (contactByMessage) {
      if (email === "") {
        setErrorText("Email address is a mandatory field");

        return;
      }
    } else {
      if (phone === "" || name === "") {
        setErrorText("Name and phone number are mandarory fields");
        return;
      }
    }

    let messageBody = "This is automatically generated message.\n\n";

    if (contactByMessage) {
      messageBody += `Custoomer ${name} sent you the following message\n`;
      messageBody += "==========\n";
      messageBody += textMessage + "\n";
      messageBody += "==========\n\n";
    } else {
      messageBody += `Custoomer ${name} sent request to be contacted\n`;
      messageBody += `at phone number ${phone}\n\n`;
    }

    const mail = {
      text: messageBody,
    };

    fetch(`${backendUrl}/admin/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mail),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("NotificationSent");
        } else {
          navigation.navigate("NotificationFail");
        }
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title1Container}>
      <AntDesign name="caretleft" size={24} color="#3A7D44" />
        <Text
          style={styles.title1}
          onPress={() => navigation.navigate("MyAccount")}
        >
          {"  "}profil
        </Text>
        </View>
        <Text style={styles.title2}>
          contacter{"\n"}
          {"    "}Flavien
        </Text>
      </View>
        {/* <Text style={styles.textTitle}>
          <FontAwesome
            name="arrow-left"
            size={24}
            color="#000000"
            onPress={() => navigation.navigate("Profil")}
          />
          {"                     "} contact
        </Text> */}
        <View style={styles.topSection}>
          <Image source={require("../../assets/fla1.jpg")} style={styles.image} />
        </View>
        <View style={styles.middleSection}>
          <RadioButton.Group
            onValueChange={(newValue) => setContactByMessage(newValue)}
            value={contactByMessage}
          >
            <View style={styles.radioButtonLine}>
              <RadioButton value={true} />
              <Text style={styles.text}>Message</Text>
            </View>
            <View style={styles.radioButtonLine}>
              <RadioButton value={false} />
              <Text style={styles.text}>Telephone</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.line}></View>
        <View style={styles.middleSection}>
          {contactFields()}
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() => handleOnNotify()}
            style={styles.buttonFull}
          >
            <Text style={styles.textButton}>Notify Flavien</Text>
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
  title1Container:{
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
  topSection: {
    flex: 0.8,
    width: "90%",
    marginLeft: "5%",
    marginTop: "4%",
  },
  summaryLine: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  middleSection: {
    flex: 0.4,
    width: "90%",
    marginLeft: "5%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: "5%",
  },
  radioButtonLine: {
    flex: 0.6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bottomSection: {
    flex: 0.4,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
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
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    backgroundColor: "#D9D9D9",
    marginLeft: "3%",
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    width: "90%",
    marginBottom: "5%",
  },
  messageBox: {
    backgroundColor: "#D9D9D9",
    marginLeft: "3%",
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    width: "90%",
    marginBottom: "5%",
    textAlignVertical: "top",
  },
  line: {
    backgroundColor: "#D9D9D9",
    height: 2,
    width: "90%",
    marginLeft: "3%",
  },
  errorText: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 30,
    color: "red",
  },
});
