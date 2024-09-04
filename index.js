let imgData = '';

function element2ImgData(id) {
    
}

function onPageReady() {
    document.getElementById('capture').addEventListener('click', function() {
        const element = document.getElementById('element-to-capture');
        html2canvas(element).then(canvas => {
            imgData = canvas.toDataURL('image/png');
    
            // 创建一个图片标签来显示生成的图片（可选）
            const img = document.createElement('img');
            img.src = imgData;
            document.body.appendChild(img);
    
            // 显示下载按钮
            document.getElementById('download').style.display = 'inline-block';
        });
    });
    
    document.getElementById('download').addEventListener('click', function () {
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'captured-image.png';  // 指定下载文件的名称
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);  // 下载后移除临时创建的链接
    });
    
    document.getElementById('fetchData').addEventListener('click', function () {
        fetch('https://api.github.com/repos/boybeak/JustTodo')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // 将响应解析为 JSON
            })
            .then(data => {
                const jsonOutput = document.getElementById('jsonOutput');
                jsonOutput.textContent = JSON.stringify(data, null, 2); // 格式化输出 JSON 数据
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                const jsonOutput = document.getElementById('jsonOutput');
                jsonOutput.textContent = `Error: ${error.message}`;
            });
    });
}

