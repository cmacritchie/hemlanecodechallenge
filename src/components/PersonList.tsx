import React, { useState } from 'react'
import PersonTask from './PersonTask'


const defaultPersonList = [
    {
        name:'Mike',
        tasks:['apple', 'banana', 'orange']
    },
    {
        name:'Craig',
        tasks:['celery', 'carrot', 'bike']
    },
    {
        name:'Steve',
        tasks:['puck', 'stick', 'skates']
    }
]


const PersonList = () => {

    const [personState, setPersonState] = useState(defaultPersonList)
    const handleMoveTask = (task:string, taskIndex:number, direction:number, personIndex:number) => {
        const donatingPersonTask = personState[personIndex]
        let receivingPersonIndex = personIndex + direction
        if (receivingPersonIndex > personState.length -1) {
            console.log("wrap right")
            receivingPersonIndex = 0
        }
        else if (receivingPersonIndex < 0) {
            console.log("wrap left")
            receivingPersonIndex = personState.length - 1
        }
        
        const receivingPersonTask = personState[receivingPersonIndex]

        donatingPersonTask.tasks.splice(taskIndex, 1)
        receivingPersonTask.tasks.splice(taskIndex, 0, task)

        let updatedPersonState = personState
        updatedPersonState.splice(personIndex, 1, donatingPersonTask)
        updatedPersonState.splice(receivingPersonIndex, 1, receivingPersonTask)

        setPersonState([...updatedPersonState])
    }

    const handleAddNewTask = (personIndex:number) => {
        let updatedPersonState = personState
        const newTask = prompt("Please enter a new Task") as string
        console.log(newTask)
        const updatePerson = personState[personIndex]
        updatePerson.tasks.push(newTask)
        updatedPersonState.splice(personIndex, 1, updatePerson)
        setPersonState([...updatedPersonState])

    }

  return (
    <div className='grid grid-cols-3 gap-3'>
        {personState.map((person, i) => {
            return(
                <div className='border' key={person.name}>
                    <PersonTask
                        name={person.name} 
                        tasks={person.tasks} 
                        onMoveTask={(task, taskIndex, direction) => handleMoveTask(task, taskIndex, direction, i)}
                        />
                    <button className='border' onClick={() => handleAddNewTask(i)}>Add New Task</button> 
                </div>
            )
        })
    }
    </div>
  )
}

export default PersonList