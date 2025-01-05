const posts = [];

const TITLE__VALIDATION__LIMIT = 10;
const TEXT__VALIDATION__LIMIT = 20;

// document.querySelector - позволяет достать элемент из html и уже работать с ним
const titleInputNode = document.querySelector('.js-app__input');
const textInputNode = document.querySelector('.js-app__text');
const newPostBtnNode = document.querySelector('.js-app__button');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.getElementById('validationMessage');


newPostBtnNode.addEventListener('click', function() {
    //получить данные из поля ввода
     const postFromUser = getPostFromUser();

     addPost(postFromUser);

     renderPosts();

}); //обработчик события


// можно прописать таким образом, прописав просто название функции
titleInputNode.addEventListener('input', validation);

// либо же прописать полностью для лучшей читаемости
textInputNode.addEventListener('input', function () {
    validation()
});

function validation() {
    const titlelen = titleInputNode.value.length;
    const textlen = textInputNode.value.length;

    if (titlelen > TITLE__VALIDATION__LIMIT) {
        validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE__VALIDATION__LIMIT} символов`;
        validationMessage.classList.remove('validationMessage__hidden');
        return;
    }

    if (textlen > TEXT__VALIDATION__LIMIT) {
        validationMessage.innerText = `Длина текста не должна превышать ${TEXT__VALIDATION__LIMIT} символов`;
        validationMessage.classList.remove('validationMessage__hidden');
        return;
    }

    // Если ни одно из условий не выполняется, скрываем сообщение
    validationMessage.classList.add('validationMessage__hidden');
}





function getPostFromUser() {
    const title = titleInputNode.value;
    const text = textInputNode.value;

    return {
        title: title,
        text: text,
    };
}

function addPost({title, text}) {
 const currentDate = new Date();
 const dt = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
 posts.push({
    dt,
    title: title,
    text: text
 });
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML +=  `
        <div class='post'>
               <p class='post__date'>${post.dt}</p>
               <p class='post__title'>${post.title}</p>
               <p class='post__text'>${post.text}</p>
        </div>
       
        `
    });



    postsNode.innerHTML = postsHTML;
}
