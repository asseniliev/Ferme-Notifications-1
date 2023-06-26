import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//expo notifications
import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


//basketScreens
import OrderEndScreen from "./screens/basketScreens/OrderEndScreen";
import OrderSummaryScreen from "./screens/basketScreens/OrderSummaryScreen";
import ShoppingCart from "./screens/basketScreens/ShoppingCart";
import UnderConstructionScreen from "./screens/basketScreens/UnderConstructionScreen";

//connectionScreens
import AccessDetailsScreen from "./screens/connectionScreens/AccessDetailsScreen";
import AddressScreen from "./screens/connectionScreens/AddressScreen";
import LogScreen from "./screens/connectionScreens/LogScreen";
import OnBoard from "./screens/connectionScreens/OnBoard";
import PersonalDataScreen from "./screens/connectionScreens/PersonalDataScreen";
import UserCreationScreen from "./screens/connectionScreens/UserCreationScreen";
import UserModificationScreen from "./screens/connectionScreens/UserModificationScreen";
import UserSignInScreen from "./screens/connectionScreens/UserSignInScreen";

//homeScreens
import HomeScreen from "./screens/homeScreens/HomeScreen";
import PresentationScreen from "./screens/homeScreens/PresentationScreen";

//profilScreens
import ContactChoiceScreen from "./screens/profilScreens/ContactChoiceScreen";
import MyAccountScreen from "./screens/profilScreens/MyAccountScreen";
import MyOrdersScreen from "./screens/profilScreens/MyOrdersScreen";
import NotificationFailScreen from "./screens/profilScreens/NotificationFailScreen";
import NotificationSentScreen from "./screens/profilScreens/NotificationSentScreen";
import PasswordChangeScreen from "./screens/profilScreens/PasswordChangeScreen";
import PasswordChangeSuccessScreen from "./screens/profilScreens/PasswordChangeSuccessScreen";

// adminScreens
import Dashboard from "./screens/adminScreens/Dashboard";
import CheckingOrdersScreen from "./screens/adminScreens/CheckingOrdersScreen";
import RoadmapScreen from "./screens/adminScreens/RoadmapScreen";
// import ProductDetails from "./screens/adminScreens/ProductDetailsScreen";
import ListOfProducts from "./screens/adminScreens/ListOfProductsScreen";
import SnapScreen from "./screens/adminScreens/SnapScreen";

// initialization of the storebasketScreens/
import { Provider } from "react-redux";
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import user from "./reducers/users"; //thihs is the reducer to be used
import picture from "./reducers/pictures";
import productCounter from "./reducers/productCounter";
import { getLoggedUser } from "./modules/isUserLogged";

//AsyncStorage.clear();



const reducers = combineReducers({ user, productCounter, picture });
const persistConfig = {
  key: "loggedUser",
  storage: AsyncStorage,
};

const store = configureStore({
  //reducer: { user, productCounter },
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
// end of initialization

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PresentationScreen"
        component={PresentationScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const BasketStack = createNativeStackNavigator();

function BasketStackScreen() {
  return (
    <BasketStack.Navigator>
      <BasketStack.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{ headerShown: false }}
      />
      <BasketStack.Screen
        name="Summary"
        component={OrderSummaryScreen}
        options={{ headerShown: false }}
      />
      <BasketStack.Screen
        name="Complete"
        component={OrderEndScreen}
        options={{ headerShown: false }}
      />
    </BasketStack.Navigator>
  );
}
const AccountStack = createNativeStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{ headerShown: false }}
      />
    </AccountStack.Navigator>
  );
}

function TabNavigator() {
  const activeColor = "#3a7d44";
  const inactiveColor = "#ababab";

  const loggedUser = getLoggedUser();

  const productCount = useSelector((state) => {
    const count = state.productCounter.value.length;
    return count !== 0 ? count : "";
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "Acceuil") {
            iconName = "home";
          } else if (route.name === "Panier") {
            iconName = "shopping-basket";
          } else if (route.name === "Profil") {
            iconName = "user";
          }

          return (
            <View style={styles.iconsBar}>
              <View
                style={[
                  styles.iconContainer,
                  { borderColor: color == activeColor ? color : "#ffffff" },
                ]}
              >
                <FontAwesome name={iconName} size={size} color={color} />
              </View>
            </View>
          );
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: [{ height: "10%" }],
        tabBarLabelStyle: { paddingBottom: 10 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Acceuil" component={HomeStackScreen} />
      {loggedUser.accesstoken !== null ? (
        <>
          <Tab.Screen
            name="Panier"
            component={BasketStackScreen}
            options={
              productCount
                ? {
                  tabBarBadge: productCount,
                  tabBarBadgeStyle: styles.tabBarBadgeStyle,
                }
                : {}
            }
          />
          <Tab.Screen name="Profil" component={AccountStackScreen} />
        </>
      ) : (
        <Tab.Screen name="Profil" component={LogScreen} />
      )}
    </Tab.Navigator>
  );
}

// Body for expo notifications
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}
// end of expo notifications body


export default function App() {
  // Body for push notifications
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      //console.log(token);
    });


    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  // end of expo notifications body


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnBoard" component={OnBoard} />
            <Stack.Screen name="Log" component={LogScreen} />
            <Stack.Screen name="HomeTab" component={TabNavigator} />
            <Stack.Screen name="Address" component={AddressScreen} />
            <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
            <Stack.Screen
              name="AccessDetails"
              component={AccessDetailsScreen}
            />
            <Stack.Screen name="UserCreation" component={UserCreationScreen} />
            <Stack.Screen
              name="UserModification"
              component={UserModificationScreen}
            />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="UserSignIn" component={UserSignInScreen} />
            <Stack.Screen
              name="NotificationSent"
              component={NotificationSentScreen}
            />
            <Stack.Screen
              name="NotificationFail"
              component={NotificationFailScreen}
            />
            <Stack.Screen
              name="ContactChoice"
              component={ContactChoiceScreen}
            />
            <Stack.Screen
              name="UnderConstruction"
              component={UnderConstructionScreen}
            />
            <Stack.Screen
              name="PasswordChange"
              component={PasswordChangeScreen}
            />
            <Stack.Screen
              name="PasswordChangeSuccess"
              component={PasswordChangeSuccessScreen}
            />
            {/* Ecrans innaccessible car pas encore de cession adimin mise en place */}
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="CheckingOrdersScreen"
              component={CheckingOrdersScreen}
            />
            <Stack.Screen name="RoadmapScreen" component={RoadmapScreen} />
            <Stack.Screen name="ListOfProducts" component={ListOfProducts} />
            {/* <Stack.Screen name="ProductDetails" component={ProductDetails} /> */}
            <Stack.Screen name="SnapScreen" component={SnapScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  iconsBar: {
    flex: 1,
    height: 80,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  iconContainer: {
    width: "40%",
    borderTopWidth: 8,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarBadgeStyle: {
    position: "absolute",
    top: 10,
  },
});
