import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'

import {
  StatusBar,
  Text,
  View,
  Button,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './screens/HomeScreen';
import { styles } from './styles';


const Drawer = createDrawerNavigator();

function NotificationsScreen({ navigation }) {
  return (
    <View style={{flex:1, justifyContent:'center',alignItems:'center'}} >
      <Text style={{fontSize:16}}>En cours de perfectionnement</Text>
      {/* <Button color={styles.mainColor} onPress={() => navigation.goBack()} title="Go back home" /> */}
    </View>
  );
}

const App = () => {
  useEffect(()=>{
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  },[]) 

  return (
    <NavigationContainer>
      <StatusBar 
        animated={true}
        backgroundColor='#040944'
      />
     <Drawer.Navigator initialRouteName="home" 
    
    screenOptions={{
      headerTintColor: "white",
      headerShown:true,
      swipeEnabled:true,
      gestureEnabled:true,
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: styles.mainColor,
        borderTopColor:'#ef5300',
        borderTopWidth:2,
        borderBottomColor:'#ef5300',
        borderBottomWidth:2,
      },
      
      drawerInactiveBackgroundColor:'transparent',
      drawerActiveBackgroundColor:'transparent',
      drawerActiveTintColor:styles.mainColor,
      
    }} >
      <Drawer.Screen name="home"  component={HomeScreen} options={{title:'Accueil', headerTitle: ()=><Image  style={{height:45,width:45}} source={require('./src/logo.png')} />, drawerIcon: ({ focused, size }) => (<Icon color={focused? styles.mainColor:'gray'} name="home" size={size} />) }} />
      <Drawer.Screen name="about" component={NotificationsScreen} options={{ title: 'A propos', drawerIcon: ({ focused, size }) => (<Icon color={focused? styles.mainColor:'graylo '} name="info-circle" size={size} />) }} />
    </Drawer.Navigator>

    </NavigationContainer>

  );
};



export default App;
