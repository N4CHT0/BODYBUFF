import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TextInput,TouchableOpacity } from 'react-native';
import { Category,Health,ArrowDown2,Map1 } from 'iconsax-react-native';
import {fontType} from '../../assets/theme';

const Home = () => {

  return (
    <ScrollView style={styles.container}>
      
      <View style={header.container}>
        <TouchableOpacity>
        <View style={header.more}>
            <View style={header.icon}>
                <Category size="30" color="#F7F7F7" variant="Bold"/>
            </View>
        </View>
        </TouchableOpacity>
        
        <View style={header.welcome}>
            <Text style={header.text}>Hi, </Text>
            <Text style={header.textName}>Fathur</Text>    
        </View>
        <View style={header.quote}>
            <Text style={header.textQuote}>Your boards looks</Text>
            <Text style={header.textQuote}>so good</Text>
        </View>
        
      </View>
      
      <View style={card.container}>
        <View style={card.content}>
            <Health size="40" color="#272727" variant="Bold"/>
            <Text style={card.text}>5%</Text>
            <ArrowDown2 size="40" color="#272727" variant="Bold"/>
        </View>
        <View style={card.content}>
            <Map1 size="32" color="#272727" variant="Bold"/>
            <Text style={card.text}>1 Km</Text>
            <ArrowDown2 size="40" color="#272727" variant="Bold"/>
        </View>
        
      </View>

      <View style={card.containerStart}>
        <TouchableOpacity style={card.contentStart}>
            <Text style={card.textStart}>Start</Text>
        </TouchableOpacity>
        <View style={card.contentMember}>
              <Text style={card.textMember}>Member</Text>
              <View style={{flexDirection: 'row', gap: 5}}>
                <TouchableOpacity style={{backgroundColor: '#F7F7F7', padding: 20, borderRadius: 100,}}>
                    <Text style={{fontFamily: fontType['Oswald-Bold'], fontSize: 14, marginHorizontal: 6,}}>FT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: '#F7F7F7', padding: 20, borderRadius: 100,}}>
                    <Text style={{fontFamily: fontType['Oswald-Bold'], fontSize: 14, marginHorizontal: -1,}}>24 +</Text>
                </TouchableOpacity>
      
              </View>
              
          </View>
      </View>

      <ScrollView horizontal style={styles.slider} showsHorizontalScrollIndicator={false}>
        <Image
          style={styles.sliderImage}
          source={{ uri: 'https://i.pinimg.com/564x/a8/32/c3/a832c3745eeaee8c4e948eedefe15e6b.jpg' }}
        />
        <Image
          style={styles.sliderImage}
          source={{ uri: 'https://i.pinimg.com/564x/15/c9/4d/15c94dfd0f8ef15779948ebf567eda76.jpg' }}
        />
        <Image
          style={styles.sliderImage}
          source={{ uri: 'https://i.pinimg.com/564x/2f/38/15/2f3815367655cb86e92cd839a133360c.jpg' }}
        />
        <Image
          style={styles.sliderImage}
          source={{ uri: 'https://i.pinimg.com/564x/f1/3e/23/f13e23aac2fc3e5688241c0cc4aa43e6.jpg' }}
        />
        {/* Tambahkan gambar slider lainnya di sini */}
      </ScrollView>

    </ScrollView>
  );
};

export default Home;
const header = StyleSheet.create({
    container:{
        backgroundColor: '#F7F7F7',
        flexDirection: 'column',
        marginBottom: 20,
    },
    textName:{
        fontFamily: fontType['Oswald-Bold'],
        fontSize: 40,
    },
    textQuote: {
        fontFamily: fontType['Oswald-Regular'],
        fontSize: 24,
    },
    text:{
        fontFamily: fontType['Oswald-Regular'],
        fontSize: 40,
    },
    welcome:{
        flexDirection: 'row',
        marginHorizontal: 26,
        marginTop: 18,
        marginBottom: 8,
    },
    quote:{
        marginHorizontal: 26,
        marginBottom: 48,
    },
    more: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginRight: 26,
        marginTop: 20,
    },
    icon:{
        padding: 10,
        backgroundColor: '#252727',
        borderRadius: 100,

    }
})

const card = StyleSheet.create({
    containerStart: {
        flexDirection: 'row',
        padding: 10,
        gap: 6,
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        gap: 6,
    },
    content: {
        padding: 20,
        borderRadius: 34,
        backgroundColor: '#C0B6FF',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    contentStart: {
        padding: 40,
        borderRadius: 34,
        backgroundColor: '#252727',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    contentMember: {
        padding: 30,
        borderRadius: 34,
        backgroundColor: '#252727',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-start',
    },
    text: {
        fontFamily: fontType['Oswald-Bold'],
        fontSize: 28,
        textAlign: 'center'
    },
    textStart: {
        fontFamily: fontType['Oswald-Bold'],
        fontSize: 26,
        color: '#F7F7F7',
        textAlign: 'center',
        marginHorizontal: 22,
    },
    textMember: {
        fontFamily: fontType['Oswald-Bold'],
        fontSize: 20,
        color: '#F7F7F7',
        textAlign: 'left',
    },
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    headerTitle: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'KoulenRegular', // Ganti dengan font yang diinginkan
    },
    searchContainer: {
      padding: 20,
    },
    searchInput: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 30,
      paddingLeft: 20,
      backgroundColor: '#f2f2f2',
      fontFamily: 'Arial', // Ganti dengan font yang diinginkan
    },
    slider: {
      flexDirection: 'row',
      marginVertical: 20,
      padding: 10,
    },
    sliderImage: {
      width: 250,
      height: 150,
      marginHorizontal: 10,
      borderRadius: 20,
    },
    categoryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      margin: 10,
    },
    exerciseTitle: {
      color: 'black',
      fontSize: 20,
      fontFamily: 'Koulen-Reguler',
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 20,
    },
  });