import { fullPostSection, currentUser, signInModalSection, signUpModalSection, 
    errorMessageSignInModal, errorMessageSignUpModal, profileIconHeader, noProfileIconHeader } from './main.js'

export function updateCommentSettingsIcons(sessionType) {
    const fullPostComments = fullPostSection.querySelectorAll('.post-comment')
    if(!fullPostComments) return
    fullPostComments.forEach(comment => {
        const commentProfile = comment.querySelector('h4')
        const commentSettingsIcon = comment.querySelector('.comment-settings-icon')
        if(currentUser && currentUser.username === commentProfile.textContent) {
            if(sessionType === 'logOut') {
                commentSettingsIcon.classList.add('hide')
            } else {
                commentSettingsIcon.classList.remove('hide')
            }
        }
    })
}

export function updateSignInModalDetails(modalType) {
    if(modalType === 'signIn') {
        signInModalSection.classList.remove('hide')
        signUpModalSection.classList.add('hide')

        const signUpInputs = signUpModalSection.querySelectorAll('input')
        signUpInputs.forEach(input => {
            input.classList.remove('error-message-style')
            input.value = ''
        })
        errorMessageSignUpModal.textContent = ''
    }
    if(modalType === 'signUp') {
        signUpModalSection.classList.remove('hide')
        signInModalSection.classList.add('hide')

        const signInInputs = signInModalSection.querySelectorAll('input')
        signInInputs.forEach(input => {
            input.classList.remove('error-message-style')
            input.value = ''
        })
        errorMessageSignInModal.textContent = ''
    }
}

export function updateProfileIcons(sessionType) {
    if(sessionType === 'signIn') {
        noProfileIconHeader.classList.add('hide')
        profileIconHeader.classList.remove('hide')
        const noProfileIconComment = document.querySelector('.no-profile-icon-comment')
        const profileIconComment = document.createElement('i')
        profileIconComment.classList.add('fa-solid', 'fa-user', 'profile-icon-comment')
        if(noProfileIconComment) {
            noProfileIconComment.replaceWith(profileIconComment)
        }
    }
    if(sessionType === 'logOut') {
        noProfileIconHeader.classList.remove('hide')
        profileIconHeader.classList.add('hide')
        const newCommentSection = document.querySelector('.new-comment-section')
        let profileIconComment;
        if(newCommentSection) {
            profileIconComment = newCommentSection.querySelector('.profile-icon-comment')
        }
        const noProfileIconComment = document.createElement('i')
        noProfileIconComment.classList.add('fa-solid', 'fa-circle-user', 'no-profile-icon-comment')
        if(profileIconComment) {
            profileIconComment.replaceWith(noProfileIconComment)
        }
    }
}