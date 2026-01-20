const featuredCoverPostSection = document.querySelector('.featured-cover-post-section')
const coverPostsSection = document.querySelector('.cover-posts-section')
const popularPostsSection = document.querySelector('.popular-posts-section')
const featuredPostsSection = document.querySelector('.featured-posts-section')
const weeklyBestPostsSection = document.querySelector('.weekly-best-posts-section')
const editorsPickPostsSection = document.querySelector('.editors-pick-posts-section')

export const homeSectionsArr = [featuredCoverPostSection, coverPostsSection, popularPostsSection, 
    featuredPostsSection, weeklyBestPostsSection, editorsPickPostsSection
]

export const homeSectionsObj = {
        featuredCoverPostSection: featuredCoverPostSection,
        coverPostsSection: coverPostsSection,
        featuredPostsSection: featuredPostsSection,
        popularPostsSection: popularPostsSection,
        weeklyBestPostsSection: weeklyBestPostsSection,
        editorsPickPostsSection: editorsPickPostsSection
}