class SimpleTemplate extends BasicTemplate {
    getTemplateName() {
        return 'simple'
    }
    getContent(repoData) {
        const repoContent = document.createElement('div')
        repoContent.classList.add('repoContentSimple')

        const repoTitle = document.createElement('div')
        repoTitle.id = 'repoTitle'
        repoTitle.classList.add('repoTitleSimple')

        const repoDesc = document.createElement('div')
        repoDesc.id = 'repoDesc'
        repoDesc.classList.add('repoDescSimple')

        const repoRelease = document.createElement('img')
        repoRelease.id = 'repoRelease'
        repoRelease.classList.add('repoReleaseSimple')
        repoRelease.setAttribute('src', 'https://img.shields.io/badge/version-x.y.z-blue')
        repoRelease.setAttribute('crossorigin', 'anonymous')

        const repoUserAvatar = document.createElement('img')
        repoUserAvatar.id = 'repoUserAvatar'
        repoUserAvatar.classList.add('repoUserAvatarSimple')

        repoContent.appendChild(repoTitle)
        repoContent.appendChild(repoDesc)
        repoContent.appendChild(repoRelease)
        repoContent.appendChild(repoUserAvatar)

        fetch(
            'https://api.github.com/repos/' + repoData['full_name'] + '/releases/latest',
            headers
        )
        .then( response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 将响应解析为 JSON
        })
        .then( data => {
            var tagName = data['tag_name']
            var tagNamePieces = ['version', tagName]
            if (tagName.includes('-')) {
                tagNamePieces = tagName.split('-')
            }
            if (tagNamePieces.length == 0) {
                repoRelease.style.display = 'none'
            } else if (tagNamePieces.length == 1) {
                tagNamePieces.unshift('version')
            }
            repoRelease.setAttribute('src', 'https://img.shields.io/badge/' + tagNamePieces[0] + '-' + tagNamePieces[1] + '-blue')
        })
        .catch( error => {
            repoRelease.style.display = 'none'
            console.error('There was a problem with the fetch operation:', error);
        });

        const userAndRepo = repoData['full_name'].split('/')
        repoTitle.innerHTML = userAndRepo[0] + '/<b>' + userAndRepo[1] + '</b>'
        repoDesc.innerText = repoData['description']
        
        repoUserAvatar.setAttribute('src', repoData['owner']['avatar_url'])

        return repoContent
    }
}