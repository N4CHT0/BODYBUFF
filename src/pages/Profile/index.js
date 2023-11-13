import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TextInput,TouchableOpacity } from 'react-native';
import { Category,Health,ArrowDown2,Map1 } from 'iconsax-react-native';
import {fontType} from '../../assets/theme';
import { Setting2 } from 'iconsax-react-native';

const Profile = () => {
  return (
    <ScrollView>
        <View style={{marginBottom: 20}}>
            <View style={{padding: 20, backgroundColor: 'white',alignItems: 'center'}}>
                <Text style={{fontFamily:fontType['Oswald-Bold'], fontSize: 20, marginBottom: 10 }} >Profile</Text>
            </View>
        </View>

        <View style={{flexDirection: 'column'}}>
            <TouchableOpacity>
                <View style={{backgroundColor: 'black', padding: 30,borderRadius: 100, alignItems: 'center', marginHorizontal: 151,}}>
                    <Text style={{color: 'white',fontFamily:fontType['Oswald-Bold'], fontSize: 18}}>FT</Text>
                </View>
            </TouchableOpacity>
            
            <View style={{alignItems: 'center', marginVertical: 16}}>
                <Text style={{color: '#252727',fontFamily:fontType['Oswald-Bold'], fontSize: 18}}>Fathur Satya</Text>
                <Text style={{fontFamily:fontType['Oswald-Light'], fontSize: 20}}>Move now or never</Text>
            </View>
            
                <View style={{marginVertical: 20, marginHorizontal: 20, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', gap: 5, justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <View style={{padding: 45,backgroundColor: '#F7F7F7', borderRadius: 20, borderWidth: 1, }}>
                                <Text style={{color: '#252727',fontFamily:fontType['Oswald-Bold'], fontSize: 18}}>Edit Profile</Text>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <View style={{padding: 45,backgroundColor: '#252727', borderRadius: 20 , flexDirection: 'row', gap: 10,alignItems: 'center',alignContent: 'center'}}>
                                <Setting2 size="35" color="#F7F7F7" variant="Outline"/>
                            </View>
                        </TouchableOpacity>
                        
                        
                    </View>
                    <View style={{flexDirection: 'row', gap: 5, justifyContent: 'center', marginTop: 5}}>
                        <TouchableOpacity>
                            <View style={{padding: 45,backgroundColor: '#252727', borderRadius: 20 }}>
                                <Text style={{color: '#F7F7F7',fontFamily:fontType['Oswald-Bold'], fontSize: 18}}>Help</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{padding: 45,backgroundColor: '#F7F7F7', borderRadius: 20, borderWidth: 1, }}>
                                <Text style={{color: '#252727',fontFamily:fontType['Oswald-Bold'], fontSize: 18}}>Sign Out</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                    
                    

                
            </View>
            
    
        </View>
    </ScrollView>
    
  )
}

export default Profile

const styles = StyleSheet.create({})