import React, { useEffect, useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import NoProfile from '../assets/img/no-profile.png'
import Pfimage from '../assets/img/pf-image.jpg'
import { Translation } from 'react-i18next';

const Chat = (props) => {
  const isQuesion = (props.type === 'question');
  // trueだったら 'p-chat__row'を返す
  const classes = isQuesion ? 'p-chat__row' : 'p-chat__reverse'

  return(
    <ListItem className={classes}>
      <ListItemAvatar>
        { isQuesion ? (
          <Avatar alt="icon" src={ Pfimage } />
        ) : (
          <Avatar alt="icon" src={ NoProfile } />
        )}
      </ListItemAvatar>
      <div className='p-chat__bubble'>
        <Translation>
          {(t) => <>{t(props.text)}</>}
        </Translation>
      </div>
    </ListItem>
  )
}


export default Chat