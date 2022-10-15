import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    FlatList,
    Pressable,
    SafeAreaView,
    Text,
    Vibration,
    TextInput,
    View
} from 'react-native';
import { styles } from './styles';
import database from '@react-native-firebase/firestore';



export default function Publier() {

    const [password, setPassword] = useState('');
    const [desc, setDesc] = useState('');
    const truepassword = 'ktz@2030';

    const [msg, setMsg] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        
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
    }, []);

    async function create() {
        if (desc == '') {
            Alert.alert(setMsg('Erreur! Les champs sont vides.'));

        } else {

            await database().collection('posts')
                .add({
                    desc: desc,
                    created_at: new Date()
                })
                .then(() => console.log('success'));
            setDesc('');
        }

    }
    
    return (
        <SafeAreaView>

            <View style={[styles.container, { marginBottom: 10 }]}>
                <View style={{ marginBottom: 20 }}>
                    <TextInput value={password} onChangeText={(password) => { setPassword(password); }} style={password == truepassword ? styles.none : styles.input} placeholder="Entrer Le mot de passe " />



                    <TextInput value={desc} onChangeText={(desc) => { setDesc(desc) }} multiline style={password == truepassword ? styles.input : styles.none} placeholder="Entrer La Description"
                    />
                    <View style={[{ marginTop: 30 }, password == truepassword ? {} : styles.none]}>
                        <Button disabled={(password == truepassword && desc != '') ? false : true} color={styles.mainColor} onPress={create} title="Publier" accessibilityLabel="Publier un lien"></Button>
                    </View>
                </View>


                <View style={password == truepassword ? styles.input : styles.none}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Gérer les posts</Text>
                    <FlatList
                        data={data}
                        renderItem={(item) => (
                            <Pressable
                                hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
                                android_ripple={{ color: 'red' }} onLongPress={
                                    async () => {
                                        Vibration.vibrate(100)

                                        await database()
                                            .collection('posts')
                                            .doc(item.item.id)
                                            .delete()

                                    }
                                }>
                                <View style={[styles.item]}>
                                    <Text style={{ color: 'black', fontSize: 16, }}>{item.item.desc}

                                    </Text>
                                </View>
                            </Pressable>


                        )}

                    />

                </View>

            </View>
        </SafeAreaView>

    );

}
