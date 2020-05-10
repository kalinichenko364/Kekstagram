'use strict';

var sampleMessage =
[
  'Всё отлично!', 'В целом всё неплохо. Но не всё', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var names = ['Андрей', 'Виталий', 'Кирилл', 'Вячеслав', 'Надежда', 'Аня'];
var TOTAL_OBJECTS = 25;
var minLikes = 15;
var maxLikes = 200;
var maxComents = 5;
var minNumAvatar = 1;
var maxNumAvatar = 6;

var similarListElement = document.querySelector('.pictures');
var similarImageTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

// Рандомное число от min до max
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
// Рандомная выборка одного элемента из массива
var getRandomElementArray = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
}

// Создать коментарий
var addComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(minNumAvatar, maxNumAvatar) + '.svg',
    message: getRandomElementArray(sampleMessage),
    name: getRandomElementArray(names)
  }
}
// Создать киментарии
var createComments = function () {
  var comments = [];
  for (let i = 0; i < maxComents; i++) {
    comments.push(addComment());
  }
  return comments;
}

// Создать объект картинок
var usersData = function () {
  var userArr = [];

  for (let i = 0; i < TOTAL_OBJECTS; i++) {
    userArr.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: createComments()
    })
  }
  return userArr;
}

// Создать один элемент китинки с описанием из шаблона разметки
var renderImage = function (user) {
var imageElement = similarImageTemplate.cloneNode(true);

imageElement.querySelector('.picture__img').src = user.url;
imageElement.querySelector('.picture__likes').textContent = user.likes;
imageElement.querySelector('.picture__comments').textContent = user.comments.length;

  return imageElement
}

// Создать все картинки из шаблона
var showPhotos = function () {
  var images = usersData();
  var fragment = document.createDocumentFragment();
  for (let i = 0; i < images.length; i++) {
    fragment.appendChild(renderImage(images[i]));
  }

  similarListElement.appendChild(fragment);
}

showPhotos();
