// 약 상세 화면

import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Button, Animated} from 'react-native';

// image import
import Medi from '../../assets/medi.png';

// 즐겨찾기 icon
import BookMarkButton from '../../Components/BookMarkButton';



function MedicineDetail({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titlebutton}>
          <Text style={styles.title}>약 상세페이지  </Text>
          <BookMarkButton />
        </View>

        <View style={styles.imagebox}>
          <Image source={Medi} style={styles.image} />
        </View>

        <View style={styles.meditextbox}>
          <Text style={styles.meditexttitle}>
            약 이름
          </Text>
          
          <Text style={styles.meditextcontent}>
            약 상세 내용, 같이 복용하면 안되는 약,
            같이 복용해도 괜찮은 약,
            hi~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            또 뭐넣지 또 뭐가 들어가지 흠
          </Text>
        </View>
        
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    // borderBottomWidth:1,
    // borderBottomColor: 'black',
    width:'93%'
    // marginBottom: '15%',
  },
  titlebutton:{
    borderBottomWidth:1,
    borderColor:"blue",
    flexDirection: 'row',
    marginBottom: '15%',
  },
  imagebox:{
    flex:1,
    borderWidth:1,
    borderColor:'black',
    marginBottom:'10%',
  },
  image:{
    width: '100%',
    height: 150,
    resizeMode: "contain"
  },
  meditextbox:{
    borderWidth:1,
    borderColor:'black',
  },
  meditexttitle:{
    borderWidth:1,
    borderColor:'#800000',
    marginBottom:'5%',
  },
  meditextcontent:{
    borderWidth:1,
    borderColor:'#B22222',
  }
  
});

export default MedicineDetail;

