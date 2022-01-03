const url = 'https://videochatapp.davidotamendi.com:8443'
createTokenAndStart()

function createTokenAndStart(){
    let fullUrl = url+'/login'
    postData(fullUrl, { username: 'Davide' } )
    .then(data => {
        console.log(data)
        initRoom(data)
    });
}

// Send request for token creation
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST', mode: 'cors',
        cache: 'no-cache', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data)
    });
    return (response.json())
}

function initRoom(token){
    console.log('token: '+token.accestoken)

    let socket = io.connect(url, 
        { transportOptions: {
            polling: {
              extraHeaders: {
                'Authorization': `Bearer ${token.accestoken}`,
              },
            },
        },
    })
    sendData(socket)
}

function sendData(socket){
    
    const dataToSend = {
        userName: 'Davide',
        userImg: '1.png',
        userTimezone: '3',
        privateRoom: 'no one'
    }

    socket.emit('joinsPvtRoom', dataToSend, (data) =>{
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })
}

