// HomeScreen.js

import {
  ActivityIndicator,
  Scroll,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/Colors";
import axios from "axios";

const NASA_API_KEY = "tIqeY77GumfqzwauqNh7gaQUX6oxhV3uWtBtPAuT";

const Home = () => {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=10`
      );
      setNews(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (newsItem) => {
    setSelectedNews(newsItem);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedNews(null);
  };
  const addFavorite = async (item) => {
    try {
      const favoritesData = await AsyncStorage.getItem("favorites");
      const favorites = favoritesData ? JSON.parse(favoritesData) : [];
      favorites.push(item);
      await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Provider>
      <Appbar.Header style={{ backgroundColor: COLORS.TAB_ACTIVE_COLOR }}>
        <Appbar.Content
          titleStyle={{ color: "white" }}
          title="Latest News From NASA"
        />
      </Appbar.Header>
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}>
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {news.map((item, index) => (
            <Card key={index} style={styles.card}>
              <Card.Cover source={{ uri: item.url }} />
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.explanation.substring(0, 100)}...</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleReadMore(item)}>Read More</Button>

                <Button onPress={() => addFavorite(item)}>
                  Add to Favorites
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      )}
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
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    height: 600,
  },
});

export default Home;
