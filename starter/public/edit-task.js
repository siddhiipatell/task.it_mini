const taskInputDOM = document.querySelector('.task-input-a')
const taskInputDOM1 = document.querySelector('.task-input-b')

const formDOM = document.querySelector('.task-form')

// let tempName

// const showTask = async () => {
//   try {
//     const {
//       data: { task },
//     } = await axios.get(`/api/v1/tasks/${id}`)
//     const { _id: taskID, completed, name } = task

//     taskIDDOM.textContent = taskID
//     taskNameDOM.value = name
//     tempName = name
//     if (completed) {
//       taskCompletedDOM.checked = true
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

// showTask()

// editFormDOM.addEventListener('submit', async (e) => {
//   editBtnDOM.textContent = 'Loading...'
//   e.preventDefault()
//   try {
//     const taskName = taskNameDOM.value
//     const taskCompleted = taskCompletedDOM.checked

//     const {
//       data: { task },
//     } = await axios.patch(`/api/v1/tasks/${id}`, {
//       name: taskName,
//       completed: taskCompleted,
//     })

//     const { _id: taskID, completed, name } = task

//     taskIDDOM.textContent = taskID
//     taskNameDOM.value = name
//     tempName = name
//     if (completed) {
//       taskCompletedDOM.checked = true
//     }
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.textContent = `success, edited task`
//     formAlertDOM.classList.add('text-success')
//   } catch (error) {
//     console.error(error)
//     taskNameDOM.value = tempName
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.innerHTML = `error, please try again`
//   }
//   editBtnDOM.textContent = 'Edit'
//   setTimeout(() => {
//     formAlertDOM.style.display = 'none'
//     formAlertDOM.classList.remove('text-success')
//   }, 3000)
// })





formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value
  const pass = taskInputDOM1.value
  try {
    const data = await axios.get(`/api/v1/tasks/users/${name}`)
    const names=data.data.task.username
    console.log(data)
    if (name===names){
      if(pass === data.data.task.password){
        window.location.replace("/welcome.html");
      }
    }
  }
    catch (error) {
      console.log(error)
  } 
})

