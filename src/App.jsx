import React, { useState, useCallback, useEffect } from 'react';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index'
import Form from './components/Forms/Form';
import { db } from './firebase/index'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { IconButton, CssBaseline } from '@material-ui/core';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  section: {
    position: "relative",
    height: "100vh",
    width: "90%",
    margin: "auto"
  },
  box: {
    border: "1px solid rgba(0,0,0,0.3)",
    borderRadius: "4px",
    boxSizing: "border-box",
    height: 592,
    maxWidth: 432,
    padding: "0 1rem",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
})

const App = () => {
  const classes = useStyles();
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState('init');
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "on" ? true : false
  );

  const handleDarkModeOn = () => {
    localStorage.setItem("darkMode", "on");
    setDarkMode(true);
  };
  const handleDarkModeOff = () => {
    localStorage.setItem("darkMode", "off");
    setDarkMode(false);
  };

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    }
  });

  
  useEffect(() => {
    (async () => {
      const initDataset = {};
      await db.collection('questions').get().then( snapshots =>{
        snapshots.forEach(doc => {
          const id = doc.id
          const data  = doc.data()
          initDataset[id] = data
        })
      })
      setDataset(initDataset)
      displayNextQuestion(currentId, initDataset[currentId])
    })();
  // 一回だけ実行して欲しいので第二引数を渡している
  },[]);

  useEffect(() => { 
    const scrollArea = document.getElementById('scroll-area')
    // scrollAreaが存在していたら
    if (scrollArea) {
      // この書き方でscrollが常に下に行く
      scrollArea.scrollTop = scrollArea.scrollHeight;
    };
    // 第二引数を渡さないことで何度も呼び出される
  });

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })
    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case(/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        // 別タブで開くようになる
        a.target = '_blank';
        a.click();
        break;
      case(nextQuestionId === 'contact'):
        handleClickOpen();
        break;
      // init以外の時
      default:
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })
        // 遅延表示させる
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000);
        break;
    }
  }

  // 新しくchatに加わる
  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }

  const handleClickOpen = () => {
    setOpen(true) 
  };

  const handleClose = useCallback(() => {
    setOpen(false) 
  }, [setOpen]);

  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <section className={classes.section}>
        {darkMode ? (
        <IconButton color="inherit" onClick={handleDarkModeOff}>
          <Brightness2Icon />
        </IconButton>
        ) : (
        <IconButton color="inherit" onClick={handleDarkModeOn}>
          <BrightnessHighIcon />
        </IconButton>
        )}
          <div className={classes.box}>
            < Chats chats={ chats }/>
            < AnswersList 
              answers={ answers }
              select={ selectAnswer }
            />
            < Form 
              open={ open }
              handleClose={ handleClose }
            />
          </div>
        </section>
      </ThemeProvider>
    );
}

export default App;