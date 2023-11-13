import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import { StyleSheet } from 'react-native'; // Tambahkan ini

const Exercise = ({ name, description, imageUri }) => (
  <TouchableOpacity style={styles.exerciseContainer}>
    <Image style={styles.exerciseImage} source={{ uri: imageUri }} />
    <View style={styles.exerciseInfo}>
      <Text style={styles.exerciseName}>{name}</Text>
      <Text style={styles.exerciseDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  exerciseContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  exerciseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  exerciseInfo: {
    marginLeft: 10,
    flex: 1,
  },
  exerciseName: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial', // Ganti dengan font yang diinginkan
  },
  exerciseDescription: {
    color: 'gray',
    fontFamily: 'Arial', // Ganti dengan font yang diinginkan
  },
});

export default Exercise;
