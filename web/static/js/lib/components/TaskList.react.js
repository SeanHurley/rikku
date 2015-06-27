 import React from 'react'
 import Task from './Task.react'

 export default class TaskList extends React.Component {

   render() {
     return (
       <ul style={{textAlign: 'left'}}>{
         this.props.data
           .sortBy(t => t.date)
           .map(t =>
             <Task key={t.id}
                    title={t.title}
                    info={t.info}
                    length={t.length} />)
       }</ul>
     )
   }
 }
