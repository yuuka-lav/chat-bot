import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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
    // variant="contained"をoutlinedに変更
    <Button variant="outlined" className={classes.button} onClick={() => props.select(props.content, props.nextId)}>
      { props.content }
    </Button>
  )
}


export default Answer;