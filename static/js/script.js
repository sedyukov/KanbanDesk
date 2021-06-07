// // class Note {
// //     constructor (category, name, content) {
// //         this.category = category;
// //         this.name = name;
// //         this.content = content;
// //         this.dateCreating; // Доделать
// //     }
// // }
//
// let newNoteBtn = document.querySelectorAll('.menu_button')[0],
//     allCategoriesBtn = document.querySelectorAll('.menu_button')[1],
//     fieldCategory = document.querySelector('.menu_categories'),
//
//     fieldNotes = document.querySelector('.notes'),
//     note = document.querySelector('.notes_item'),
//     trashBtn = document.querySelectorAll('.notes_trash')[0],
//
//     inputNoteCategory = document.querySelector('.creating_category'),
//     inputNoteName = document.querySelector('.creating_name'),
//     inputNoteContent = document.querySelector('.creating_content'),
//     // canselBtn = document.querySelectorAll('.creating_button')[0],
//     createBtn = document.querySelectorAll('.creating_button')[1];
//
//
//
// let noteList = [];
//
//
// if (localStorage.getItem('note')) {
//     noteList = JSON.parse(localStorage.getItem('note'));
//     addNote();
// }
//
// function addNote() {
//     noteList.forEach(function(item, i) {
//
//         fieldNotes.insertAdjacentHTML('beforeend',
//             <li class="notes_item" id="${i}">
//                 <label for="${i}" class="notes_name">${item.name}</label>
//                 <input type="image" src="/static/icon/Vector.svg" alt="trash" class="notes_trash">
//             </li>
//         );
//
//         fieldCategory.insertAdjacentHTML('beforeend',
//             `<li class="menu_item">${item.category}</li>`
//         );
//
//         item.id = i;
//     });
//
//
// }
//
// newNoteBtn.addEventListener('click', function() {
//     let newNote = {
//         category: inputNoteCategory.value,
//         name: inputNoteName.value,
//         content: inputNoteContent.value,
//         id: 0,
//         dateCreating: false
//     };
//
//     noteList.push(newNote);
//
//     addNote();
//     localStorage.setItem('note', JSON.stringify(noteList));
// });
//
//
// // trashBtn.addEventListener('click', function() {
// //     note.remove();
// // });
//
//
// fieldNotes.addEventListener('click', function(event) {
//     // console.log(JSON.parse(localStorage.getItem('note')));
//     // console.log(noteList[0].id);
//     let idNoteItem = +event.target.getAttribute('id');
//     console.log(idNoteItem);
//
//
// })
// "use strict";


// (($) => {
//     $.fn.extend({
//
//         $(".to_create").bind("click", ()=>{
//             console.log("xui")
//     })
//
//     });
// });