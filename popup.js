// import BlockedSite from "./BlockedSite";
const t0 = performance.now();
// console.log(0)
// instantiate previous saved sites
const inject = async () => {
    // await chrome.storage.local.set({"blockedSites": []}, function() {});
    let localSites = await chrome.storage.local.get(["blockedSites"]).then((result) => {
        console.log(result.blockedSites)
        return result.blockedSites
    })
    
    if(localSites===null || localSites==='undefined' || localSites==='' || localSites===undefined){
        console.log('no local sites found')
        
        // localStorage.setItem('blockedSites', JSON.stringify([]));
        await chrome.storage.local.set({"blockedSites": []}, function() {});
    
        localSites = await chrome.storage.local.get(["blockedSites"]).then((result) => {
            return result.blockedSites
        })
    } 
    
    console.log(localSites)
    
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
    
    const addBlockedSite = async () => {
        // get the site from the input
        const inputElement = document.querySelector('#site');
        const site = inputElement.value;
    
        inputElement.value = ''
    
        console.log(isValidUrl(site))
        if( site == '') {
            sendErrorMsg('please enter a site')
            return 0
        } else if (!isValidUrl(site)) {
            sendErrorMsg('not a valid site')
            return 0
        }
    
        const blockedSite = new BlockedSite(site);
        
        localSites.push(blockedSite);
        // localStorage.setItem('blockedSites', JSON.stringify(localSites));
        await chrome.storage.local.set({"blockedSites": localSites}, function() {});

        addToList(blockedSite)
        return 1
    }
    
    // add site to the list
    const addToList = (blockedSite) => {
    
        const name = blockedSite.title;
        const site = blockedSite.site;
        const date = blockedSite.date;
        
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
        
        const listButtons = document.createElement('div');
        listButtons.className = 'listButtons';

        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        editButton.className = 'listButton';
        deleteButton.className = 'listButton';
        const editImg = document.createElement('img');
        const deleteImg = document.createElement('img');

        editImg.src = './images/edit.png';
        editImg.alt = 'edit';
        deleteImg.src = './images/delete.png';
        deleteImg.alt = 'delete';

        editButton.appendChild(editImg);
        deleteButton.appendChild(deleteImg);

        listButtons.appendChild(editButton);
        listButtons.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            deleteSiteFromList(site)
        })
        
        // append the item details to the item header
        itemHeader.appendChild(itemTitle);
        itemHeader.appendChild(itemDate);
    
        itemBody.appendChild(itemHeader);
        itemBody.appendChild(itemSite);
        itemBody.appendChild(listButtons);
    
        LIST.appendChild(itemBody);
    
        itemBody.addEventListener('click', (e) => {
            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            console.log(elements)
            for(let i = 0; i < elements.length; i++){
                if(elements[i].className == 'listButton'){
                    console.log('button clicked')
                    return 0
                }
            }
            console.log('opening site')
            window.open(site);
        })
    }

    const deleteSiteFromList = async (site) => {
        let newSites = []
        for(let i = 0 ; i < localSites.length; i++){
            const currentSite = localSites[i];
            if(currentSite.site != site){
                newSites.push(currentSite)
            }
        }
        localSites = newSites
        await chrome.storage.local.set({"blockedSites": localSites}, function() {});
        updateSiteInList()
    }

    const updateSiteInList = () => {
        const LIST = document.querySelector('.list');
        LIST.innerHTML = ''
        localSites.forEach(site => {
            addToList(site)
        })
    }

    const signin = async (username, password) => {
        
        const HIDE_LOCK =  () => {
            const LOCK = document.querySelector('.lock')
            LOCK.style.opacity = 0;
            LOCK.style.zIndex = -1000;
            LOCK.style.pointerEvents = 'none';
        }

        // preset password and username for now
        const USERNAME = 'admin';
        const PASSWORD = 'codeninjas123';
        
        HIDE_LOCK()
        if(username == USERNAME && password == PASSWORD){
            HIDE_LOCK()
            return true
        } 
        return false
    }
    
    // add a submit on enter by user
    
    window.onload = () => {
        console.log('loading blocker details')
        if(localSites.length > 0){
            localSites.forEach(site => {
                addToList(site)
            })
        }

        try{
            // add a submit on enter by user for adding a site
            const ADD_SITE = document.querySelector('input#site');
            console.log(ADD_SITE)
            ADD_SITE.addEventListener('keydown', (event) => {
                if(event.key == 'Enter'){
                    addBlockedSite()
                }
            })
        }catch(err){
            console.log(err)
        }

        try{
            // add a submit on enter by user for signin
            const SIGNIN = document.querySelector('.signin-fields');
            console.log(SIGNIN)
            SIGNIN.addEventListener('keydown', (e) => {
                if(e.key == 'Enter'){
                    const USERNAME = SIGNIN.querySelector('#email');
                    const PASSWORD = SIGNIN.querySelector('#password');
                    signin(USERNAME.value, PASSWORD.value)
                }
            })
        } catch(err){
            console.log(err)
        }
    
    }
    
}

inject()


// test how long it takes to instantiate the script

const t1 = performance.now();

console.log(`instantiated __WEB_BLOCKER__ in ${t1-t0}ms`)