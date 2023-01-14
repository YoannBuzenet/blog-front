const getHeaders =() => {

    return {
        'Content-Type': 'text/plain',
        'Authorization': process.env.NEXT_PUBLIC_PASSPHRASE,
      }

}

const getFetchConfig = (httpVerb = "GET", body) => {

    const object = {
        method: httpVerb,
        headers: getHeaders(),
      }

      if(body){
        object.body = body;
      }

    return object
}

module.exports = {
    getFetchConfig
}