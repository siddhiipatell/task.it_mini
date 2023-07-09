const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const taskInputDOM1 = document.querySelector('.task-input-1')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value
  const pass = taskInputDOM1.value
  
  try {
    await axios.post(`/api/v1/tasks/users`, {username: name,
    password: pass})
    taskInputDOM.value = ''
    taskInputDOM1.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, user added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})