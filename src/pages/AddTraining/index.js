import { useNavigation } from "@react-navigation/native";
import { SearchNormal1,Notification, AddCircle,AddSquare,Add } from "iconsax-react-native";
import React, { useState } from "react";
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import {fontType} from '../../assets/theme';
import FastImage from "react-native-fast-image";
const AddTraining = () => {
    const [loading, setLoading] = useState(false);
    const [trainingData, setTrainingData] = useState({
        title: "",
        description: "",
        duration: "",
        image: "",
        totalLikes: 0,
        totalComments: 0,
    });
    const handleImagePick = async () => {
        ImagePicker.openPicker({
          width: 1920,
          height: 1080,
          cropping: true,
        })
          .then(image => {
            console.log(image);
            setImage(image.path);
          })
          .catch(error => {
            console.log(error);
          });
      };
    const handleUpload = async () => {
        let filename = image.substring(image.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        const reference = storage().ref(`image/${filename}`);
        setLoading(true);
        try {
        await reference.putFile(image);
        const url = await reference.getDownloadURL();
        await firestore().collection('item').add({
            title: trainingData.title,
            description: trainingData.description,
            image: url,
            duration: trainingData.duration,
            totalComments: trainingData.totalComments,
            totalLikes: trainingData.totalLikes,
            createdAt: new Date(),
        });
        setLoading(false);
        console.log('Item added!');
        navigation.navigate('Training');
        } catch (error) {
        console.log(error);
        }
        };
    const handleChange = (key, value) => {
        setTrainingData({
        ...trainingData,
        [key]: value,
        });
    };
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    return (
        <View style={{flex: 1}}>
             <View style={{flexDirection: 'row',alignItems: 'center',padding: 25, justifyContent:'flex-end', gap: 28,backgroundColor: '#252727'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Search")}>
                        <SearchNormal1 size="27" color="#F7F7F7"variant="Linear"/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Mailbox")}>
                        <Notification size="27" color="#F7F7F7" variant="Linear"/>
                    </TouchableWithoutFeedback>
            </View>
            <ScrollView>
                <View style={textInput.board}>
                    <TextInput
                    placeholder="Nama Latihan."
                    value={trainingData.title}
                    onChangeText={(text) => handleChange("title", text)}
                    placeholderTextColor={'gray'}
                    multiline
                    style={textInput.title}
                    />
                </View>
                <View style={textInput.board}>
                    <TextInput
                    placeholder="Deskripsi Latihan."
                    value={trainingData.description}
                    onChangeText={(text) => handleChange("description", text)}
                    placeholderTextColor={'gray'}
                    multiline
                    style={textInput.title}
                    />
                </View>
                <View style={textInput.board}>
                    <TextInput
                    placeholder="Durasi Latihan."
                    value={trainingData.duration}
                    onChangeText={(text) => handleChange("duration", text)}
                    placeholderTextColor={'gray'}
                    multiline
                    style={textInput.title}
                    />
                </View>
                {image ? (
                    <View style={{position: 'relative'}}>
                        <FastImage
                        style={{width: '100%', height: 127, borderRadius: 5}}
                        source={{
                            uri: image,
                            headers: {Authorization: 'someAuthToken'},
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        />
                        <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            backgroundColor: 'blue',
                            borderRadius: 25,
                        }}
                        onPress={() => setImage(null)}>
                        <Add
                            size={20}
                            variant="Linear"
                            color="white"
                            style={{transform: [{rotate: '45deg'}]}}
                        />
                        </TouchableOpacity>
                    </View>
                    ) : (
                    <TouchableOpacity onPress={handleImagePick}>
                        <View
                        style={[
                            textInput.borderDashed,
                            {
                            gap: 10,
                            paddingVertical: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            },
                        ]}>
                        <AddSquare color="" variant="Linear" size={42} />
                        <Text
                            style={{
                            fontFamily: fontType['Pjs-Regular'],
                            fontSize: 12,
                            color: 'gray',
                            }}>
                            Upload Thumbnail
                        </Text>
                        </View>
                    </TouchableOpacity>
                    )}
            </ScrollView>
            <TouchableOpacity onPress={handleUpload} style={{backgroundColor: '#3693F4',padding: 15, flexDirection: 'row',alignItems: 'center', gap: 12, marginHorizontal: 120, borderRadius: 14, position: 'absolute', top: 670,left:192}}>
                <AddCircle variant="Linear" color="white" size={'30'}/>
            </TouchableOpacity>
        </View>
    )
}

export default AddTraining

const styles = StyleSheet.create({})
const textInput = StyleSheet.create({
    title:{
        fontSize: 20,
        fontFamily: fontType['Oswald-Light']
    },
    board: {
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    boardDescription: {
        padding: 10,
        marginVertical: 10,
        marginTop: -5,
        marginHorizontal: 20,
    }
})