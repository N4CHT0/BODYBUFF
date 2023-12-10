import { useNavigation } from "@react-navigation/native";
import React, { useState,useEffect, } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    ActivityIndicator
} from "react-native";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Category, DirectboxSend, Image, Notification, SearchNormal1,Add,AddSquare } from 'iconsax-react-native'
import FastImage from "react-native-fast-image";
import { fontType } from "../../assets/theme";
const EditTraining = ({route}) => {
  const {trainingId} = route.params;
    const [trainingData, setTrainingData] = useState({
        title: '',
        description: '',
        duration: '',
        totalLikes: 0,
        totalComments: 0,
      });
      const handleChange = (key, value) => {
        setTrainingData({
          ...trainingData,
          [key]: value,
        });
      };
      const [image, setImage] = useState(null);
      const navigation = useNavigation();
      const [oldImage, setOldImage] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        const subscriber = firestore()
          .collection('item')
          .doc(trainingId)
          .onSnapshot(documentSnapshot => {
            const itemData = documentSnapshot.data();
            if (itemData) {
              console.log('Traning data: ', itemData);
              setTrainingData({
                title: itemData.title,
                description: itemData.description,
                duration: itemData.duration,
              });
              setOldImage(itemData.image);
              setImage(itemData.image);
              setLoading(false);
            } else {
              console.log(`Item with ID ${trainingId} not found.`);
            }
          });
        setLoading(false);
        return () => subscriber();
      }, [trainingId]);
    
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
    
      const handleUpdate = async () => {
        setLoading(true);
        let filename = image.substring(image.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;
        const reference = storage().ref(`images/${filename}`);
        try {
          if (image !== oldImage && oldImage) {
            const oldImageRef = storage().refFromURL(oldImage);
            await oldImageRef.delete();
          }
          if (image !== oldImage) {
            await reference.putFile(image);
          }
          const url =
            image !== oldImage ? await reference.getDownloadURL() : oldImage;
          await firestore().collection('item').doc(trainingId).update({
            title: trainingData.title,
            description: trainingData.description,
            image: url,
            duration: trainingData.duration,
          });
          setLoading(false);
          console.log('Item Updated!');
          navigation.navigate('Training', {trainingId});
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <View style={{flex: 1,}}>
            <View style={{flexDirection: 'row',alignItems: 'center',padding: 20, justifyContent:'flex-end', gap: 28}}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Search")}>
                        <SearchNormal1 size="27" color="#2D2C2C"/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Mailbox")}>
                        <Notification size="27" color="#2D2C2C"/>
                    </TouchableWithoutFeedback>
                </View>
            <ScrollView>
                <View style={textInput.board}>
                    <TextInput
                    placeholder="Nama Latihan"
                    value={trainingData.title}
                    onChangeText={(text) => handleChange("title", text)}
                    placeholderTextColor={'gray'}
                    multiline
                    style={textInput.title}
                    />
                </View>
                <View style={textInput.boardDescription}>
                    <TextInput
                    placeholder="Deskripsi Barang"
                    value={trainingData.description}
                    onChangeText={(text) => handleChange("description", text)}
                    placeholderTextColor={'gray'}
                    multiline
                    style={textInput.title}
                    />
                </View>
                <View style={textInput.boardDescription}>
                    <TextInput
                    placeholder="Durasi."
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
              <AddSquare color="gray" variant="Linear" size={42} />
              <Text
                style={{
                  fontFamily: fontType['Mukta-Medium'],
                  fontSize: 12,
                  color: "gray",
                }}>
                Upload Thumbnail
              </Text>
            </View>
          </TouchableOpacity>
        )}
            </ScrollView>
            <TouchableOpacity onPress={handleUpdate} style={styles.buttonUpload}>
                <DirectboxSend variant="Bold" color="white" size={'30'}/>
            </TouchableOpacity>
            {loading && (
            <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="blue" />
            </View>
            )}
        </View>
  )
}

export default EditTraining
const styles = StyleSheet.create({
  buttonUpload:{
      backgroundColor: '#3693F4',
      padding: 15, 
      flexDirection: 'row',
      alignItems: 'center', 
      gap: 12, 
      marginHorizontal: 120, 
      borderRadius: 14, 
      position: 'absolute', 
      top: 670,
      left:192
  }
})
const textInput = StyleSheet.create({
  title:{
      fontSize: 14,
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