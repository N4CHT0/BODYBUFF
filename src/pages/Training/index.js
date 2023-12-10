import {useNavigation,useFocusEffect} from '@react-navigation/native';
import React, {useRef,useState,useCallback,useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ScrollView, StyleSheet, Text, View,ActivityIndicator, TouchableOpacity, Image,Animated} from 'react-native';
import {fontType} from '../../assets/theme';
import { SearchNormal1,Category2 } from 'iconsax-react-native';
import Data from '../../../components/Data';
const Training = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 142);
  const recentY = diffClampY.interpolate({
    inputRange: [0, 142],
    outputRange: [0, -142],
    extrapolate: 'clamp',
  });
  const [loading, setLoading] = useState(true);
  const [trainingData, setTrainingData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const subscriber = firestore()
      .collection('item')
      .onSnapshot(querySnapshot => {
        const item = [];
        querySnapshot.forEach(documentSnapshot => {
          item.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setTrainingData(item);
        setLoading(false);
      });
    return () => subscriber();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('item')
        .onSnapshot(querySnapshot => {
          const item = [];
          querySnapshot.forEach(documentSnapshot => {
            item.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setRefreshing(trainingData);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  return (
    <View style={{flex: 1}}>
          <Animated.ScrollView
    onScroll={Animated.event(
      [{nativeEvent: {contentOffset: {y: scrollY}}}],
      {useNativeDriver: true},
    )}
    contentContainerStyle={{paddingTop: 0}}>
        <Animated.View style={{padding: 32, backgroundColor: '#252727',transform: [{translateY: recentY}]}}>
            <Text style={{color: '#F7F7F7',fontFamily:fontType['Oswald-Bold'], fontSize: 22}}>BodyBuff</Text>
        </Animated.View>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <View style={{flexDirection: 'row',alignItems: 'center', gap: 20,padding: 16, marginVertical: 10, backgroundColor:'#E3E3E3',marginHorizontal: 10,borderRadius: 10}}>
            <SearchNormal1 size="22" color="#000000"/>
            <Text>Search</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.container}>    
            <View style={styles.content}>
              {loading ? (
                <ActivityIndicator size={'large'} color={'black'}/>
              ) : (
                trainingData.map((item, index) => <Data item={item} key={index}/>)
              )}
            </View>
          </View>
    </Animated.ScrollView>
    <TouchableOpacity style={{padding: 20, position:'absolute', top: 630,right: 20, backgroundColor:'#252727',borderRadius: 20}} onPress={() => navigation.navigate("AddTraining")}>
        <Category2 size="29"  color="#F7F7F7" variant='Bold'/>
    </TouchableOpacity>
    </View>
  )
}
export default Training
const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    marginVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'center'
  }
})
const events = StyleSheet.create({
    container:{
      flexDirection: 'column',
      marginVertical: 6,
      alignItems: 'center'
    },
    content: {
      flexDirection: 'row',
    },
    image: {
      width: 190,
      height: 250,
      marginHorizontal: 1,
      borderRadius: 5,
      resizeMode: 'contain',
    },
  })