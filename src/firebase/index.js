import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './config'

//自分のプロジェクトの設定値を使って初期化する
firebase.initializeApp(firebaseConfig)

//firestoreのデータを使えるように
export const db = firebase.firestore()