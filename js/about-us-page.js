const meetTeamSection = document.querySelector('.meet-team-section')

export function renderTeamSection(arraySection) {
    const teamMembersArray = []
    arraySection.forEach(post => {
        if(teamMembersArray.includes(post.author)) return
        teamMembersArray.push(post.author)
    })
    let teamMembersObj = []
    teamMembersArray.forEach(member => {
        const postObj = arraySection.find(post => post.author === member)
        teamMembersObj.push(postObj)
    })
    const displayTeam = teamMembersObj.map(author => {
        return `
        <div>
            <img src="${author.authorPicture}">
            <h3>${author.author}</h3>
            <h4>${author.discipline}</h4>
            <p>${author.authorDescription}</p>
        </div>
        `
    }).join('')
    meetTeamSection.innerHTML = displayTeam
}