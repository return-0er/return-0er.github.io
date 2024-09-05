class BasicTemplate {
    getElement(repoData) {
        this['repoFullName'] = repoData['full_name']
        const container = document.createElement('div')
        container.style.display = 'flex'
        container.style.flexDirection = 'column'
        container.style.alignItems = 'center'

        const wrapper = document.createElement('div')
        wrapper.classList.add('repoBoxWrapper')

        const repoBox = document.createElement('div')
        repoBox.id = 'repoBox'
        repoBox.classList.add('repoBox')

        repoBox.appendChild(this.getContent(repoData))

        wrapper.appendChild(repoBox)

        container.appendChild(wrapper)
        container.appendChild(this.createDownloadButton(repoBox))

        return container
    }

    getContent(repoData) {
        throw new Error('getContent not implemented')
    }

    getTemplateName() {
        throw new Error('getTemplateName not implemented')
    }

    createDownloadButton(captureEle) {
        const repoDownloadButton = document.createElement('s-icon-button')
        repoDownloadButton.id = 'repoDownloadButton'
        
        const repoDownloadIcon = document.createElement('s-icon')
        
        repoDownloadIcon.innerHTML =
            `
            <s-icon >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path
                        d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q17-72 85-137t145-65q33 0 56.5 23.5T520-716v242l64-62 56 56-160 160-160-160 56-56 64 62v-242q-76 14-118 73.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-48-22-89.5T600-680v-93q74 35 117 103.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm220-358Z">
                    </path>
                </svg>
            </s-icon>
            `
        repoDownloadButton.appendChild(repoDownloadIcon)
        repoDownloadButton.onclick = () => {
            const repoHiddenContainer = document.getElementById('repoHiddenContainer');
            const repoBoxClone = captureEle.cloneNode(true)
    
            repoBoxClone.style.transform = 'none'
            repoBoxClone.style.transformOrigin = 'none'
    
            repoHiddenContainer.innerHTML = ''
            repoHiddenContainer.appendChild(repoBoxClone)
            
            this.element2ImgData(repoHiddenContainer, (imageData) => {
                this.download(imageData)
            })
        }

        return repoDownloadButton
    }

    element2ImgData(element, onSuccess) {
        html2canvas(element, {
            scale: 1,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            onSuccess(imgData)
        });
    }

    download(imgData) {
        const fileName = this['repoFullName'] + '_' + this.getTemplateName()
    
        const a = document.createElement('a');
        a.href = imgData;
        a.download = fileName + '.png';  // 指定下载文件的名称
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);  // 下载后移除临时创建的链接
    }

}