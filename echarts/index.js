let express = require('express')    //加载express模块
let app = express()

app.use(express.static(__dirname))
app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.listen(30001, () => console.log("Example app listening on port 30001!"));