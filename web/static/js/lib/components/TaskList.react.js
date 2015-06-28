 import React from 'react'
 import Task from './Task.react'

 export default class TaskList extends React.Component {

   render() {
     return (
       <div>
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
