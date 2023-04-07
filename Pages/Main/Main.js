// 앱 들어가면 제일 먼저 보이는 화면
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';


const Main = () => {

    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    return (
        <View style={styles.container}>
        <View style={styles.topSpace}></View>
        <View>
          <Text style={styles.sectionSubtitle}> Panacea </Text>
        </View>
          <Calendar onDayPress={onDayPress} markedDates={{ [selectedDate]: { selected: true } }} />
          <View style={styles.middleSpace}></View>
          <Text>{selectedDate}</Text>
          
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#eaeaea',
    },
    topSpace: {
      height: 100, // 원하는 간격의 크기
    },
    middleSpace: {
      height: 30,
    },
    sectionSubtitle: {
      flex: 1,
      fontSize: 22,
      fontFamily: 'Bazzi',
      },
  });

export default Main