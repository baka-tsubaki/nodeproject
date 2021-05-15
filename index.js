const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    // request file path
    let filePath = path.join(
        __dirname,
         'public', 
         req.url === '/' ? 'index.html' : req.url)


    // Extension of file
    let extname = path.extname(filePath);
    
    //check ext and setcontent type 
    
    let contentType = 'text/html';


    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'images/png';
            break;
        case '.jpg':
            contentType = 'images/jpg';
            break;
        case '.svg':
            contentType = 'image/svg+xml'
            break;    
    }

    // read the file
    fs.readFile(filePath, (err, content)=>{
        if(err){
            if(err.code == 'ENOENT'){
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) =>{
                    res.writeHead(200, {'ContentType': 'text/html'});
                    res.end(content, 'utf8');
                })
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else{
            res.writeHead(200, {'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    })

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>{console.log(`Server Running on port ${PORT}`)});


