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
import { Category, DirectboxSend, Image, Notification, SearchNormal1 } from 'iconsax-react-native'
import axios from 'axios';
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
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        getData();
      }, [trainingId]);
    
      const getData = async () => {
        try {
          const response = await axios.get(
            `https://6570c63f09586eff6641ed29.mockapi.io/bodybuff/training/${trainingId}`,
          );
          setTrainingData({
            title : response.data.title,
            description : response.data.description,
            duration : response.data.duration,
            image : response.data.image,
          })
        setImage(response.data.image)
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      const handleUpdate = async () => {
        setLoading(true);
        try {
          await axios
            .put(`https://6570c63f09586eff6641ed29.mockapi.io/bodybuff/training/${trainingId}`, {
              title: trainingData.title,
              image,
              description: trainingData.description,
              duration : trainingData.duration,
              totalComments: trainingData.totalComments,
              totalLikes: trainingData.totalLikes,
            })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
          setLoading(false);
          navigation.navigate('Training');
        } catch (e) {
          console.log(e);
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
                <View style={textInput.boardDescription}>
                    <TextInput
                    placeholder="URL."
                    value={image}
                    onChangeText={(text) => setImage(text)}
                    placeholderTextColor={'gray'}
                    multiline
                    style={textInput.title}
                    />
                </View>
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