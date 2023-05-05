// import * as React from 'react';
// import { Avatar, Button, Card, Text } from 'react-native-paper';
// import { View} from 'react-native';

// import 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

// const navigation = useNavigation();
// const handlePress = (medicinedata) => {
//     console.log("itemSeq나와라@",medicinedata)
//     navigation.navigate('Detail', {medicinedatitemSeq: medicinedata})
//   }

// const MyComponent = ({medicinedata}) => (
    
//     <View>
//       {medicinedata.map((item, idx) => (
//         <Card key={idx}>
//           <Card.Title title={item.title} subtitle={item.subtitle} left={LeftContent} />
//           <Card.Content>
//             <Text variant="titleLarge">{item.title}</Text>
//             <Text variant="bodyMedium">{item.subtitle}</Text>
//           </Card.Content>
//           <Card.Cover source={{ uri: item.imageUri }} />
//           <Card.Actions>
//             {/* <Button onPress={() => console.log("취소")}>Cancel</Button> */}
//             <Button onPress={() =>  handlePress(medicinedata[idx].itemSeq)}>약 보러가기</Button>
//           </Card.Actions>
//         </Card>
//       ))}
//     </View>
//   );
  

// export default MyComponent;


import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// 아이콘
import Icon from 'react-native-vector-icons/FontAwesome';

const LeftContent = props => <Avatar.Icon {...props} icon="pill" />

const MyComponent = ({medicinedata}) => {
  const navigation = useNavigation();
  
  const handlePress = (itemSeq) => {
    console.log("itemSeq나와라@", itemSeq)
    navigation.navigate('Detail', {medicinedatitemSeq: itemSeq})
  }

  return (
    <View>
      {medicinedata.map((item, idx) => (
        <Card key={idx} style={{marginBottom:30}}>
          <Card.Title title={medicinedata[idx].itemName} subtitle={medicinedata[idx].updateDe} left={LeftContent} />
          <Card.Content>
            {/* <Text variant="titleLarge">{medicinedata[idx].updateDe}</Text> */}
            {/* <Text variant="bodyMedium">{medicinedata[idx].updateDe}</Text> */}
          </Card.Content>
            {
                medicinedata[idx].itemImage === null?<Icon style={styles.mediicon} name="medkit" size={70} color="black" />:
                <Card.Cover source={{uri : medicinedata[idx].itemImage}}/>
            }
          {/* <Card.Cover source={{ uri: item.imageUri }} /> */}
          <Card.Actions>
            {/* <Button onPress={() => console.log("취소")}>Cancel</Button> */}
            <Button onPress={() => handlePress(medicinedata[idx].itemSeq)}>약 보러가기</Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    // container: {
    //   width: width *0.82,
    //   height: height,
    // },
    medibox: {
      flex:1,
      flexDirection: 'row',
      alignItems: "center",
      borderWidth:1,
      borderRadius:10,
      marginBottom: '10%',
      padding:5,
      },
      mediicon:{
      // borderWidth:1,
      // borderColor:'red',
      padding:2,
      justifyContent: "center",
      alignItems: "center",
      marginRight:15,
      },
      mediimage:{
        width: 100 , 
        height: 100,
        resizeMode:"contain",
        
      },
      medititletext:{
          // borderWidth:1,
          // borderColor:'blue',
          width:'90%',
          margin:10,
      // justifyContent: "center",
      // alignItems: "center",
      },
      meditext:{
      // borderWidth:1,
      // justifyContent: "center",
      // alignItems: "center",
      },
  });
  

export default MyComponent;
