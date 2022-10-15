// import messaging from '@react-native-firebase/messaging';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';


// export async function RequestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//         console.log('Authorization status:', authStatus);
//     }
// }



// export const NotificationListener=()=>{

//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             'Notification caused app to open from background state:',
//             remoteMessage.notification,
//         );
        
//         navigation.navigate(remoteMessage.data.type);
//     });

//     // Check whether an initial notification is available
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if (remoteMessage) {
//                 console.log(
//                     'Notification caused app to open from quit state:',
//                     remoteMessage.notification,
//                 );
//                 setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//             }
//         });
//     messaging().onMessage(async remoteMessage => {
//         // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//     });
// }