import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextImput from './TextImput'
export default class FormDialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            task: "",
            desc: ""
        }
        this.imputTask = this.imputTask.bind(this)
        this.imputDecs = this.imputDecs.bind(this)
    }
    imputTask = (event) => {
        this.setState({task: event.target.value})
    }
    imputDecs = (event) => {
        this.setState({ desc: event.target.value })
    }

    //問い合わせ内容を送信する処理
    submitForm = () => {
        const task = this.state.task
        const desc = this.state.desc

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
            alert('送信が完了しました！今日の頑張りましょう！')
            this.setState({
                task: "",
                desc: ""
            })
            return this.props.handleClose()
        })
    }

    render(){
        return(
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">今日の学習内容</DialogTitle>
                <DialogContent>
                    <TextImput 
                        label = {"タスク"} multiline = {false} rows = {1}
                        value = {this.state.task} type = {"text"} onChange = {this.imputTask}
                    />                    
                    <TextImput
                        label={"学習内容"} multiline={true} rows={5}
                        value={this.state.desc} type={"text"} onChange={this.imputDecs}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        キャンセル
          </Button>
                    <Button onClick={this.submitForm} color="primary" autoFocus>
                        送信する
          </Button>
                </DialogActions>
            </Dialog>
        )
    }
}