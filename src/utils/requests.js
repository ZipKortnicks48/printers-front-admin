import noop from 'lodash/noop';

const SERVER_NAME = "http://26.222.176.39:3002/"

async function postRequest(url, data = {},callbacks,token="") {
    // Default options are marked with 
    const {resolve=noop,reject=noop} = callbacks
    let response = await fetch(SERVER_NAME + url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify(data)
    });
    if (response.ok)
    {
        resolve (await response.json()) 
    }else{
        reject(await response.json(),response.status)
    }
}

async function getRequest(url, callbacks,token="") {
    // Default options are marked with 
    const {resolve=noop,reject=noop} = callbacks
    let response = await fetch(SERVER_NAME + url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token
        },
    });
    if (response.ok)
    {
        resolve (await response.json()) 
    }else{

        reject(await response.json(),response.status)
    }
}


export {
    postRequest,
    getRequest,
} 