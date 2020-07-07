import React from 'react';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index'
import defaultDataset from './dataset';
import Form from './components/Forms/Form';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: defaultDataset,
      open: false
    }
    // 子供にコールバック関数を渡したい時はrenderされるたびに新しく生成されるのを防ぐため
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
  }

  componentDidMount() {
    const initAnswer = '';
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  componentDidUpdate(prevProps, prevState, snapshot ) {
    const scrollArea = document.getElementById('scroll-area')
    // scrollAreaが存在していたら
    if (scrollArea) {
      // この書き方でscrollが常に下に行く
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      chats: chats,
      answers: this.state.dataset[nextQuestionId].answers,
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch(true) {
      case(nextQuestionId === 'init'):
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
      case(/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        // 別タブで開くようになる
        a.target = '_blank';
        a.click();
        break;
      case(nextQuestionId === 'contact'):
        this.handleClickOpen();
        break;
      // init以外の時
      default:
        // 空の initChats にchatの内容を入れ込む
        const initChats = this.state.chats;
        initChats.push({
          text: selectedAnswer,
          type: 'answer'
        })
        this.setState({
            chats: initChats
        })
        // 遅延表示させる
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000);
        break;
    }
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  // 一番初めにrenderがはしる answersは空の状態
  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          < Chats chats={ this.state.chats }/>
          < AnswersList 
            answers={ this.state.answers }
            select={ this.selectAnswer }
          />
          < Form 
            open={this.state.open}
            handleClose={this.handleClose}
          />
        </div>
      </section>
    );
  }
}

