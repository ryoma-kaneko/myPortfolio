import React,{useState,useCallback,useEffect} from 'react';
import  './asets/styles/style.css'
import {AnswersList,Chats} from './compornents/index'
import FormDialog from './compornents/Forms/FormDialog';
import {db} from './firebase/index'

const App = () => {
  const [answers,setAnswers] = useState([])
  const [chats, setChats] = useState([])
  const [currentId, setCurrentId] = useState("init")
  const [dataset, setDataset] = useState({})
  const [open, setOpen] = useState(false)

  //次のquestionとanswersを表示される
  const desplayNextQuestion = (nextQuestionId,nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })
      setAnswers(nextDataset.answers)
      setCurrentId(nextQuestionId)

  }
  //問い合わせ用のモーダルの開閉
  const handleClickOpen = () => {
    setOpen(true)
  };
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])  

  
  // 選択されたanswersに応じて処理を振り分ける
  const selectAnswer = (selectedAnswser,nextQuestionId) => {
    switch(true){
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
        handleClickOpen()
      break;
      
      default:
        addChats({
          text: selectedAnswser,
          type: 'answer'

        })
        setTimeout(() => desplayNextQuestion(nextQuestionId,dataset[nextQuestionId]),1000)
      break;

    }
  }

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }

  useEffect(() => {
    //非同期処理の制御 DBのデータを取得してから、次の処理を行う
    (async() => {
      const initDataset = {}

      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          initDataset[id] = data
        })
      })

      setDataset(initDataset)
      desplayNextQuestion(currentId,initDataset[currentId])

    })()
  },[])

  useEffect(() => {
    //自動スクロール
    const scrollArea = document.getElementById('scroll-area')
    if (scrollArea){
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })
  

    return(
      <section className = "c-section">
        <div className = "c-box">
          <Chats chats = {chats}/>
          <AnswersList answers = {answers} select = {selectAnswer}/>
        　<FormDialog open = {open} handleClose = {handleClose}/>
        </div>
      </section>
    )
  
}

export default App