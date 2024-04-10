const fs = require('fs')

const requestHandler = (req, res) => {

    const url = req.url
    const method = req.method

    if(url === '/'){
        res.write('<html>')
        res.write('<head><title>PHOENIX NODE SERVER | HOME </title></head>')
        res.write('<body>')
        res.write('<center><h1>Bonjour!</h1></center>')
        res.write('<form action="/create-user" method="POST">')
        res.write('ADD USER TO FILE<br/><input type="text" name="user"/>')
        res.write('<button type="submit">CREATE</button>')
        res.write('</form>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }

    if(url === '/users' ){
        res.write('<html>')
        res.write('<head><title>PHOENIX NODE SERVER | USERS</title></head>')
        res.write('<body>')
        res.write('<h1><center>USERS</center></h1><br/><ul><li>Sultan Tin</li><li>Tadiwanashe Ndhlovu</li><li>Rumbidzaishe Ndhlovu</li></ul>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }

    if(url === '/create-user' && method === 'POST'){

        //fs.writeFileSync('users.txt','Ndhlovu1')
        const user = [];

        //FETCH THE DATA BEING SENT VIA THE HTTP FORM
        req.on('data',(chunk) => {
            user.push(chunk)
        })

        //Push this to the console
        req.on('end',()=> {
            const parsedUser = Buffer.concat(user).toString()
            console.log(parsedUser)
            const userMain = parsedUser.split('=')
            fs.writeFileSync('users.txt',parsedUser)
        })
        

        res.statusCode = 302
        res.setHeader('Location','/')
        return res.end()

        

    }

}

module.exports = {
    requestHandler
 }

