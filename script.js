"use strict";

let bookshelves = [["The Fellowship of the Ring","The Lord of the Rings by J.R.R. Tolkien tells the story of the War of the Ring in the fictional world of Middle-earth",432,true,"#a9eb89"],["One Hundred Years of Solitude","One Hundred Years of Solitude is the history of the isolated town of Macondo and of the family who founds it, the Buendías. For years, the town has no contact with the outside world, except for gypsies who occasionally visit, peddling technologies like ice and telescopes.",417,true,"#41c8cf"],["Moby Dick","The story draws from Melville's personal experience as a sailor. The true story of the American whaler the Essex inspired Melville's classic novel. The Essex was attacked and sunk, by a sperm whale in 1820.",378,false,"#fdfcbd"]];
const STORED_BOOKSHELVES = localStorage.getItem('bookshelves');
const LIBRARY = document.querySelector(".library");
const MODAL_ELEMENT = document.querySelector(".modal");
const MAIN = document.querySelector(".main");
const ADD_BOOK_BTN = document.querySelector(".add-book-btn");
const CANCEL_MODAL = document.querySelector(".cancel-btn");
const CONFIRM_MODAL = document.querySelector(".add-btn"); 
const BOOK_NAME = document.querySelector(".book-name");
const BOOK_DESCRIPTION = document.querySelector(".book-description");
const BOOK_N_PAGES = document.querySelector(".book-npages");
const BOOK_READED = document.querySelector(".book-readed");
const MODAL_SETTINGS = document.querySelector(".modal-settings");
const BOOK_NAME_SETTINGS = document.querySelector(".book-name-settings");
const BOOK_DESCRIPTION_SETTINGS = document.querySelector(".book-description-settings");
const BOOK_N_PAGES_SETTINGS = document.querySelector(".book-npages-settings");
const BOOK_READED_SETTINGS = document.querySelector(".book-readed-settings");
const BOOK_COLOR_SETTINGS = document.querySelector(".book-color-settings");
const CONFIRM_MODAL_SETTINGS = document.querySelector(".add-btn-settings"); 
const CANCEL_MODAL_SETTINGS = document.querySelector(".cancel-btn-settings");
const TOTAL_BOOKS = document.querySelector(".total-books");
const TOTAL_BOOKS_READED = document.querySelector(".books-readed");
const TOTAL_BOOKS_NOT_READED = document.querySelector(".books-not-readed");
const INFO_BUTTON = document.querySelector(".info-button");
const INFO_CONTAINER = document.querySelector(".aside-closed");
const BOOK_COLOR = document.querySelector(".book-color");
const DELETE_BOOK = document.querySelector(".delete-book");

const modal = () =>{
    MODAL_ELEMENT.style.display = "block";
    MAIN.classList.add("main-blur");
    ADD_BOOK_BTN.setAttribute("disabled", "true");

    CANCEL_MODAL.addEventListener("click",()=>{
        MODAL_ELEMENT.style.display = "none";
        MAIN.classList.remove("main-blur");
        ADD_BOOK_BTN.removeAttribute("disabled");
    });
}

const modalSettings = () =>{
    MODAL_SETTINGS.style.display = "block";
    MAIN.classList.add("main-blur");
    ADD_BOOK_BTN.setAttribute("disabled", "true");

    CANCEL_MODAL_SETTINGS.addEventListener("click",()=>{
        MODAL_SETTINGS.style.display = "none";
        MAIN.classList.remove("main-blur");
        ADD_BOOK_BTN.removeAttribute("disabled");
    });
}

const saveToLocalStorage = () => {
    localStorage.setItem('bookshelves', JSON.stringify(bookshelves));
};

let infoClosed = true;
const toggleInfo = () =>{
    if(infoClosed){
        INFO_BUTTON.style.transform = "rotate(180deg)";
        INFO_CONTAINER.classList.replace("aside-closed", "aside");
        infoClosed = false;
    }
    else{
        INFO_BUTTON.style.transform = "rotate(0)";
        INFO_CONTAINER.classList.replace("aside", "aside-closed");
        infoClosed = true;
    } 
}

const checkModal = (name, description) => {
    const INPUTS = [name, description];
    for(const INPUT of INPUTS){
        if(INPUT.value.trim() === ""){
            errorModal(INPUT);
            return false
        }
        else if(BOOK_N_PAGES.value > 3031)BOOK_N_PAGES.value = 3031;
    }
    return true;              
}

const errorModal = element =>{
    element.style.borderBottom = "1px solid rgb(224, 80, 80)"
    setTimeout(()=>{    
        element.style.borderBottom = "3px solid rgb(255, 255, 255)"
    },2000);
}

const resetModal = () =>{
    BOOK_NAME.value = null;
    BOOK_DESCRIPTION.value = null;
    BOOK_READED.checked = false;
    BOOK_N_PAGES.value = 1;
    BOOK_COLOR.value = "#ffffff";
}

const showBooks = () => {
    LIBRARY.innerHTML = bookshelves.map(([title, description, npages, readed, border], index) => `
        <div class="book" style="border-top:25px solid ${border}">
            <button class="settings-book" onclick="settings(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
            </button>
            <h3 class="text-center m-3 book-title">${title}</h3>
            <p>Description:</p>
            <p class="book-description">${description}</p>
            <p class="n-pages">Pages: ${npages}</p>
            <div class="form-check form-switch">
                <label class="form-check-label">Readed</label>
                <input class="form-check-input input-switch" id="switch" type="checkbox" role="switch" onclick="updateInformation(${index})" ${readed ? 'checked' : ''}>
            </div>
        </div>`
        ).join('');
};

const addBook = ()=>{
    let title = BOOK_NAME.value;
    let description = BOOK_DESCRIPTION.value;
    let npages = parseInt(BOOK_N_PAGES.value);
    let readed = BOOK_READED.checked;
    let borderColor = BOOK_COLOR.value;
    bookshelves.push([title,description,npages,readed,borderColor]);
    saveToLocalStorage();
}


const updateInformation = () =>{
    const SWITCH = document.querySelectorAll(".input-switch");

    let bookCount = bookshelves.length;
    let bookReadedCount = 0;
    let bookNotReadedCount = 0;
    for(let switches of SWITCH){
        if(switches.checked) bookReadedCount++;
        else bookNotReadedCount++;
    }

    TOTAL_BOOKS.textContent = `Total Books: ${bookCount}`;
    TOTAL_BOOKS_READED.textContent = `Books Readed: ${bookReadedCount}`;
    TOTAL_BOOKS_NOT_READED.textContent = `Books not readed: ${bookNotReadedCount}`;

    saveToLocalStorage();
}

let currentIndex;
const settings = (index) => {
    modalSettings();

    currentIndex = index;

    let bookToEdit = bookshelves[index];
    let bookTitle = bookToEdit[0];
    let bookDescription = bookToEdit[1];
    let bookNPages = bookToEdit[2];
    let bookReaded = bookToEdit[3];
    let bookColor = bookToEdit[4];

    BOOK_NAME_SETTINGS.value = bookTitle;
    BOOK_DESCRIPTION_SETTINGS.value = bookDescription;
    BOOK_READED_SETTINGS.checked = bookReaded;
    BOOK_N_PAGES_SETTINGS.value = bookNPages;
    BOOK_COLOR_SETTINGS.value = bookColor;

    const confirmSettingsHandler = (e) => {
        e.preventDefault();
        if (checkModal(BOOK_NAME_SETTINGS, BOOK_DESCRIPTION_SETTINGS)) {
            bookshelves[currentIndex] = [
                BOOK_NAME_SETTINGS.value,
                BOOK_DESCRIPTION_SETTINGS.value,
                BOOK_N_PAGES_SETTINGS.value,
                BOOK_READED_SETTINGS.checked,
                BOOK_COLOR_SETTINGS.value
            ];
            CANCEL_MODAL_SETTINGS.click();
            showBooks();
            updateInformation();
            saveToLocalStorage();
        }
    };

    const deleteBookHandler = (e) => {
        e.preventDefault();
        bookshelves.splice(currentIndex, 1);
        showBooks();
        CANCEL_MODAL_SETTINGS.click();
        updateInformation();
        saveToLocalStorage();
    };

    const closeModalHandler = () => {
        CONFIRM_MODAL_SETTINGS.removeEventListener("click", confirmSettingsHandler);
        DELETE_BOOK.removeEventListener("click", deleteBookHandler);
    };

    CONFIRM_MODAL_SETTINGS.addEventListener("click", confirmSettingsHandler);
    DELETE_BOOK.addEventListener("click", deleteBookHandler);
    CANCEL_MODAL_SETTINGS.addEventListener("click", closeModalHandler);
};

document.addEventListener("DOMContentLoaded", () => {
    if (STORED_BOOKSHELVES) {
        bookshelves = JSON.parse(STORED_BOOKSHELVES);
    }

    showBooks();
    updateInformation();

    INFO_BUTTON.addEventListener("click", toggleInfo);
    ADD_BOOK_BTN.addEventListener("click", () => {
        resetModal();
        modal();
    });

    CONFIRM_MODAL.addEventListener("click", (e) => {
        e.preventDefault();
        if (checkModal(BOOK_NAME, BOOK_DESCRIPTION)) {
            addBook();
            CANCEL_MODAL.click();
            showBooks();
            updateInformation();
            saveToLocalStorage();
        }
    });
});