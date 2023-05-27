console.log('HaoChiBlock 0')

// const HOSTNAME = window.location.hostname;
// const PATHNAME = window.location.pathname;
const FULLPATH = window.location.href;
console.log(FULLPATH)
// console.log(window.location.pathname)
// console.log(HOSTNAME)

let direction = 'https://impact.codeninjas.com'

let whitelist = true;
const URLLIST = [
    direction,
    "https://docs.google.com/document/d/1CGP_ftXjPywUPJnuh7piyjvhRqqiOL6HJ1Y9hjJlA1I/edit"
];

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
    window.location.assign(direction)
}

console.log('HaoChiBlock 1')