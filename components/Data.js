import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../../utils/formatDate';
import FastImage from 'react-native-fast-image';

const Data = ({item}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity  onPress={() => navigation.navigate('DetailTraining', {trainingId: item.id})}>
            <FastImage style={styles.image}
            source={{uri: item?.image,
            headers:{Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}/>
        </TouchableOpacity>
    )
}

export default Data

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        marginHorizontal: 1,
        marginVertical: 1,
        borderRadius: 5,
        resizeMode: 'contain',
    },
})