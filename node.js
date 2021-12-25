const express = require('express')
const path = require('path')
const app = express()
const port = 5430

app.use(express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.listen(port, () => console.log(`http://localhost:${port}`))