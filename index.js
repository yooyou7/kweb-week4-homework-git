const axios = require('axios');
const querystring = require('querystring');
const url = require('url');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    async function process() {
        console.log(req);
        let par = url.parse("http://127.0.0.1:3000" +req.url);
        console.log(par);
        let part2 = querystring.parse(par["query"]);
        console.log(part2);
        let link = 'https://api.github.com/repos/';
        if (par["pathname"] != "/") {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end("Page not found!");
            return;
        } else if (part2["repo"] === undefined) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end("Invalid Query!");
            return;
        }
        let reqURL = link + part2["repo"];
        
        try {
            const answer = await axios.get(reqURL);
            console.dir(answer);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Repo: ${part2["repo"]}\nstargazers_count: ${answer["data"]["stargazers_count"]}\nopen_issues_count: ${answer["data"]["open_issues_count"]}\n`);
        } catch (e) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end("Repository Not Found!");
        } 
            
    }
    process()
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

/*
async function test() {
    try {
    const response = await axios.get('https://api.github.com/repos/nodejs/node');
    console.dir(response);
    } catch (e) {
        console.log(e);
    }
}
*/