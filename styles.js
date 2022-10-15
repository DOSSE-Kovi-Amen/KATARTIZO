
import {
    StyleSheet
} from 'react-native';


export const styles = StyleSheet.create({
    mainColor:'#040944',

    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    bottomButton: {
        width: 20,
        height: 20
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    input: {
        borderBottomWidth: 2,
        padding: 10,
        borderRadius:5,
        fontSize:18,
      },
      inputDesc: {
        borderBottomWidth: 2,
        borderRadius:5,
        padding: 10,
        fontSize:18
      },
      tinyLogo: {
        width: 50,
        height: 50,
      },
      container:{
        margin: 12,

      },
      none:{
        display:'none',
      },
    item: {
        backgroundColor: 'white',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 5,
        margin: 8,
        padding: 12,
        shadowOpacity:1,
        shadowColor:'black',
        elevation:4
    },
    error:{
        borderBottomColor:'red'
    }
});