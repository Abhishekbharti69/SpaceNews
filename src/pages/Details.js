import {
  Appbar,
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Title,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/Colors";

const Details = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      getFavorites();
    }, 2000); // Run every 2 seconds
    return () => clearInterval(interval);
  }, []);
  const getFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem("favorites");
      if (favoritesData !== null) {
        setFavorites(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async (item) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.url !== item.url
    );
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleReadMore = (newsItem) => {
    setSelectedNews(newsItem);
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
    setSelectedNews(null);
  };

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: COLORS.TAB_ACTIVE_COLOR }}>
          <Appbar.Content
            titleStyle={{ color: "white" }}
            title="Favorites News"
          />
        </Appbar.Header>
        <ScrollView style={styles.container}>
          {favorites.map((item, index) => (
            <Card key={index} style={styles.card}>
              <Card.Cover source={{ uri: item.url }} />
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.explanation.substring(0, 100)}...</Paragraph>
              </Card.Content>

              <Card.Actions>
                <Button onPress={() => handleReadMore(item)}>Read More</Button>
                <Button onPress={() => removeFavorite(item)}>Remove</Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
        {selectedNews && (
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modalContainer}>
              <ScrollView>
                <Card>
                  <Card.Cover source={{ uri: selectedNews.url }} />
                  <Card.Content>
                    <Title>{selectedNews.title}</Title>
                    <Paragraph>{selectedNews.explanation}</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <Button onPress={hideModal}>Close</Button>
                  </Card.Actions>
                </Card>
              </ScrollView>
            </Modal>
          </Portal>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default Details;
