import { saveLocalStorage } from "./local-storage.js"

const toggleBox = document.querySelector('.toggle-box')
const toggleCircle = document.querySelector('.toggle-circle')
const toggleCheckbox = document.querySelector('.toggle-checkbox')


export function lightDarkMode() {
    toggleCheckbox.addEventListener('change', () => {
        if(toggleCheckbox.checked) {
            toggleMode('dark')
        } else {
            toggleMode('light')
        }
    })
}

export function toggleMode(mode) {
    if(mode === 'dark') {
        toggleCircle.style.left = '34px'
        toggleCircle.style.backgroundColor = 'white'
        toggleBox.style.backgroundColor = 'black'
        console.log('Dark mode activated')
        document.body.classList.add('dark-mode')
    } else if (mode === 'light'){
        toggleCircle.style.left = '5px'
        toggleCircle.style.backgroundColor = 'white'
        toggleBox.style.backgroundColor = 'darkgrey'
        console.log('Light mode activated')
        document.body.classList.remove('dark-mode')
    }
    saveLocalStorage('mode', mode)
}