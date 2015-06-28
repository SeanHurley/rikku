import React from 'react'
import TaskViewActions from '../actions/TaskViewActions'

export default class DateChange extends React.Component {
  onClickBack(e) {
    TaskViewActions.dateBack();
  }

  onClickForward(e) {
    TaskViewActions.dateForward();
  }

  render() {
    return (
      <div style={{display: "inline-block"}}>
        <input style={{float: "left", width: "100px", height: "40px", fontSize: "24px"}} type="button" value="&larr;" onClick={this.onClickBack.bind(this)} />
        <input style={{float: "right", width: "100px", height: "40px", fontSize: "24px"}} type="button" value="&rarr;" onClick={this.onClickForward.bind(this)} />
      </div>
    )
  }
}
