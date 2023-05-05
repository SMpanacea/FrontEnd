import React from 'react';
import { Header } from '@react-navigation/elements';
import { TouchableOpacity, StatusBar, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native'; 
const { width, height } = Dimensions.get('window');
// header위에 공백 없애기
import { SafeAreaView } from 'react-native';
function CustomHeader({ title, navigation }) {
  return (
    <View style={{
      // height: height * 32,
      // marginTop: height * 32,
      height:50,
      alignContent:'center', 
      alignItems:'center',
      flexDirection: 'row',
      backgroundColor:"red",
      paddingBottom: Platform.OS === 'ios' ? 20 : 0, // 안전 영역 고려

      }}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={{alignContent:'center', 
      alignItems:'center',}}>
          <Text style={{color:"black", marginLeft:"10%"}}>{title}</Text>
        </View>
        
    {/* <Header
      placement="center"
      statusBarHeight={StatusBar.currentHeight}
      leftComponent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>왜 안돼??</Text>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      }
      centerComponent={{
        text: title,
        style: { 
          fontWeight: 'bold',
          fontSize: 20,
          alignSelf: 'center',
          color: 'white'
        }
      }}
      containerStyle={{ backgroundColor: 'red' }}
    /> */}
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
      height: height * 32,
      marginTop: height * 32,
  },
  titleContainer: {
      height: '100%',
      justifyContent: 'center',
  },
  leftIcon: {
      position: 'absolute',
      top: 10,
      left: 5,
      justifyContent: 'center'
  },
  rightIcon: {
      position: 'absolute',
      bottom: 10,
      right: 5,
      justifyContent: 'center'
  }
})


export default CustomHeader;
