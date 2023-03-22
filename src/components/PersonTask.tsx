import React from 'react'

type Props = {
    name: string
    tasks: string []
    onMoveTask: (task:string, taskIndex:number, direction:number) => void
}

const PersonTask: React.FC<Props> = ({ name, tasks, onMoveTask }) => {
  
    const renderTaskRow = (task:string, taskIndex:number) => {
        return (
            <div key={task} className='flex justify-between'>
                <button onClick={() => onMoveTask(task, taskIndex, -1)}>⬅️</button>
                <div>{task}</div>
                <button onClick={() => onMoveTask(task, taskIndex, 1)}>➡️</button>
            </div>
        )
    }
  
  
    return (
    <div>
        <p>{name}</p>
        {tasks.map((task, i) => renderTaskRow(task, i))

        }
    </div>
  )
}

export default PersonTask