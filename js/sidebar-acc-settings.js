import { profileIconHeader, currentUser, signedInMessageModal, blogData } from './main.js'
import { updateCommentSettingsIcons, updateProfileIcons } from './update-iu.js'

const sideBarAccSettingsSection = document.querySelector('.sidebar-account-settings-section')
const sideBarAccSettingsUsername = document.getElementById('sidebar-acc-settings-username')
const sideBarAccSettingsEmail = document.getElementById('sidebar-acc-settings-email')
const closeSideBarAccSettings = document.querySelector('.close-sidebar-acc-settings-icon')

export function showHideSideBarAccSettings() {
    profileIconHeader.addEventListener('click', () => {
        sideBarAccSettingsSection.classList.toggle('show')
        if(sideBarAccSettingsSection.classList.contains('show')) {
            document.body.classList.add('hide-screen')
        } else {
            document.body.classList.remove('hide-screen')
        }

        if(currentUser) {
            sideBarAccSettingsUsername.innerHTML = currentUser.username
            sideBarAccSettingsEmail.innerHTML = currentUser.emailAddress
        }
    })
    closeSideBarAccSettings.addEventListener('click', () => {
        sideBarAccSettingsSection.classList.remove('show')
        document.body.classList.remove('hide-screen')
    })
}

export function logOutAcc() {
    sideBarAccSettingsSection.classList.remove('show')
    document.body.classList.remove('hide-screen')
    updateProfileIcons('logOut')
    signedInMessageModal.classList.add('hide')
}

export function deleteAccount() {
    const accountIndex = blogData.accounts.findIndex(acc => acc.profileId === currentUser.profileId)
    blogData.accounts.splice(accountIndex, 1)
    logOutAcc()
    updateCommentSettingsIcons('logOut')
}