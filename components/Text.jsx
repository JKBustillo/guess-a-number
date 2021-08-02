import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const BodyText = props => (
  <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
);

export const TitleText = props => (
  <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
);

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans'
  },
  title: {
    fontFamily: 'open-sans-bold'
  }
});