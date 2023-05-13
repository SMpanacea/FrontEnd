import React, {useState, useRef} from 'react'
import {ScrollView} from 'react-native'

import Message from './Message';
import {theme} from '../theme';

const MessageList = ({conversations}) => {
    const scrollViewRef = useRef(); // 스크롤 뷰를 조작하기 위한 ref를 생성...

    return (
        <ScrollView
        style={{ backgroundColor: theme.colors.white }}
        ref={scrollViewRef}
        onContentSizeChange={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });// 스크롤 뷰의 컨텐츠 크기가 변경되면 스크롤을 자동으로 맨 아래로 이동!
        }}
        >
        {conversations.map((conversation, index) => (
            <React.Fragment key={index}>
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

// const MessageList = () => {
//     const [messages, setMessages] = useState([
//         {
//             user: 0,
//             time: '12:00',
//             content: '야'
//         },{
//             user: 1,
//             time: '12:01',
//             content: '뭐'
//         },{
//             user: 0,
//             time: '12:02',
//             content: '뭐하냐'
//         },{
//             user: 1,
//             time: '12:03',
//             content: '맞춰봐'
//         },{
//             user: 0,
//             time: '12:04',
//             content: '...'
//         },
//     ]);

//     const user = useRef(0);
//     const scrrollView = useRef();
    
//     return (
//         // <ScrollView style={{backgroundColor: theme.colors.white}}
//         //     ref={ref => scrrollView.current = ref}
//         //     onContentSizeChange={() => {
//         //         ScrollView.current.scrollToEnd({ animated: true})
//         //     }}
//         // >
//         <ScrollView
//             style={{backgroundColor: theme.colors.white}}
//             ref={scrrollView}
//             onContentSizeChange={() => {
//                 scrrollView.current.scrollToEnd({animated: true})
//             }}
//             >
//             {messages.map((message, index) => (
//                 <Message key={index} time={message.time} isLeft={message.user !== user.current} message={message.content}/>
//             ))}
//         </ScrollView>
//     );
        
// };

export default MessageList;