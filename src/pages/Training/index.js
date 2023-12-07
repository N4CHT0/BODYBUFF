import { ScrollView, StyleSheet, Text, View,Image,Animated, TouchableOpacity } from 'react-native'
import React, {useRef} from 'react'
import {fontType} from '../../assets/theme';
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import { SearchNormal1,Category2 } from 'iconsax-react-native';
const Training = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 142);
  const recentY = diffClampY.interpolate({
      inputRange: [0, 142],
      outputRange: [0, -142],
      extrapolate: 'clamp',
    });
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
        <View style={events.container}>
            <View style={events.content}>
              <Image style={events.image} source={{
                uri:
                  'https://www.thespruce.com/thmb/t2yYrC79ODKIMcn4RhYvUxqAVn4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TheBarn3photobyAudreyHallHR-d5b7fd883c904a15b5d0c3b67a63e2df.jpeg',
              }}
            ></Image>
              <Image style={events.image} source={{
                uri:
                  'https://www.thespruce.com/thmb/UHWe2gnaQW7u8q01iO2Mk4ZKtLk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/NVGRTZ2_GB_S13_283_Gym-0f8aac0453d84363b1973c7568d16d34.jpeg',
              }}
            ></Image>
            </View>
          </View>
          <View style={events.container}>
            <View style={events.content}>
              <Image style={events.image} source={{
                uri:
                  'https://www.thespruce.com/thmb/JefdJpC0sQLfww-kWZfSkkYl_c8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/LeanneFordShedYogaStudioWEB--c876390f6ff1443e8577946b0cd4bc89.jpg',
              }}
            ></Image>
              <Image style={events.image} source={{
                uri:
                  'https://www.thespruce.com/thmb/mzYQ2e8yhfmvphcwRfDkfLqxvDQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Interior-Impressions-Woodbury-MN-Amys-Abode-Workout-Room-Floral-Green-Wallpaper-Treadmill-523d6f3193c344359a49a3d805cb9b2d.jpg',
              }}
            ></Image>
            </View>
          </View>
          <View style={events.container}>
            <View style={events.content}>
              <Image style={events.image} source={{
                uri:
                  'https://www.thespruce.com/thmb/qIk0cYNshizS4VbNnBqQhP-kFKY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/JessicaLagrangeInteriors_creditTonySoluri-c5e4abfcb4444381b516821381b72ea0.jpeg',
              }}
            ></Image>
              <Image style={events.image} source={{
                uri:
                  'https://www.thespruce.com/thmb/wXsex9R98W0CxQ_WX1Txb6-LaQs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/509ef46d-6440-25fa-c995-20dc72625d33-4493378390784da093bb4619645547e3.jpg',
              }}
            ></Image>
            </View>
          </View>
          <View style={events.container}>
            
            <View style={events.content}>
              <Image style={events.image} source={{
                uri:
                  'https://www.thespruce.com/thmb/pcmhj8XKCXPXoS6Rfmt6w_VPkeM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Geddes_Gym_over_III_V.232573-bc9063f044224e71b0f78eb339db3d07.jpeg',
              }}
            ></Image>
              <Image style={events.image} source={{
                uri:
                  'https://www.thespruce.com/thmb/WxXzBocohXOXEg5hCLKfN1sHgH4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Geddes_Gym_over_II_32558-f12720a277c045fa8b0b13ec6b134070.jpeg',
              }}
            ></Image>
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
const styles = StyleSheet.create({})
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