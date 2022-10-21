import React from 'react';
import {
  SafeAreaView, Text, View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LinkTab from '../postTab';
import Publier from '../addPostTab';
import { styles } from '../styles';
 

export default function HomeScreen(){
    const Tab = createMaterialTopTabNavigator();

    return (

        <Tab.Navigator 
        screenOptions={{
          tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
          tabBarActiveTintColor: styles.mainColor,
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle:{backgroundColor:styles.mainColor}
        }}
      >
        <Tab.Screen name="Liens" component={LinkTab} />
        <Tab.Screen name="Publier" component={Publier} />
        
      </Tab.Navigator>
           
 
   );
}