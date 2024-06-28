import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";

const CustomButton = ({ title }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          width: 300,
          height: 50,
          backgroundColor: "#1a86b4",
          justifyContent: "center",
          borderRadius: 20,
        }}>
        <Text style={{ textAlign: "center", fontWeight: "bold" , color:"yellow"}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;