const taskInputDOM = document.querySelector('.task-input-a')
const taskInputDOM1 = document.querySelector('.task-input-b')
const formAlertDOM = document.querySelector('.form-alert')
const formDOM = document.querySelector('.task-form')
const eyeDOM = document.querySelector('.eye')
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
    const names = data.data.task.username
    console.log(data)
    if (name === names) {
      if (pass === data.data.task.password) {
        window.location.replace("/welcome.html");
      }
      else {
        formAlertDOM.classList.add("error")
        formAlertDOM.textContent = `Incorrect Password`
      }
    }

  }
  catch (error) {
    console.log(error)
    formAlertDOM.classList.add("error")
    formAlertDOM.textContent = `User Not Found`

  }
})

const myFunction = () => {

  if (taskInputDOM1.type === "password") {
    taskInputDOM1.type = "text";
    eyeDOM.classList.remove("fa-eye-slash")
    eyeDOM.classList.add("fa-eye")
  } else {
    taskInputDOM1.type = "password";
    eyeDOM.classList.remove("fa-eye")
    eyeDOM.classList.add("fa-eye-slash")
  }

}
