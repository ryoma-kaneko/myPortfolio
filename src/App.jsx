import React from 'react';
import  './asets/styles/style.css'
import {AnswersList,Chats} from './compornents/index'
import FormDialog from './compornents/Forms/FormDialog';
import {db} from './firebase/index'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      answers:[],
      chats:[],
      currentId:"init",
      dataset: {},
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClickOpen = this.handleClickOpen(this)
  }
  //次のquestionとanswersを表示される
  desplayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question'
    })
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }
  //問い合わせ用のモーダルの開閉
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  
  // 選択されたanswersに応じて処理を振り分ける
  selectAnswer = (selectedAnswser,nextQuestionId) => {
    switch(true){
        //一番初めのanswersの取得
      case (nextQuestionId === 'init'):
        setTimeout(() => this.desplayNextQuestion(nextQuestionId),500)
        break;

        //nextQuestionIdが外部リンクの時の処理
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a')
        a.href = nextQuestionId
        //外部リンクを別タブで開く処理
        a.target = '_brank'
        a.click()
      break;
      //nextQuestionIdが'contact'の時に問い合わせ用モーダルを開く
      case(nextQuestionId === 'commit'):
        this.setState({ open: true })
      break;
      
      default:
        const chats = this.state.chats
        chats.push({
          text: selectedAnswser,
          type: 'answer'
        })
        this.setState({ chats: chats })

        setTimeout(() => this.desplayNextQuestion(nextQuestionId),1000)
      break;

    }
  }

  initDataset = (dataset) => {
    this.setState({dataset: dataset})
  }

  componentDidMount(){
  //非同期処理の制御　DBのデータを取得してから、次の処理を行う
  (async() => {
    const dataset = this.state.dataset
    await db.collection('questions').get().then(snapshots => {
      snapshots.forEach(doc => {
        const id = doc.id
        const data = doc.data()
        dataset[id] = data
      })
    })
    this.initDataset(dataset)
    const initAnswer = ""
    this.selectAnswer(initAnswer,this.state.currentId)
  })()
  }
  componentDidUpdate(){
    //自動スクロール
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea){
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  render(){
    return(
      <section className = "c-section">
        <div className = "c-box">
          <Chats chats = {this.state.chats}/>
          <AnswersList answers = {this.state.answers} select = {this.selectAnswer}/>
        　<FormDialog open = {this.state.open} handleClose = {this.handleClose}/>
        </div>
      </section>
    )
  }
}