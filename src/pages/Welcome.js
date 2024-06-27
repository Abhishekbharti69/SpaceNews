import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";
import { containerStyle } from "../styles";

const WelcomeImage = require("../../assets/img/welcome.jpg");

const Welcome = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading === false ? (
        <ImageBackground
          source={WelcomeImage}
          style={[containerStyle.container, {}]}>
          <View
            style={{
              flex: 4,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "black",
                backgroundColor: "yellow",
                paddingHorizontal: 10,
              }}>
              CURRENCY
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "#fff",
                borderColor: "yellow",
                borderWidth: 2,
                padding: 12,
                width: 233,
              }}>
              CONVERTER
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <CustomButton title={"Get Started"}></CustomButton>
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
