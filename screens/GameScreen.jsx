import React, { useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNumber = Math.floor(Math.random() * (max - min)) + min;

  if (rndNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNumber;
  }
};

const GameScreen = ({ userChoice }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = direction => {
    if ((!direction && currentGuess < userChoice) || (direction && currentGuess > userChoice)) {
      Alert.alert("It's wrong", 'What are you doing, boy?', [{ text: 'No', style: "cancel" }]);
      return; 
    }

    if (!direction) {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    setCurrentGuess(generateRandomBetween(currentLow.current, currentHigh.current, currentGuess));
  };

  return (
    <View style={styles.screen}>
      <Text>Oponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={() => nextGuessHandler(0)} />
        <Button title="Greater" onPress={() => nextGuessHandler(1)} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
