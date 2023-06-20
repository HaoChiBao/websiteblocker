const redirect_user = (URL) => {
    console.log(`redirecting user to ${URL}`)
    // window.location.assign(URL)
}

console.log('HaoChiBlock 0')

// const HOSTNAME = window.location.hostname;
// const PATHNAME = window.location.pathname;
const FULLPATH = window.location.href;
console.log(FULLPATH)
// console.log(window.location.pathname)
// console.log(HOSTNAME)

let direction = 'https://impact.codeninjas.com'

let whitelist = true;

// const URLLIST = [direction];
chrome.storage.local.get(["blockedSites"]).then((result) => {
    let URLLIST = [direction];

    if(result.blockedSites.length > 0){
        result.blockedSites.forEach((site) => {
            URLLIST.push(site.site)
        })
    }
    console.log(URLLIST)
    let redirect = true
    
    for(let i = 0; i <  URLLIST.length; i ++){
        const URL = URLLIST[i];
        let sameName = FULLPATH.includes(URL);
        if(sameName){
            console.log('__SAME__' + URL)
            if(whitelist){
                redirect = false;
            }
        } else {
            console.log('__NOT_SAME__' + URL)
        }
    }
    
    if(redirect){
        redirect_user(direction)
    } else {
        console.log('not redirecting')
    }

    console.log('HaoChiBlock 1')
});


