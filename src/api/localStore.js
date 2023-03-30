export const saveLocal = (personState) => {
//stringify
const personStateString = JSON.stringify(personState)
//set local
localStorage.setItem("personTask",personStateString)
}

export const setLocal = () => {
//parse string
const savedState = localStorage.getItem("personTask")

///retun object
return JSON.parse(savedState)

}