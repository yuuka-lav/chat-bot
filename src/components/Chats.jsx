import React from 'react'
import { Chat } from './index'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles(() => (
  createStyles({
    'chats': {
      height: 380,
      padding: '0',
      // 380以上になったときスクロールバーを出す
      overflow: 'auto'
    }
  })
));


const Chats = (props) => {
  const classes = useStyles();

  return(
    <List className={classes.chats} id={'scroll-area'} >
      { props.chats.map((chat, index) => {
        return(
          < Chat 
            text={chat.text}
            type={chat.type}
            key={index.toString()}
          />
        )
      })}
    </List>
  )
}
export default Chats