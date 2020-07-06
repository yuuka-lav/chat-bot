import React from 'react';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index'
import defaultDataset from './dataset';

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

  }


  componentDidMount() {
    const initAnswer = '';
    this.selectAnswer(initAnswer, this.state.currentId)
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
        this.displayNextQuestion(nextQuestionId)
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

        this.displayNextQuestion(nextQuestionId)

        break;
    }
  }

  // 一番初めにrenderがはしる　answersは空の状態
  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          < Chats chats={ this.state.chats }/>
          < AnswersList 
            answers={ this.state.answers }
            select={ this.selectAnswer }
          />
        </div>
      </section>
    );
  }
}

