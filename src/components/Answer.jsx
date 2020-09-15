import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Translation } from 'react-i18next';

const useStyles = makeStyles(() => (
  createStyles({
    'button': {
      borderColor: '#41B6E6',
      color: '#41B6E6',
      fontWeight: 300,
      marginBottom: '5px',
      '&:hover': {
        backgroundColor: '#41B6E6',
        color: '#fff'
      }
    }
  })
));

const Answer = (props) => {
  const classes = useStyles();
  return (
    <Button variant="outlined" className={classes.button} onClick={() => props.select(props.content, props.nextId)}>
      <Translation>
        {(t) => <>{t(props.content)}</>}
      </Translation>
    </Button>
  )
}


export default Answer;