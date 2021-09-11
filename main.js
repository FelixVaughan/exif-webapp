let SERVER_ADDR = "http://127.0.0.1:8080"

function ignoreDefaultAction(event){
    event.preventDefault()
    event.stopPropagation()
}

function containsFiles(event) {
    if (event.dataTransfer.types) {
        for (var i = 0; i < event.dataTransfer.types.length; i++) {
            if (event.dataTransfer.types[i] == "Files") {
                return true;
            }
        }
    }
    return false;
}

function testEndpoint(){
    url = "https://www.udiscovermusic.com/wp-content/uploads/2020/11/Miles-Davis-GettyImages-84843312.jpg"
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    })
    .then(
        (response) => {
            console.log(response)
            return response.blob()
        }

        )
    .then(imageBlob => {
        console.log(`blob data is: ${imageBlob.size}`)
        let file = new File([imageBlob], "test.jpg"); 
        console.log(file)
        sendToServer(file)
    });
}

//window.addEventListener("click", testEndpoint)

function sendToServer(file){
    var formData = new FormData()
    formData.append('file', file)
    fetch(SERVER_ADDR, { method: 'POST', body: formData })
    .then(response => response.json())
    .then(success => console.log(success))
    .catch(error => console.log(error));
}

function containsURL(event){
    if(event.dataTransfer.types.includes('text/uri-list')){
        return true
    }
    return false
}

function fileIsAcceptedImage(event) {
  // todo: add more
  var imageTypes = ['image/png', 'image/gif', 'image/bmp', 'image/jpg', 'image/jpeg'];
  if (event.dataTransfer && event.dataTransfer.files) {
    // event.dataTransfer.files[0].type is a Blob.type
    var fileType = event.dataTransfer.files[0].type;
    console.log(`file type is ${fileType}`)
    if (imageTypes.includes(fileType)){
        return true 
    }
    return false
      
  }
}

filezone = document.querySelector("#filezone")
fs = document.querySelector("#inv-button")
filezone.addEventListener('dragover', ignoreDefaultAction)
filezone.addEventListener('dragcenter', ignoreDefaultAction)
filezone.addEventListener('click', async (ev) => {fs.click()})

filezone.addEventListener('drop', async (ev) => {
    ev.preventDefault()
    
    if(containsFiles(ev)){
        if(fileIsAcceptedImage(ev)){
            file = ev.dataTransfer.files[0]
            sendToServer(file)   
            return file
        }
        else{
            alert("does not contain file")
        }
    }
    else if(containsURL(ev)){ 
        url = ev.dataTransfer.getData('URL')
        fetch(url)
        .then(response => response.blob(), {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
        })
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            console.log(imageObjectURL);
        });
        // console.log(`url is ${url}`)
        // let request = await fetch(url, {
        //     method: 'post', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'no-cors', // no-cors, *cors, same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     redirect: 'follow', // manual, *follow, error
        //     referrerPolicy: 'no-referrer',
        // })
        
        // let file = await request.blob()
        // console.log(file)
        // let reader = new FileReader();
        // reader.readAsBinaryString(file); // converts the blob to base64 and calls onload
        // reader.onload = () => {
        //     let data = reader.result; // data url
        //     console.log(`data is: ${data}`)
        //     sendToServer(data)
        // };
        

    }
    else{
        alert("is not valid")
    }
    //return result

})



fs.addEventListener('change', async (event) => {
   let file = await fs.files['0']
   sendToServer(file)
})

async function fileToBinary(file){
    let reader = new FileReader()
    await reader.readAsDataURL(file)
    reader.onload = () => {
        let file = reader.result
        return file
    } 
    reader.onerror = () => {
        console.log("read error!")
        return null
   }
}