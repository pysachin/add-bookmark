
const btnAddBookmark = document.getElementById('idBtnAddBookMark');
const addBookMarkContainer = document.getElementById('idAddBKContainder');
const idCloseAddBkContainer = document.getElementById('idCloseAddBkContainer');
const websiteNameEl = document.getElementById('idname');
const websiteURLEl = document.getElementById('idurl');
const bookmarkForm = document.getElementById('idBookmarkForm');
const bookmarksContainer = document.getElementById('idbookmarks-container');

let bookmarks = {};


function showModal(){
    addBookMarkContainer.classList.add('show_modal');
    websiteNameEl.focus();
}

function hideModal(){
    addBookMarkContainer.classList.remove('show_modal');
}

function deleteBookmark(url){

    if (bookmarks[url]) {
		delete bookmarks[url]
	}
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}

function validate(nameValue,urlValue){
    const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
	const regex = new RegExp(expression);
	if (!nameValue || !urlValue) {
		alert('Please submit values for both fields.');
		return false;
	}
	if (!urlValue.match(regex)) {
		alert('Please provide a valid web address.');
		return false;
	}
	// Valid
	return true;
}

function fetchBookmarks(){

        
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    else{

        const id = `https://google.com`
        bookmarks[id] = {
            name:'google',
            url:'https://google.com'
        }
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    console.log(bookmarks);
    buildBookmarks();
}

function buildBookmarks(){

    // <div class="item">
    //         <div>
    //             <i class="far fa-times-circle item-del"></i>
    //         </div>
    //         <div class="name">
    //             <i class="fas fa-bookmark">
    //                 <a href="www.google.com">googleghjk.com</a>
    //             </i>
    //         </div>
    //     </div>
    bookmarksContainer.textContent = '';
    Object.keys(bookmarks).map((id)=>{

        const { name, url } = bookmarks[id];

        const item = document.createElement('div');
        item.classList.add('item');

        const delDiv = document.createElement('div');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('far', 'fa-times-circle', 'item-del');
        closeIcon.setAttribute('onClick',`deleteBookmark('${id}')`);
        
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');

        const favicon = document.createElement('i');
        favicon.classList.add('fas','fa-bookmark')

        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.textContent = name;

        //Append All
        favicon.appendChild(link);
        linkInfo.append(favicon);
        delDiv.appendChild(closeIcon);
        item.append(delDiv,linkInfo);
        bookmarksContainer.appendChild(item);

    });
}


function submit(e){
    e.preventDefault();

    const websiteName = websiteNameEl.value;
    let websiteURL = websiteURLEl.value;
    if(!websiteURL.includes('http://','https://')){
        websiteURL = `https://${websiteURL}`;
    }

    if(!validate(websiteName,websiteURL)){
        return false;
    }

    const bookmark = {
        name:websiteName,
        url:websiteURL
    }

    bookmarks[websiteURL] = bookmark;
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus(); 
}


btnAddBookmark.addEventListener('click',showModal);
idCloseAddBkContainer.addEventListener('click',hideModal);
bookmarkForm.addEventListener('submit',submit)

fetchBookmarks();