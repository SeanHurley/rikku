import React from 'react'

export default class Task extends React.Component {
  render() {
    return <li><strong>{this.props.title}</strong> &mdash; {this.props.length} &mdash; {this.props.info}</li>
  }
}

