import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";
import { containerStyle } from "../styles";

const WelcomeImage = require("../../assets/img/HD-wallpaper-among-the-stars-among-m-a-visuals-alone-astronaut-astronomy-blue-cosmos-earth-is-nasa-planet-space-stars-sun-universe-thumbnail.jpg");

const Welcome = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading === true ? (
        <ImageBackground
          source={WelcomeImage}
          style={[containerStyle.container, { width: "100%", height: "100%" }]}>
          <View
            style={{
              flex: 4,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 40,
                fontWeight: "bold",
                color: "black",
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              SPACE
            </Text>
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 25,
                fontWeight: "bold",
                color: "black",
                padding: 12,
                alignItems: "center",
              }}>
              NEWS
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <CustomButton
              navigation={navigation}
              title={"Get Started"}></CustomButton>
          </View>
        </ImageBackground>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
