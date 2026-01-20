import { errorMessageContactForm, contactFormInputs, contactFormTextareaMessage, emailPattern } from './main.js'

const emailInputFormSection = document.getElementById('email-input')
const sendMessageBtnFormSection = document.getElementById('send-message-btn')

export function sendMessageContactFormPage() {
    sendMessageBtnFormSection.addEventListener('click', () => {
        let allInputsValidated = false
        contactFormInputs.forEach(input => {
            if(input.value) {
                allInputsValidated = true
            } else {
                allInputsValidated = false
            }
        })
        if(allInputsValidated && emailPattern.test(emailInputFormSection.value) && contactFormTextareaMessage.value) {
            errorMessageContactForm.textContent = 'Your message was sent successfully'
            errorMessageContactForm.style.color = '#208AAE'
            contactFormInputs.forEach(input => {
                input.value = ''
            })
            emailInputFormSection.value = ''
            contactFormTextareaMessage.value = ''
            console.log('All fields are validated, message sent correctly')
        } else {
            errorMessageContactForm.textContent = 'Fill all blanks correctly before sending your message'
            errorMessageContactForm.style.color = '#BF0603'
            console.log('Fill all blanks correctly before sending the message')
        }
        errorMessageContactForm.scrollIntoView({
            behavior: 'smooth',
        })
    })
}