const axios = require('axios')
const data = {
    email : "any@emil.com",
    password : "12883"
}

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVmYjUxYjc5YjY4NzRmOTIyZDdiYjBjZiIsImVtYWlsIjoiYW55QGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA1JEx6MHlyZ1g4Sy9DVXlkVjJRQWlhZ3V4VHZlSVBHdTh1eDA2SmVlL1lRazJrdzVTbXFyM3MyIiwibmFtZSI6IjVmYjUxYjc5YjY4NzRmOTIyZDdiYjBjZiIsIl9fdiI6MH0sImlhdCI6MTYwNTcxMjk5MSwiZXhwIjoxNjA1OTcyMTkxfQ.EA_RWoIxtfAeEqMPrFYn-ukT2qajuGV2qAuRUY_LMqw"
axios.delete('http://localhost:3000/user/delete/5fb932943728a151b921eba4', data)
    .then(data => {
        console.log(data.data)
       /* axios.get('http://localhost:3000/user/profile', {
            headers: {
              'Authorization': `token ${access_token}`
            }
          })
        .then(data => {
            console.log(data)
        })


        .catch(err => {
            console.log(err.message)
        })*/
    })
    .catch(err => {
        console.log(err["response"].data)
}) 

