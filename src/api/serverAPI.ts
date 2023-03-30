import axios from 'axios'

export const fetchTasks = async () => {
    const { data } = await axios.get('/api/task')

    const tasks = data.map((item:PersonTaskRaw) => {
        const tasks = JSON.parse(item.tasks)
        return {...item, tasks}
    })
    
    return tasks
}

export const patchTasks = async (donatingPerson:PersonTaskType, receivingPerson:PersonTaskType, taskIndex:number) => {
    const { data } = await axios.patch('/api/task', { 
        donatingPerson, 
        receivingPerson, 
        taskIndex }) as PatchType
        const { updatedDonor, updatedReceiver } = data
    
    return {
        updatedDonorTasks: updatedDonor.tasks,
        updatedReceiverTasks: updatedReceiver.tasks
    }
}

export const addTasks = async (updatedUser: PersonTaskType) => {
    const res = await axios.post('/api/task', updatedUser)
    return res.data
}