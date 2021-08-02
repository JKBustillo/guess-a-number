import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import { BodyText, TitleText } from '../components/Text';
import MainButton from '../components/MainButton';

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

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (!direction && currentGuess < userChoice) ||
      (direction && currentGuess > userChoice)
    ) {
      Alert.alert("It's wrong", 'What are you doing, boy?', [
        { text: 'No', style: 'cancel' },
      ]);
      return;
    }

    if (!direction) {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses([nextNumber, ...pastGuesses]);
  };

  const renderListItem = (value, roundNum) => (
    <View style={styles.listItem} key={value}>
      <BodyText># {roundNum}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  );

  return (
    <View style={styles.screen}>
      <TitleText>Oponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler(0)}>
          <Ionicons name="md-remove" size={20} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler(1)}>
          <Ionicons name="md-add" size={20} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
      </View>
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
  listContainer: {
    flex: 1,
    width: '80%'
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'
  },
});

export default GameScreen;
