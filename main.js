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

function sendToServer(file){
    fetch(SERVER_ADDR, { method: 'POST', body: file })
    .then(response => response.json())
    .then(success => console.log(success))
    .catch(error => console.log(error));
}

function containsURL(event){
    if(event.dataTransfer.types.includes('text/uri-list')){
        return true
    }
    console.log(event.dataTransfer.types)
    return false
}

function fileIsAcceptedImage(event) {
  // todo: add more
  var imageTypes = ['image/png', 'image/gif', 'image/bmp', 'image/jpg'];
  if (event.dataTransfer && event.dataTransfer.files) {
    // event.dataTransfer.files[0].type is a Blob.type
    var fileType = event.dataTransfer.files[0].type;
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
            file = ev.dataTransfer.files
            console.log(file)
            return file
        }
        else{
            alert("does not contain file")
        }
    }
    else if(containsURL(ev)){ 
        //alert("contains url")
        console.log()
        for(let i = 0; i < ev.dataTransfer.items.length; i++){
            console.log(ev.dataTransfer.items[i])
        }
        url = ev.dataTransfer.getData('URL')
        let request = await fetch(url, {
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

        let data = await request.blob
        let file = new File([data], "file")
        return file
    }
    else{
        alert("is not valid")
    }
    //return result

})



fs.addEventListener('change', (event) => {
   let file = fs.files['0']
   console.log(file)
   let reader = new FileReader()
   reader.readAsDataURL(file)
   reader.onload = () => {
       let file = reader.result
       return file
   } 
   reader.onerror = () => {
       console.log("read error!")
   }
   
})

