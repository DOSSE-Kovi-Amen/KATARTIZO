import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Button,
    FlatList,
    Linking,
    Share,
    Text,
    View,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { styles } from './styles';

import { WebView } from 'react-native-webview';
import database from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import messaging from '@react-native-firebase/messaging';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';



const LinkTab = () => {
    const [data, setData] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        async function requestUserPermission() {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
        }
        requestUserPermission();
        database().collection('posts').orderBy('created_at', 'desc').onSnapshot((querySnapshot) => {
            const todos = querySnapshot.docs;
            const todoList = [];
            todos.forEach(element => {
                const data = element.data();
                const id = { id: element.id };
                const finalData = Object.assign(id, data)
                todoList.push(finalData);
            });
            setData(todoList);
        });
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            navigation.navigate('home');
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
            });
        messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

    }, []);


    function Url_Valide(UrlTest, http_fac) {
        if (http_fac) { //le segment "http://" est facultatif
            var regexp = new RegExp("^((http|https)://)?(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|/|=|?)?]+)+$");
        } else {
            var regexp = new RegExp("^((http|https)://){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|/|=|?)?]+)+$");
        }
        // if (regexp.test(UrlTest)){
        //   console.log ('Mon URL est valide');
        // }else{
        //   console.log ('Mon URL est invalide');
        // }
        return regexp.test(UrlTest);
    }

    return (

        <SafeAreaView>
            <View >
                <FlatList
                    data={data}
                    renderItem={(item) => {
                        const todos = item.item.desc.split(/[\s\n\r]/g);
                        let link = [];
                        todos.forEach(todo => {
                            if (Url_Valide(todo, true)) {
                                link.push(todo);
                            }

                        });

                        return (
                            <TouchableHighlight activeOpacity={0.6}
                                underlayColor="#DDDDDD" style={styles.item} onPress={() => link[0]!=null?Linking.openURL(link[0]):''}>
                                <View>
                                    {link[0]?.includes('meet.google.com') ? <TouchableOpacity onPress={() => link[0]!=null?Linking.openURL(link[0]):'' } style={{ flex: 1, flexDirection: 'row', backgroundColor: '#DDDDDD', borderRadius: 10, marginBottom: 5 }}>
                                        <View style={{ backgroundColor: 'black', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                                            <Image style={[{ width: 80, height: 70 },]} source={require('./src/gmeet.png')} />
                                        </View>
                                        <View style={{ margin: 10 }}>
                                            <Text style={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Google Meet</Text>
                                            <Text style={{ fontSize: 12 }}>Solution idéale pour vos réunions en lign...</Text>
                                            <Text style={{ fontSize: 12 }}>meet.google.com</Text>

                                        </View>


                                    </TouchableOpacity> : link[0]?.includes('youtu.be') ?
                                        <YoutubeIframe
                                            height={200}
                                            play={false}
                                            videoId={link[0]?.substr(17)}
                                        />
                                        : <Text></Text>
                                    }


                                    <Text style={{ color: 'black', fontSize: 16 }}>
                                        {
                                            todos.map((tod, key) => {
                                                if (Url_Valide(tod, true)) {
                                                    return <Text onPress={() => Linking.openURL(tod)} key={key} style={{ color: 'dodgerblue' }}>{tod + ' '}</Text>

                                                } else {
                                                    return <Text key={key}>{tod + ' '}</Text>
                                                }
                                            })}
                                    </Text>



                                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", }}>
                                        <View style={{ width: '90%' }}>


                                        </View>

                                        <TouchableOpacity onPress={async () => {
                                            await Share.share({
                                                message:  item.item.desc
                                            });
                                        }}><Icon name='share' size={18} /></TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

export default LinkTab