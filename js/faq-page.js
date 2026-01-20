const faqContainer = document.querySelector('.faq-container')

export function renderFaqSection() {
    faqContainer.addEventListener('click', e => {
        const question = e.target.closest('.question')
        if(question) {
            const questionAnswerSection = question.closest('.question-answer-section')
            const showAnswerIcon = question.querySelector('.show-answer-icon')
            const hideAnswerIcon = question.querySelector('.hide-answer-icon')
            const answer = questionAnswerSection.querySelector('.answer')
            answer.classList.toggle('show')
            if(answer.classList.contains('show')) {
                showAnswerIcon.classList.add('hide')
                hideAnswerIcon.classList.remove('hide')
            } else {
                showAnswerIcon.classList.remove('hide')
                hideAnswerIcon.classList.add('hide')
            }
            console.log(e.target)
        }
    })
}