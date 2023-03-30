type PersonTaskType = {
    name:string
    tasks: [string]
}

type PersonTaskRaw = {
    name:string
    tasks:string
}

type PatchType = {
    data: {
        updatedDonor: {
            tasks: [string]
        },
        updatedReceiver: {
            tasks: [string]
        }
    }
}

type PostType = {
    data: PersonTaskType
}

type PatchTasksResponse = {
    updatedDonorTasks: [string]
    updatedReceiverTasks: [string]
}