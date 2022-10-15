/**
 * @format
 */
 import { AppRegistry } from 'react-native';
 import App from './App';
 import { name as appName } from './app.json';
 import database from '@react-native-firebase/firestore';
 import messaging from '@react-native-firebase/messaging';

 async function bootstrap() {
     await database().settings({
         persistence: true, // disable offline persistence
     });
 }
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

 AppRegistry.registerComponent(appName, () => App);
 