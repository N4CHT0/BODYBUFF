import React, {useState,useCallback,useRef,useEffect} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TextInput,TouchableOpacity } from 'react-native';
import { Category,Health,ArrowDown2,Map1 } from 'iconsax-react-native';
import {fontType} from '../../assets/theme';
import { Setting2 } from 'iconsax-react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
    const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  useEffect(() => {
    const user = auth().currentUser;
    const fetchBlogData = () => {
      try {
        if (user) {
          const userId = user.uid;
          const blogCollection = firestore().collection('blog');
          const query = blogCollection.where('authorId', '==', userId);
          const unsubscribeBlog = query.onSnapshot(querySnapshot => {
            const blogs = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            setBlogData(blogs);
            setLoading(false);
          });

          return () => {
            unsubscribeBlog();
          };
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    const fetchProfileData = () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);

          const unsubscribeProfile = userRef.onSnapshot(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setProfileData(userData);
              fetchBlogData();
            } else {
              console.error('Dokumen pengguna tidak ditemukan.');
            }
          });

          return () => {
            unsubscribeProfile();
          };
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchBlogData();
    fetchProfileData();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      firestore()
        .collection('blog')
        .onSnapshot(querySnapshot => {
          const blogs = [];
          querySnapshot.forEach(documentSnapshot => {
            blogs.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setBlogData(blogs);
        });
      setRefreshing(false);
    }, 1500);
  }, []);
  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };
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
                        <TouchableOpacity onPress={handleLogout}>
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