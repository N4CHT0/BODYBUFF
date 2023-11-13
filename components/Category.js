import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card } from 'react-native-elements';

import { StyleSheet } from 'react-native'; // Tambahkan ini

const Category = ({ name, icon }) => (
  <TouchableOpacity style={styles.categoryCol}>
    <Card>
      <Icon name={icon} size={36} color="#ff6347" />
      <Text style={styles.categoryName}>{name}</Text>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryCol: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  categoryName: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Koulenregular',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Category;
