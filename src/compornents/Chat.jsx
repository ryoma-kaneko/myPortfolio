import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import System from '../asets/img/system.png'
import User from '../asets/img/user.png'


const Chat = (props) => {
    // チャットの回答がシステム側なのか、ユーザー側なのかを振り分ける

    const isQuestion = (props.type === 'question')
    const selectClass = isQuestion ? 'p-chat_row' : 'p-chat_reverse'
    return(
        <ListItem className = {selectClass}>
            <ListItemAvatar>
                {isQuestion ? (
                    <Avatar alt="icon" src={System} />
                )
                :(
                    <Avatar alt="icon" src={User} />
                )
                }
            </ListItemAvatar>
            <div className= "p-chat__bubble ">
                {props.text}
            </div>
        </ListItem>
    )
}

export default Chat