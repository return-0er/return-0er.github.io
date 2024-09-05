const headers = {
    method: 'GET',  // 请求类型
    headers: authHeaders
}

let repoTemps = []

function fetchRepoData(input) {
    const userRepo = extractUserRepo(input)

    const repoButton = document.getElementById('repoForwardIcon')
    const repoFetchFlag = document.getElementById('repoFetchingIcon')

    repoButton.style.display = 'none'
    repoFetchFlag.style.display = 'block'

    fetch(
        'https://api.github.com/repos/' + userRepo,
        headers
    )
    .then( response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // 将响应解析为 JSON
    })
    .then( data => {
        fillRepoList(data)

        repoButton.style.display = 'block'
        repoFetchFlag.style.display = 'none'
        // let jsonStr = JSON.stringify(data, null, 2); // 格式化输出 JSON 数据
    })
    .catch( error => {
        repoButton.style.display = 'block'
        repoFetchFlag.style.display = 'none'
        console.error('There was a problem with the fetch operation:', error);
    });
}

function extractUserRepo(input) {
    const fullUrlRegex = /(?:https:\/\/)?(?:www\.)?github\.com\/([^\/]+\/[^\/]+)(?:\.git)?$/;
    const userRepoRegex = /^[^\/]+\/[^\/]+$/;

    // 如果包含 GitHub 域名部分，使用正则匹配
    if (input.includes("github.com")) {
        const match = input.match(fullUrlRegex);
        return match ? match[1] : null;
    }

    // 如果不包含 GitHub 域名部分，检查是否为 user/repo 格式
    if (userRepoRegex.test(input)) {
        return input;
    }

    // 如果既不是完整链接，也不是 user/repo 格式，返回 null
    return null;
}

function fillRepoList(repoData) {
    const tempList = document.getElementById('tempList')
    tempList.innerHTML = ''
    repoTemps.forEach((temp) => {
        tempList.appendChild(temp.getElement(repoData))
    })
}

function onPageReady() {

    repoTemps = [
        new SimpleTemplate()
    ]

    const repoInput = document.getElementById('repoInput');
    const repoButton = document.getElementById('repoButton');

    // 回车事件
    repoInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && repoInput.value.trim() !== '') {
            fetchRepoData(repoInput.value.trim());
        }
    });

    // 点击事件
    repoButton.addEventListener('click', function() {
        if (repoInput.value.trim() !== '') {
            fetchRepoData(repoInput.value.trim());
        }
    });
}

