import React from 'react';
import { Button, StyleSheet, View, Image, Text } from 'react-native';

import { BodyText, TitleText } from '../components/Text';
import { primary } from '../constants/colors';

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over</TitleText>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/success.png')} style={styles.image} />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          <Text style={styles.highlight}>{rounds}</Text> were required in order
          to guess the number <Text style={styles.highlight}>{userNumber}</Text>
        </BodyText>
      </View>
      <Button title="New Game" onPress={onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '80%',
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginBottom: 10
  },
  resultText: {
    textAlign: 'center',
    fontSize: 18
  },
  highlight: {
    color: primary,
    fontFamily: 'open-sans-bold'
  },
});

export default GameOverScreen;
