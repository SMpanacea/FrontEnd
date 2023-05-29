import React, {useState, useRef} from 'react'
import {ScrollView} from 'react-native'

import Message from './Message';
import {theme} from '../theme';

const MessageList = ({conversations}) => {
    const scrollViewRef = useRef(); // 스크롤 뷰를 조작하기 위한 ref를 생성...

    const getImportantForAccessibility = () => {
        console.log("getImportantForAccessibility", conversations)
        if (Array.isArray(conversations) && conversations.length === 0) {
          return 'no-hide-descendants';
        } else {
          return 'yes';
        }
      };

    return (
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme.colors.white }}
        ref={scrollViewRef}
        onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });// 스크롤 뷰의 컨텐츠 크기가 변경되면 스크롤을 자동으로 맨 아래로 이동!
        }}
        importantForAccessibility={getImportantForAccessibility()}
        >
        {conversations.map((conversation, index) => (
            <React.Fragment key={index} >
            {conversation.map((message, messageIndex) => (
                <Message
                key={messageIndex}
                time={message.time}
                isLeft={message.role !== 'user'}//user가 아니면 왼쪽에 위치하도록!
                message={message.content}
                />
            ))}
            </React.Fragment>
        ))}
        </ScrollView>
    );
}

export default MessageList;