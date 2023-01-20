const getHeaders =(contentType ="text/plain") => {

    return {
        'Content-Type': contentType,
        'Authorization': process.env.NEXT_PUBLIC_PASSPHRASE,
      }

}

const getFetchConfig = (httpVerb = "GET", body, contentType ="text/plain") => {

    const object = {
        method: httpVerb,
        headers: getHeaders(contentType),
      }

      if(body){
        object.body = JSON.stringify(body);
      }

    return object
}

module.exports = {
    getFetchConfig
}