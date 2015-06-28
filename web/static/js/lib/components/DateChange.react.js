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
      <div>
        <div onClick={this.onClickBack.bind(this)}>
          Back
        </div>
        <div onClick={this.onClickForward.bind(this)}>
          Forward
        </div>
      </div>
    )
  }
}
