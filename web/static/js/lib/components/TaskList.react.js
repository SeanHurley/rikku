 import React from 'react'
 import Task from './Task.react'

 export default class TaskList extends React.Component {

   render() {
     return (
       <div>
        <h3>{this.props.date.year + "-" + this.props.date.month + "-" + this.props.date.day}</h3>
         <ul style={{textAlign: 'left'}}>{
           this.props.data
             .sortBy(t => t.inserted_at)
             .reverse()
             .map(t =>
               <Task key={t.id}
                      title={t.title}
                      info={t.info}
                      length={t.length} />)
         }</ul>
       </div>
     )
   }
 }
