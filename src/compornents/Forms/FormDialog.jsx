import React,{useCallback,useState} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextImput from './TextImput'
const FormDialog = (props) => {
    const [task,setTask] = useState("")
    const [desc,setDesc] = useState("")

    const imputTask = useCallback((event) => {
        setTask(event.target.value)
    },[setTask])

    const imputDecs = useCallback((event) => {
        setDesc(event.target.value)
    },[setDesc])

    //問い合わせ内容を送信する処理
    const submitForm = () => {
        const payload = {
            text: '今日の学習目標\n' +
                'タスク：' + task + '\n' + 
                '学習内容\n' + desc
        }
        const url = 'https://hooks.slack.com/services/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'

        fetch(url,{
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(() => {
            alert('送信が完了しました！今日も頑張りましょう！')
            setTask("")
            setDesc("")            
            return props.handleClose()
        })
    }
        return(
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">今日の学習内容</DialogTitle>
                <DialogContent>
                    <TextImput 
                        label = {"タスク"} multiline = {false} rows = {1}
                        value = {task} type = {"text"} onChange = {imputTask}
                    />                    
                    <TextImput
                        label={"学習内容"} multiline={true} rows={5}
                        value={desc} type={"text"} onChange={imputDecs}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        キャンセル
                    </Button>
                    <Button onClick={submitForm} color="primary" autoFocus>
                        送信する
                    </Button>
                </DialogActions>
            </Dialog>
        )
}

export default FormDialog