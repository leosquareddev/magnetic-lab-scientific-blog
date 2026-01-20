import { fetchData } from './fetching.js'
import { homeSectionsArr, homeSectionsObj } from './sections-selectors.js'
import { updateCommentSettingsIcons, updateSignInModalDetails, updateProfileIcons } from './update-iu.js'
import { lightDarkMode, toggleMode } from './light-dark-mode.js'
import { showHideSideBarAccSettings, logOutAcc, deleteAccount } from './sidebar-acc-settings.js'
import { handleNavPages } from './handle-nav-pages.js'
import { renderTeamSection } from './about-us-page.js'
import { sendMessageContactFormPage } from './contact-form-page.js'
import { renderFaqSection } from './faq-page.js'
import { saveLocalStorage, getLocalStorage } from './local-storage.js'

export let blogData = {}

export let currentUser = getLocalStorage('user')
export const profileIconHeader = document.querySelector('.profile-icon')
export const noProfileIconHeader = document.querySelector('.no-profile-icon')
export const fullPostSection = document.querySelector('.full-post-section')
export const signInModalSection = document.querySelector('.signin-modal-section')
export const signUpModalSection = document.querySelector('.signup-modal-section')
export const errorMessageSignInModal = document.getElementById('error-message-signin-modal')
export const errorMessageSignUpModal = document.getElementById('error-message-signup-modal')
export const firstSearchNavPageBtn = document.getElementById('first-search-nav-page-btn')
export const searchPostsPaginationSection = document.querySelector('.search-posts-pagination-section')
export const pageButtons = searchPostsPaginationSection.querySelectorAll('button')
export const errorMessageContactForm = document.getElementById('error-message-contact-form')
export const contactFormSection = document.querySelector('.contact-form-section')
export const contactFormInputs = contactFormSection.querySelectorAll('input')
export const contactFormTextareaMessage = contactFormSection.querySelector('textarea')
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener("DOMContentLoaded", async() => {
    const storedData = getLocalStorage('blogData')
    if(!storedData) {
        blogData = await fetchData()
        saveLocalStorage('blogData', blogData)
    } else {
        blogData = storedData
    }
    if(currentUser) {
        updateProfileIcons('signIn')
    } else if (currentUser === null) {
        updateProfileIcons('logOut')
    }
    renderCoverSection(blogData.posts)
    renderFeaturedSection(blogData.posts)
    renderSearchSection(blogData.posts, 0)
    firstSearchNavPageBtn.classList.add('is-post-page-active')
    renderPopularSection(blogData.posts)
    renderWeeklyBestSection(blogData.posts)
    renderEditorsPickSection(blogData.posts)
    handleNavPages()
    renderTeamSection(blogData.posts)
    sendMessageContactFormPage()
    renderFaqSection()

    homeSectionsArr.forEach(section => {
        const posts = section.querySelectorAll('.blog-post')
        posts.forEach(post => {
            post.addEventListener('click', () => {
                if(!post) return
                const dataId = Number(post.getAttribute('data-id'))
                const postObj = blogData.posts.find(post => post.postId === dataId)
                document.querySelector('main').classList.add('fade-out')
                setTimeout(() => {
                    document.querySelector('main').classList.remove('fade-out')
                    document.querySelector('main').classList.add('hide')
                    fullPostSection.classList.remove('hide')
                    renderFullPost(postObj)
                }, 1000);
                const header = document.querySelector('header')
                header.scrollIntoView({
                    behavior: 'smooth'
                })
            })
        })
    })
    let currentMode = 'light'
    currentMode = getLocalStorage('mode', currentMode)
    if(currentMode) {
        toggleMode(currentMode)
    }
    lightDarkMode()
    showHideSideBarAccSettings()
})

function renderCoverSection(arraySection) {
    const getFirst5Elements = arraySection.slice(1, 5)
    const displayPosts = getFirst5Elements.map(el => {
        return `
        <article class="cover-post blog-post" data-id="${el.postId}">
            <h1>${el.title}</h1>
            <p>${el.discipline}</p>
        </article>
        `
    }).join('')
    homeSectionsObj.coverPostsSection.innerHTML = displayPosts
}

function renderFeaturedSection(arraySection) {
    const filterPosts = arraySection.filter(el => el.featured)
    const displayPosts = filterPosts.map(el => {
        return `
        <article class="featured-post blog-post" data-id="${el.postId}">
            <img src="${el.img}">
            <div>
                <p>${el.discipline}</p>
                <h5>${el.title}</h5>
            </div>
        </article>
        `
    }).join('')
    homeSectionsObj.featuredPostsSection.innerHTML = displayPosts
}

const searchPostsSection = document.querySelector('.search-posts-section')

export function renderSearchSection(arraySection, startIndex = 0, count = 6) {
    let lastIndex = startIndex + count
    const copyArray = [...arraySection]
    const getElements = copyArray.reverse()
    const sliceElements = getElements.slice(startIndex, lastIndex)
    const displayPosts = sliceElements.map(el => {
        let disciplineClass = ''

        switch (el.discipline) {
            case 'Technology':
                disciplineClass = 'tech'
                break;
            case 'Chemistry':
                disciplineClass = 'chem'
                break
            case 'Physics':
                disciplineClass = 'phy'
                break
            case 'Biology':
                disciplineClass = 'bio'
                break
            case 'Astronomy':
                disciplineClass = 'astro'
                break
            case 'Psychology':
                disciplineClass = 'psy'
                break
            case 'Environmental Science':
                disciplineClass = 'envi'
                break
            case 'Mathematics':
                disciplineClass =  'math'  
                break                  
            default:
                break;
        }

        return `
        <article class="search-post blog-post" data-id="${el.postId}">
            <img src="${el.img}" width="250px">
            <div class="search-post-desc">
                <div class="search-post-desc-top">
                    <h3>${el.title}</h3>
                    <p class="${disciplineClass}">${el.discipline}</p>
                    <p>${el.content.introduction}</p>
                </div>
                <div class="search-post-desc-bottom">
                    <p>By ${el.author}</p>
                    <p>${el.postDate}</p>
                </div>
            </div>
        </article>
        `
    }).join('')
    searchPostsSection.innerHTML = displayPosts

    const searchPosts = searchPostsSection.querySelectorAll('.blog-post')

    searchPosts.forEach(post => {
        post.addEventListener('click', () => {
            if(!post) return
            const dataId = Number(post.getAttribute('data-id'))
            const postObj = blogData.posts.find(post => post.postId === dataId)

            document.querySelector('main').classList.add('fade-out')
            setTimeout(() => {
                document.querySelector('main').classList.remove('fade-out')
                document.querySelector('main').classList.add('hide')
                fullPostSection.classList.remove('hide')
                renderFullPost(postObj)
            }, 1000);
            const header = document.querySelector('header')
            header.scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

function renderPopularSection(arraySection) {
    const filterPosts = arraySection.filter(el => el.popular)
    const displayPosts = filterPosts.map(el => {
        return `
        <article class="popular-post blog-post" data-id="${el.postId}">
            <div>
                <img src="${el.img}" width="130px">
            </div>
            <div>
                <h5 style="width: 140px">${el.title}</h5>
                <p>${el.author}</p>
            </div>
        </article>
        `
    }).join('')
    homeSectionsObj.popularPostsSection.innerHTML = displayPosts
}

function renderWeeklyBestSection(arraySection) {
    const filterPosts = arraySection.filter(el => el.weeklyBest)
    const displayPosts = filterPosts.map(el => {
        let firstElementStyle = ''
        if(filterPosts.indexOf(el) === 0) {
            firstElementStyle = '250px'
        } else {
            firstElementStyle = '140px'
        }
        return `
        <article class="weekly-best-post blog-post" data-id="${el.postId}">
            <img src="${el.img}" width="${firstElementStyle}">
            <h5>${el.title}</h5>
            <p>${el.author}</p>
        </article>
        `
    }).join('')
    homeSectionsObj.weeklyBestPostsSection.innerHTML = displayPosts
}

function renderEditorsPickSection(arraySection) {
    const filterPosts = arraySection.filter(el => el.editorsPick)
    const displayPosts = filterPosts.map(el => {
        return `
        <article class="editors-pick-post blog-post" data-id="${el.postId}">
            <img src="${el.img}">
            <div>
                <h5>${el.title}</h5>
                <p>${el.postDate}</p>
            </div>
        </article>
        `
    }).join('')
    homeSectionsObj.editorsPickPostsSection.innerHTML = displayPosts
}

const filterByCategoriesSelect = document.getElementById('filter-by-categories')

filterByCategoriesSelect.addEventListener('change', e => {
    const optionValue = e.target.value
    const filterByDisciplines = blogData.posts.filter(p => p.discipline === optionValue)
    if(optionValue === 'All disciplines') {
        renderSearchSection(blogData.posts, 0)
        searchPostsPaginationSection.classList.remove('hide')
        pageButtons.forEach(b => {
            b.classList.remove('is-post-page-active')
        })
        firstSearchNavPageBtn.classList.add('is-post-page-active')
    } else {
        renderSearchSection(filterByDisciplines, 0, 9)
        searchPostsPaginationSection.classList.add('hide')
        
    }
})

export const searchPostsInput = document.getElementById('search-posts-input')

searchPostsInput.addEventListener('input', e => {
    const inputEl = e.target.value
    const filterByTitleOrAuthor = blogData.posts.filter(p => 
        p.title.toLowerCase().includes(inputEl.toLowerCase()) || 
        p.author.toLowerCase().includes(inputEl.toLowerCase())
    )
    renderSearchSection(filterByTitleOrAuthor, 0, 9)
    pageButtons.forEach(b => {
        b.classList.remove('is-post-page-active')
    })
    firstSearchNavPageBtn.classList.add('is-post-page-active')
})

let elementsPerPage = 6

searchPostsPaginationSection.addEventListener('click', e => {
    pageButtons.forEach(b => {
        b.classList.remove('is-post-page-active')
    })
    if(e.target.matches('button')) {
        e.target.classList.add('is-post-page-active')
        const pageButton = Number(e.target.dataset.page)
        const startIndex = pageButton * elementsPerPage
        renderSearchSection(blogData.posts, startIndex)
    }
})

function renderFullPost(post) {
    const saveSectionsContent = []
    for(let sectionName in post.content.sections) {
        saveSectionsContent.push({
            sectionName: sectionName,
            sectionContent: post.content.sections[sectionName]
        })
    }

    const renderSectionsContent = saveSectionsContent.map(section => {
        return `
        <h2>${section.sectionName}</h2>
        <p>${section.sectionContent}</p>
        `
    }).join('')

    const renderPostComments = post.comments.map(comment => {
        let showSettingsIcon;
        if(currentUser && currentUser.username === comment.profile) {
            showSettingsIcon = `
            <i class="fa-solid fa-gear comment-settings-icon"></i>
            <div class="setting-icons hide">
                <button class="edit-comment-btn">
                    <i class="fa-solid fa-pencil"></i>
                    <p>Edit</p>
                </button>
                <button class="delete-comment-btn">
                    <i class="fa-solid fa-trash"></i>
                    <p>Delete</p>
                </button>
            </div>                
            `
        } else {
            showSettingsIcon = `
            <i class="fa-solid fa-gear comment-settings-icon hide"></i>
            <div class="setting-icons hide">
                <button class="edit-comment-btn">
                    <i class="fa-solid fa-pencil"></i>
                    <p>Edit</p>
                </button>
                <button class="delete-comment-btn">
                    <i class="fa-solid fa-trash"></i>
                    <p>Delete</p>
                </button>
            </div>  
            `
        }

        return `
        <section class="post-comment" data-id="${comment.commentId}">
            <div class="top-post-comment-section">
                <div>
                    <i class="fa-solid fa-user profile-icon-comment"></i>
                    <div>
                        <h4>${comment.profile}</h4>
                        <p>${comment.postDate}</p>
                    </div>
                </div>
                ${showSettingsIcon}
            </div>
            <div class="bottom-post-comment-section">
                <p>${comment.comment}</p>
                <div>
                    <div class="upvotes-downvotes-section">
                        <p class="comment-upvote-counter">${comment.upvotes}</p>
                        <i class="fa-solid fa-thumbs-up upvote-icon"></i>
                        <p class="comment-downvote-counter">${comment.downvotes}</p>
                        <i class="fa-solid fa-thumbs-down downvote-icon"></i>
                    </div>
                </div>
            </div>
        </section>
        `
    }).join('')

    let updateProfileIconComment = ''
    if(currentUser) {
        updateProfileIconComment = '<i class="fa-solid fa-user profile-icon-comment"></i>'
    } else {
        updateProfileIconComment = '<i class="fa-solid fa-circle-user no-profile-icon-comment"></i>'
    }

    const filterRelatedPosts = blogData.posts.filter(element => element.discipline === post.discipline)
    const selectRelatedPosts = filterRelatedPosts.slice(0, 3)
    const renderRelatedPosts = selectRelatedPosts.map(post => {
        return `
        <article class="related-post blog-post" data-id="${post.postId}">
            <img src="${post.img}" width="280px" class="related-post-img">
            <h3>${post.title}</h3>
            <p>${post.content.introduction}</p>
        </article>
        `
    }).join('')

    const displayFullPost = `
    <article class="full-post" data-id="${post.postId}">
        <div class="full-post-description">
            <div>
                <h1>${post.title}</h1>
            </div>
            <div>
                <p>${post.author}</p>
                <p>${post.postDate}</p>
            </div>
        </div>
        <p class="full-post-introduction">${post.content.introduction}</p>
        <img src="${post.img}" width="900px" class="full-post-img">
        <div class="full-post-content">
            ${renderSectionsContent}
        </div>
        <div class="author-section">
            <img src="${post.authorPicture}">
            <div>
                <h3>Author</h3>
                <p>${post.author}</p>
                <p>${post.authorIntroductionDesc}</p>
            </div>
        </div>
        <div class="comments-section">
            <h1>Comments (${post.comments.length})</h1>
            <div class="post-comments-section">
                ${renderPostComments}
            </div>
            <div class=new-comment-section>
                ${updateProfileIconComment}
                <textarea placeholder="Enter a new comment..." rows="6" cols="70" class="new-comment-textarea"></textarea>
                <button type="button" class="post-comment-btn">Comment</button>
            </div>
        </div>
        <div class="related-posts-section">
            <h1>Related posts</h1>
            <div>
                ${renderRelatedPosts}
            </div>
        </div>
    </article>
    `
    fullPostSection.innerHTML = displayFullPost

    const relatedPosts = fullPostSection.querySelectorAll('.blog-post')

    relatedPosts.forEach(post => {
        post.addEventListener('click', () => {
            if(!post) return
            const dataId = Number(post.getAttribute('data-id'))
            const postObj = blogData.posts.find(post => post.postId === dataId)

            document.querySelector('main').classList.add('fade-out')
            setTimeout(() => {
                document.querySelector('main').classList.remove('fade-out')
                document.querySelector('main').classList.add('hide')
                fullPostSection.classList.remove('hide')
                renderFullPost(postObj)
            }, 1000);
            const header = document.querySelector('header')
            header.scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

fullPostSection.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        if(e.target.matches('.new-comment-textarea')) {
            const textarea = e.target
            if(!currentUser) {
                openSignInModal()
                textarea.value = ''
                textarea.blur()
            } else {
                if(!textarea.value) {
                    textarea.blur()
                    return
                }
                const postContainer = e.target.closest('.full-post')
                const postDate = getCurrentCommentPostDate()
                addComment(postContainer, currentUser.username, postDate, 0, 0, textarea.value)
                saveLocalStorage('blogData', blogData)

                const blogPostId = Number(postContainer.dataset.id)
                const blogPostObj = blogData.posts.find(post => post.postId === blogPostId)

                renderFullPost(blogPostObj)
            }
        }
        if(e.target.matches('.edit-comment-textarea')) {
            e.target.blur()
        }
    }
})

fullPostSection.addEventListener('click', e => {
    if(e.target.matches('.post-comment-btn')) {
        const newCommentSection = e.target.closest('.new-comment-section')
        const textarea = newCommentSection.querySelector('textarea')
        if(!currentUser) {
            openSignInModal()
            textarea.value = ''
        } else {
            if(!textarea.value) return
            const postContainer = e.target.closest('.full-post')
            const postDate = getCurrentCommentPostDate()
            addComment(postContainer, currentUser.username, postDate, 0, 0, textarea.value)
            saveLocalStorage('blogData', blogData)

            const blogPostId = Number(postContainer.dataset.id)
            const blogPostObj = blogData.posts.find(post => post.postId === blogPostId)

            renderFullPost(blogPostObj)
        }
    }
    const allPostComments = fullPostSection.querySelectorAll('.post-comment')
    allPostComments.forEach(comment => {
        const settingIcons = comment.querySelector('.setting-icons')
        settingIcons.classList.add('hide')
    })
    if(e.target.matches('.comment-settings-icon')) {
        const topPostCommentSection = e.target.closest('.top-post-comment-section')
        const settingIcons = topPostCommentSection.querySelector('.setting-icons')
        settingIcons.classList.toggle('hide')
    }
    const editCommentBtn = e.target.closest('.edit-comment-btn')
    if(editCommentBtn) {
        const fullPost = e.target.closest('.full-post')
        const fullPostId = Number(fullPost.dataset.id)
        const fullPostIndex = blogData.posts.findIndex(post => post.postId === fullPostId)
        const postComment = e.target.closest('.post-comment')
        const postCommentId = postComment.dataset.id
        const postCommentIndex = blogData.posts[fullPostIndex].comments.findIndex(comment => comment.commentId === postCommentId)
        const bottomCommentSection = postComment.querySelector('.bottom-post-comment-section')
        const commentContentEl = bottomCommentSection.querySelector('p')
        const bottomDivSection = bottomCommentSection.querySelector('div:first-of-type')
        const newTextarea = document.createElement('textarea')
        newTextarea.classList.add('edit-comment-textarea')
        newTextarea.rows = '6'
        newTextarea.cols = '70'
        newTextarea.value = commentContentEl.textContent
        commentContentEl.replaceWith(newTextarea)
        editCommentBtn.disabled = true
        let editCommentBtnsContainer = `
        <div class="edit-comment-btns-container">
            <button class="cancel-edit-btn">Cancel</button>
            <button class="save-edit-btn">Save</button>
        </div>
        `
        bottomDivSection.insertAdjacentHTML('beforeend', editCommentBtnsContainer)
        const saveEditBtn = bottomDivSection.querySelector('.save-edit-btn')
        if(saveEditBtn) {
            saveEditBtn.onclick = () => {
                if(!newTextarea.value) return
                editCommentBtn.disabled = false
                commentContentEl.textContent = newTextarea.value
                newTextarea.replaceWith(commentContentEl)
                blogData.posts[fullPostIndex].comments[postCommentIndex].comment = newTextarea.value
                saveLocalStorage('blogData', blogData)
                const editCommentBtnsContainer = bottomDivSection.querySelector('.edit-comment-btns-container')
                editCommentBtnsContainer.remove()
            }
        }
        const cancelEditBtn = bottomDivSection.querySelector('.cancel-edit-btn')
        if(cancelEditBtn) {
            cancelEditBtn.onclick = () => {
                editCommentBtn.disabled = false
                newTextarea.replaceWith(commentContentEl)
                const editCommentBtnsContainer = bottomDivSection.querySelector('.edit-comment-btns-container')
                editCommentBtnsContainer.remove()
            }
        }
    }
    const deleteCommentBtn = e.target.closest('.delete-comment-btn')
    if(deleteCommentBtn) {
        const deleteCommentModal = document.querySelector('.delete-comment-modal')
        deleteCommentModal.classList.remove('hide')
        document.body.classList.add('hide-screen')
        const fullPost = e.target.closest('.full-post')
        const fullPostId = Number(fullPost.dataset.id)
        const fullPostIndex = blogData.posts.findIndex(post => post.postId === fullPostId)
        const fullPostObj = blogData.posts.find(post => post.postId === fullPostId)
        const postComment = e.target.closest('.post-comment')
        const postCommentId = postComment.dataset.id
        const postCommentIndex = blogData.posts[fullPostIndex].comments.findIndex(comment => comment.commentId === postCommentId)
        const modalDeleteCommentBtn = document.querySelector('#modal-delete-comment-btn')
        modalDeleteCommentBtn.onclick = () => {
            blogData.posts[fullPostIndex].comments.splice(postCommentIndex, 1)
            renderFullPost(fullPostObj)
            saveLocalStorage('blogData', blogData)
            deleteCommentModal.classList.add('hide')
            document.body.classList.remove('hide-screen')
        }
        const modalCancelDeleteCommentBtn = document.querySelector('#modal-cancel-delete-comment-btn')
        modalCancelDeleteCommentBtn.onclick = () => {
            deleteCommentModal.classList.add('hide')
            document.body.classList.remove('hide-screen')
        }
    }
    const votesSection = e.target.closest('.upvotes-downvotes-section')
    if(votesSection) {
        const votesIcons = votesSection.querySelectorAll('i')
        votesIcons.forEach(icon => {
            icon.classList.remove('vote-style')
        })
    }
    if(e.target.matches('.upvote-icon')) {
        handleVotes('upvote', e.target)
        saveLocalStorage('blogData', blogData)
    }
    if(e.target.matches('.downvote-icon')) {
        handleVotes('downvote', e.target)
        saveLocalStorage('blogData', blogData)
    }
})

function handleVotes(newVoteType, elementIcon) {
    const fullPost = elementIcon.closest('.full-post')
    const fullPostId = Number(fullPost.dataset.id)
    const fullPostIndex = blogData.posts.findIndex(post => post.postId === fullPostId)
    const comment = elementIcon.closest('.post-comment')
    const commentId = comment.dataset.id
    const commentObj = blogData.posts[fullPostIndex].comments.find(comment => comment.commentId === commentId)
    const upvotesDownvotesSection = elementIcon.closest('.upvotes-downvotes-section')
    const commentUpvoteCounter = upvotesDownvotesSection.querySelector('.comment-upvote-counter')
    const commentDownvoteCounter = upvotesDownvotesSection.querySelector('.comment-downvote-counter')

    let upVoteIdIndex;
    let downVoteIdIndex;
    if(currentUser) {
        upVoteIdIndex = commentObj.votedBy.findIndex(id => id === currentUser.profileId)
        downVoteIdIndex = commentObj.downvotedBy.findIndex(id => id === currentUser.profileId)
    }

    let hasVoted = null
    let hasDownvoted = null
    if(currentUser) {
        hasVoted = commentObj.votedBy.some(id => id === currentUser.profileId)
        hasDownvoted = commentObj.downvotedBy.some(id => id === currentUser.profileId)
    }
    
    if(!currentUser) return

    if(hasDownvoted && newVoteType === 'upvote') {
        commentObj.downvotedBy.splice(downVoteIdIndex, 1)
        commentObj.votedBy.push(currentUser.profileId)
        commentObj.upvotes += 1
        commentObj.downvotes -= 1
        elementIcon.classList.add('fa-beat')
        setTimeout(() => {
            elementIcon.classList.remove('fa-beat')
        }, 1000);
    }

    if(hasVoted && newVoteType === 'downvote') {
        commentObj.votedBy.splice(upVoteIdIndex, 1)
        commentObj.downvotedBy.push(currentUser.profileId)
        commentObj.downvotes += 1
        commentObj.upvotes -= 1
    }

    if(hasVoted && newVoteType === 'upvote') {
        commentObj.votedBy.splice(upVoteIdIndex, 1)
        commentObj.upvotes -= 1
        elementIcon.classList.remove('fa-beat')
        elementIcon.classList.remove('vote-style')
    }
    if(hasDownvoted & newVoteType === 'downvote') {
        commentObj.downvotedBy.splice(upVoteIdIndex, 1)
        commentObj.downvotes -= 1
        elementIcon.classList.remove('vote-style')
    }

    if(!hasVoted && !hasDownvoted && newVoteType === 'upvote') {
        commentObj.votedBy.push(currentUser.profileId)
        commentObj.upvotes += 1
        commentUpvoteCounter.textContent = commentObj.upvotes
        elementIcon.classList.add('fa-beat')
        setTimeout(() => {
            elementIcon.classList.remove('fa-beat')
        }, 1000);

    }
    if(!hasVoted && !hasDownvoted && newVoteType === 'downvote') {
        commentObj.downvotedBy.push(currentUser.profileId)
        commentObj.downvotes += 1
        commentDownvoteCounter.textContent = commentObj.downvotes
    }
    commentUpvoteCounter.textContent = commentObj.upvotes
    commentDownvoteCounter.textContent = commentObj.downvotes
}

function getCurrentCommentPostDate() {
    const currentDate = new Date()
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }
    return currentDate.toLocaleString('en-US', options)
}

function addComment(container, profile, postDate, upvotes, downvotes, comment) {
    const postId = container.dataset.id
    const postIndex = blogData.posts.findIndex(post => post.postId === Number(postId))

    const postObj = blogData.posts.find(post => post.postId === Number(postId))
    const lastCommentIndex = postObj.comments.length - 1
    const lastCommentObj = postObj.comments[lastCommentIndex]

    let newCommentId = null

    if(postObj.comments.length === 0) {
        newCommentId = `${postId}-1`
    } else {
        let splitLastCommentId = lastCommentObj.commentId.split('-')
        let secondNumberLastCommentId = Number(splitLastCommentId[1])
        let newNumber = secondNumberLastCommentId + 1
        newCommentId = `${postId}-${newNumber}`
    }

    blogData.posts[postIndex].comments.push(
        {
            commentId: newCommentId,
            profile: profile,
            postDate: postDate,
            upvotes: upvotes,
            downvotes: downvotes,
            votedBy: [],
            downvotedBy: [],
            comment: comment,
        }
    )
}

const signinModal = document.querySelector('.signin-modal')
const closeModalIcon = document.querySelectorAll('.close-modal-icon')

noProfileIconHeader.addEventListener('click', () => {
    openSignInModal()
})

closeModalIcon.forEach(icon => {
    icon.addEventListener('click', () => {
        closeSignInModal()
    })
})

signinModal.addEventListener('click', e => {
    if(e.target.matches('.signin-modal')) {
        closeSignInModal()
    }
})

function openSignInModal() {
    signinModal.classList.remove('hide')
    signInModalSection.classList.remove('hide')
    document.body.classList.add('hide-screen')
    registrationOptions.classList.remove('hide')
    signInOptionBtn.classList.add('is-active')
}

function closeSignInModal() {
    signinModal.classList.add('hide')
    document.body.classList.remove('hide-screen')
    updateSignInModalDetails('signIn')

    signedUpMessageModal.classList.add('hide')

    registrationOptionsBtns.forEach(btn => {
        btn.classList.remove('is-active')
    })

    errorMessageSignInModal.textContent = ''

    const signinModalInputs = signinModal.querySelectorAll('input')
    signinModalInputs.forEach(input => {
        input.value = ''
        input.classList.remove('error-message-style')
    })
    
}

const registrationOptions = document.querySelector('.registration-options')
const registrationOptionsBtns = registrationOptions.querySelectorAll('button')
const signInOptionBtn = registrationOptionsBtns[0]

registrationOptions.addEventListener('click', e => {
    registrationOptionsBtns.forEach(btn => {
        btn.classList.remove('is-active')
    })

    if(e.target.matches('.signin-option')) {
        e.target.classList.add('is-active')
        updateSignInModalDetails('signIn')
    }
    if(e.target.matches('.signup-option')) {
        e.target.classList.add('is-active')
        updateSignInModalDetails('signUp')
    }
})

export const signedInMessageModal = document.querySelector('.signedin-message-modal-section')
const continueBtnSignedInMessage = document.querySelector('.continue-btn-signedin-message')

signInModalSection.addEventListener('click', e => {
    if(e.target.matches('.signin-btn')) {
        const signInModalSection = e.target.closest('.signin-modal-section') 
        const usernameInput = signInModalSection.querySelector('#signin-username-input')
        const emailInput = signInModalSection.querySelector('#signin-email-input')

        const accountObject = blogData.accounts.find(acc => 
            acc.username === usernameInput.value && acc.emailAddress === emailInput.value
        ) 

        if(usernameInput.value === '' || emailInput.value === '') {
            usernameInput.classList.add('error-message-style')
            emailInput.classList.add('error-message-style')
            errorMessageSignInModal.textContent = 'Every field must be completed, try again'
        } else if(accountObject) {
            currentUser = accountObject
            saveLocalStorage('user', currentUser)
            signInModalSection.classList.add('hide')
            signedInMessageModal.classList.remove('hide')
            registrationOptions.classList.add('hide')

            updateProfileIcons('signIn')
            updateCommentSettingsIcons('signIn')
        } else {
            usernameInput.classList.add('error-message-style')
            emailInput.classList.add('error-message-style')
            errorMessageSignInModal.textContent = 'Account not found, please try again or create a new one'
        }
    }
})

continueBtnSignedInMessage.addEventListener('click', () => {
    closeSignInModal()
})

const signedUpMessageModal = document.querySelector('.signedup-message-modal-section')
const continueBtnSignedUpMessage = document.querySelector('.continue-btn-signedup-message')

signUpModalSection.addEventListener('click', e => {
    if(e.target.matches('.signup-btn')) {
        const signUpModalSection = e.target.closest('.signup-modal-section') 
        const usernameInput = signUpModalSection.querySelector('#signup-username-input')
        const usernameInputValue = usernameInput.value
        const dateBirthInput = signUpModalSection.querySelector('#signup-datebirth-input')
        const dateBirthInputValue = dateBirthInput.value
        const emailInput = signUpModalSection.querySelector('#signup-email-input')
        const emailInputValue = emailInput.value
        const signUpModalSectionInputs = signUpModalSection.querySelectorAll('input')

        let validEmail = null
        if(emailPattern.test(emailInput.value)) {
            validEmail = true
        } else {
            validEmail = false
        }

        signUpModalSectionInputs.forEach(input => {
            if(input.value === '') {
                input.classList.add('error-message-style')
                errorMessageSignUpModal.classList.remove('hide')
                errorMessageSignUpModal.textContent = 'Every field must be completed, try again'
            } else if(validEmail === false) {
                emailInput.classList.add('error-message-style')
                errorMessageSignUpModal.textContent = 'The email is not valid, try again'
            }
        })

        const ifTheAccExists = blogData.accounts.some(acc => 
            acc.username === usernameInput.value || acc.emailAddress === emailInput.value
        )
        if(ifTheAccExists) {
            errorMessageSignUpModal.textContent = 'This account already exists, try again'
        } else {
            if(usernameInputValue && dateBirthInputValue && validEmail === true) {
                signedUpMessageModal.classList.remove('hide')
                signUpModalSection.classList.add('hide')
                registrationOptions.classList.add('hide')
                errorMessageSignUpModal.textContent = ''
                signUpModalSectionInputs.forEach(input => {
                    input.classList.remove('error-message-style')
                    input.value = ''
                })
                createNewAccount(dateBirthInputValue, usernameInputValue, emailInputValue)
                saveLocalStorage('blogData', blogData)
            }
        }
    }
})

continueBtnSignedUpMessage.addEventListener('click', () => {
    signedUpMessageModal.classList.add('hide')
    registrationOptionsBtns.forEach(btn => {
        btn.classList.remove('is-active')
    })
    const signUpInputs = signUpModalSection.querySelectorAll('input')
    signUpInputs.forEach(input => {
        input.value = ''
    })
    openSignInModal()
})

function createNewAccount(profileId, username, emailAddress) {
    blogData.accounts.push(
        {
            profileId: profileId,
            username: username,
            emailAddress: emailAddress
        }
    )
}

const logOutAccBtn = document.getElementById('log-out-account-btn')

logOutAccBtn.addEventListener('click', () => {
    logOutAcc()
    updateCommentSettingsIcons('logOut')
    currentUser = null
    saveLocalStorage('user', null)
})

const deleteAccBtn = document.getElementById('delete-acc-btn')
const deleteAccModal = document.querySelector('.delete-acc-modal')
const deletedAccountMessageModalSection = document.querySelector('.deleted-account-message-modal-section')

deleteAccBtn.addEventListener('click', () => {
    deleteAccModal.classList.remove('hide')
})

deleteAccModal.addEventListener('click', e => {
    if(e.target.matches('#modal-delete-acc-btn')) {
        deleteAccount()
        currentUser = null
        saveLocalStorage('blogData', blogData)
        saveLocalStorage('user', null)
        deleteAccModal.classList.add('hide')
        deletedAccountMessageModalSection.classList.remove('hide')
        setTimeout(() => {
            deletedAccountMessageModalSection.classList.add('hide')
        }, 3000);
    }
    if(e.target.matches('#modal-cancel-delete-acc-btn')) {
        deleteAccModal.classList.add('hide')
    }
})

function getCurrentCopyrightYear() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const copyrightYearEl = document.getElementById('copyright-year-el')
    copyrightYearEl.textContent = `${currentYear} All rights reserved`
}

getCurrentCopyrightYear()

const navigationHeaderSection = document.querySelector('.navigation-header-section')
const hamburgerIcon = document.querySelector('.hamburger-icon')
const navigationHeaderCloseIcon = document.querySelector('.navigation-header-close-icon')

hamburgerIcon.addEventListener('click', () => {
    navigationHeaderSection.classList.add('show')
    navigationHeaderCloseIcon.classList.remove('hide')
})

navigationHeaderCloseIcon.addEventListener('click', () => {
    navigationHeaderSection.classList.remove('show')
})

navigationHeaderSection.addEventListener('click', e => {
    if(e.target.matches('li')) {
        navigationHeaderSection.classList.remove('show')
    }
})

profileIconHeader.addEventListener('click', () => {
    navigationHeaderSection.classList.remove('show')
})

localStorage.removeItem('blogData');