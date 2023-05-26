import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { View, StyleSheet, AccessibilityInfo } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 아이콘
import LottieView from 'lottie-react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="pill" backgroundColor='#51868C' />

const MyComponent = ({ medicinedata, bookmark, setBookmark }) => {
  const navigation = useNavigation();
  console.log("bookmarkjksadhk", bookmark)
  const handlePress = (itemSeq, bookmark) => {
    console.log("itemSeq나와라@", itemSeq)
    console.log("bookmark13kjsd", bookmark)
    navigation.navigate('Detail', { medicinedatitemSeq: itemSeq, bookmark: bookmark, setBookmark: setBookmark })// bookmark, bookmarklist 변경하는 함수 그대로 MedicineDetail로 넘겨주는 통로임!!!!!! 
  }

  return (
    <View>

      {medicinedata.map((item, idx) => (
        <Card key={idx} style={{ marginBottom: 30, backgroundColor: '#f5fbfc', }} onPress={() => handlePress(medicinedata[idx].itemSeq, bookmark)}
          accessible={true} accessibilityElementsHidden={true}>
          <View accessibilityLabel={`${medicinedata[idx].itemName.split("(")[0]}`} accessible={true}>
            <Card.Title title={medicinedata[idx].itemName} subtitle={medicinedata[idx].updateDe} left={LeftContent} accessible={false} />
            <Card.Content accessible={false} />
            {
              medicinedata[idx].itemImage === null ?
                <LottieView
                  source={require('../assets/Lottie Animation.json') /** 움직이는 LottieView */}
                  style={styles.lotteView}
                  autoPlay loop
                /> :
                <Card.Cover source={{ uri: medicinedata[idx].itemImage }} />
            }
            <Card.Actions accessible={false} />
          </View>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  lotteView: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1.5, // Adjust this value depending on the aspect ratio of your Lottie animation
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 10,
  },
  medibox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: '10%',
    padding: 5,
  },
  mediicon: {
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  mediimage: {
    width: 100,
    height: 100,
    resizeMode: "contain",

  },
  medititletext: {
    width: '90%',
    margin: 10,
  },
});

export default MyComponent;
