const t0 = performance.now();

const addedSites = []; //local storage input etc

const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
}

const sendErrorMsg = (msg) => {
    const ERROR_MODAL = document.querySelector('.error-modal');
    const ERROR_MSG = document.querySelector('.error-message');
    ERROR_MSG.innerText = msg;
    ERROR_MSG.style.display = 'block';

    ERROR_MODAL.style.opacity = 1;
    setTimeout(() => {
        ERROR_MODAL.style.opacity = 0;
    }, 1 * 1000)

    return 1
}

const addBlockedSite = () => {
    // get the site from the input
    const site = document.querySelector('#site').value;

    console.log(isValidUrl(site))
    if( site == '') {
        sendErrorMsg('please enter a site')
        return 0
    } else if (!isValidUrl(site)) {
        sendErrorMsg('not a valid site')
        return 0
    }

    // get the date added
    const date = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
    }
    
    console.log(date)
    addToList('unamed',site, date)
    return 1
}

// add site to the list
const addToList = (name, site, date) => {
    
    // parent list element
    const LIST = document.querySelector('.list');

    // create the list item
    const itemBody = document.createElement('div');
    itemBody.className = 'listItem';

    const itemHeader = document.createElement('div');
    itemHeader.className = 'listHeader';

    // add item details
    const itemTitle = document.createElement('h3');
    const itemDate = document.createElement('p');
    const itemSite = document.createElement('div');

    itemTitle.innerText = name;
    itemDate.innerText = `${date.month}/${date.day}/${date.year}`;

    itemSite.className = 'listSite';
    itemSite.innerText = site;

    // append the item details to the item header
    itemHeader.appendChild(itemTitle);
    itemHeader.appendChild(itemDate);

    itemBody.appendChild(itemHeader);
    itemBody.appendChild(itemSite);


    LIST.appendChild(itemBody);

    itemBody.addEventListener('click', () => {
        window.open(site);
    })
}

// add a submit on enter by user
window.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        addBlockedSite()
    }
})







// test how long it takes to instantiate the script

const t1 = performance.now();

console.log(`instantiated __WEB_BLOCKER__ in ${t1-t0}ms`)