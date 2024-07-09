import AnDesign from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../constants/Colors";
import Details from "../../pages/Details";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Home from "../../pages/Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../../pages/ProfileScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useState } from "react";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
  const [tabBackground, setTabBackground] = useState(COLORS.TAB_ACTIVE_COLOR);
  return (
    <Tab.Navigator
      activeColor={COLORS.TAB_ACTIVE_COLOR}
      inactiveColor={"white"}
      barStyle={{
        backgroundColor: COLORS.TAB_UNACTIVE_COLOR,
      }}>
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          tabBarLabel: "News",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="newspaper-o" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Details}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color }) => (
            <Entypo name="star-outlined" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
