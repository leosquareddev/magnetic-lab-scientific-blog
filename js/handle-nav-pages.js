import { blogData, firstSearchNavPageBtn, searchPostsPaginationSection, pageButtons, errorMessageContactForm, 
    contactFormInputs, contactFormTextareaMessage, renderSearchSection, fullPostSection, searchPostsInput } from './main.js'

const navigationHeaderPagesContainer = document.querySelector('.navigation-header-pages-container')
const navigationFooterPagesContainer = document.querySelector('.navigation-footer-pages-container')
const allNavigationPagesContainer = [navigationHeaderPagesContainer, navigationFooterPagesContainer]

export function handleNavPages() {
    allNavigationPagesContainer.forEach(container => {
        container.addEventListener('click', e => {
            if(e.target.matches('li')) {
                const dataPage = e.target.dataset.page
                const liElements = navigationHeaderPagesContainer.querySelectorAll('li')
                liElements.forEach(li => {
                    li.classList.remove('is-page-active')
                })

                if(!fullPostSection.classList.contains('hide')) {
                    fullPostSection.classList.add('fade-out')
                    setTimeout(() => {
                        fullPostSection.classList.remove('fade-out')
                        fullPostSection.classList.add('hide')
                    }, 1000);
                }

                if(dataPage === 'home-page') {
                    renderSearchSection(blogData.posts, 0)
                    searchPostsInput.value = ''
                    pageButtons.forEach(b => {
                        b.classList.remove('is-post-page-active')
                    })
                    firstSearchNavPageBtn.classList.add('is-post-page-active')
                    searchPostsPaginationSection.classList.remove('hide')
                }

                if(dataPage === 'contact-page') {
                    errorMessageContactForm.textContent = ''
                    contactFormInputs.forEach(input => {
                        input.value = ''
                    })
                    contactFormTextareaMessage.value = ''
                }

                const blogPages = document.querySelectorAll('.blog-page')
                blogPages.forEach(page => {
                    if(page.classList.contains(dataPage)) {
                        setTimeout(() => {
                            page.classList.remove('hide')
                        }, 1000);
                    } else {
                        page.classList.add('fade-out')
                        setTimeout(() => {
                            page.classList.remove('fade-out')
                            page.classList.add('hide')
                        }, 1000);
                    }
                })
                e.target.classList.add('is-page-active')
                const header = document.querySelector('header')
                header.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        })
    })
}