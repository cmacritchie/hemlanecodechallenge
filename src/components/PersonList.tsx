import React, { useState, useEffect } from 'react'
import PersonTask from './PersonTask'
import { fetchTasks, patchTasks, addTasks  } from '../api/serverAPI'

const PersonList = () => {

    const [personState, setPersonState] = useState<PersonTaskType[] | []>([])

    const callfetchTasks = async () => {
        const tasks = await fetchTasks()
        setPersonState(tasks)
    }

    useEffect(() => {
        callfetchTasks()
    },[])

    const handleMoveTask = async (taskIndex:number, direction:number, personIndex:number) => {
        const donatingPersonTask = personState[personIndex] as PersonTaskType
        let receivingPersonIndex = personIndex + direction
        if (receivingPersonIndex > personState.length -1) {
            receivingPersonIndex = 0
        }
        else if (receivingPersonIndex < 0) {
            receivingPersonIndex = personState.length - 1
        }
        
        const receivingPersonTask = personState[receivingPersonIndex] as PersonTaskType
        const { updatedDonorTasks, updatedReceiverTasks } =  await patchTasks(donatingPersonTask, receivingPersonTask, taskIndex )

        donatingPersonTask!.tasks = updatedDonorTasks
        receivingPersonTask!.tasks = updatedReceiverTasks

        let updatedPersonState = personState
        updatedPersonState.splice(personIndex, 1, donatingPersonTask)
        updatedPersonState.splice(receivingPersonIndex, 1, receivingPersonTask)
        setPersonState([...updatedPersonState])
    }

    const handleAddNewTask = async(personIndex:number) => {
        let updatedPersonState = personState

        const newTask = prompt("Please enter a new Task") as string
        const updatePerson = personState[personIndex]
        
        updatePerson.tasks.push(newTask)
        const updated = await addTasks(updatePerson)
        updatedPersonState.splice(personIndex, 1, { ...updatePerson, tasks:updated.tasks})

        setPersonState([...updatedPersonState])
    }

    if(personState.length === 0) {
        return <h5>Loading...</h5>
    }

  return (
    <div className='grid grid-cols-3 gap-3'>
        {personState.map((person, i) => {
            return(
                <div className='border' key={person.name}>
                    <PersonTask
                        name={person.name} 
                        tasks={person.tasks} 
                        onMoveTask={(taskIndex, direction) => handleMoveTask(taskIndex, direction, i)}
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