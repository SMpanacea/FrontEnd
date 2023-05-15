// 내가 쓴 게시글 리스트 화면
import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Image, Button, Animated} from 'react-native';

export default function MyBoardsList () {
    // const [myPosts, setMyPosts] = useState([]);
    // useEffect(() => {
    //     // 내가 쓴 글을 가져오는 API 호출
    //     const fetchMyPosts = async () => {
    //       const response = await fetch('https://example.com/api/myposts');
    //       const data = await response.json();
    //       setMyPosts(data);
    //     };
    
    //     fetchMyPosts();
    //   }, []);
    // return (
    //     <View style={styles.container}>
    //       <Text style={styles.title}>내가 쓴 글 목록</Text>
    //       {myPosts.length > 0 ? (
    //         <FlatList
    //           data={myPosts}
    //           keyExtractor={(item) => item.id.toString()}
    //           renderItem={({ item }) => (
    //             <View style={styles.postContainer}>
    //               <Text style={styles.postTitle}>{item.title}</Text>
    //               <Text style={styles.postContent}>{item.content}</Text>
    //             </View>
    //           )}
    //         />
    //       ) : (
    //         <Text>내가 쓴 글이 없습니다.</Text>
    //       )}
    //     </View>
    //   );
    // };

    const [myPosts, setMyPosts] = useState([
        {
          id: 1,
          title: '첫 번째 글',
          content: '내가 쓴 첫 번째 글의 내용.',
          createdAt: new Date(),
        },
      ]);

        // 15개의 더미 데이터 생성
  for (let i = 2; i <= 15; i++) {
    myPosts.push({
      id: i,
      title: `글제목 ${i}`,
      content: `내가 쓴 ${i}번째 의 내용`,
      createdAt: new Date(),
    });
  }

      return (
    <View style={styles.container}>
      <FlatList
        data={myPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            <Text style={styles.date}>
              {item.createdAt.toLocaleDateString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    postContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    content: {
      fontSize: 16,
      marginBottom: 8,
    },
    date: {
      fontSize: 14,
      color: '#888',
    },
  });