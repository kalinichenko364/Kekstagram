'use strict';
var sampleText = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'];
var names = ['Андрей', 'Виталий', 'Кирилл', 'Вячеслав', 'Надежда', 'Аня'];
var TOTAL_OBJECTS = 25;
var minLikes = 15;
var maxLikes = 200;
var maxComments = 5;
var avatarMinNumber = 1;
var avatarMaxNumber = 6;


// куда создаем шаблон
var similarPictures = document.querySelector('.pictures');
// чем заполняем шаблон
var templatePicture = document.querySelector('#picture').content.querySelector('.picture');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var addComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(avatarMinNumber, avatarMaxNumber) + '.svg',
    message: getRandomElement(sampleText),
    name: getRandomElement(names)
  };
};
var createComments = function () {
  var comments = [];
  for (var i = 0; i < maxComments; i++) {
    comments.push(addComment());
  }
  return comments;
};

// функция для создания массива из 25 сгенерированных JS объектов
var usersData = function () {
  var usersArray = [];
  for (var i = 0; i < TOTAL_OBJECTS; i++) {
    usersArray.push({
      url: 'photos/' + (i + avatarMinNumber) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(minLikes, maxLikes),
      comments: createComments()
    });
  }
  return usersArray;
};

var renderUser = function (user) {
  var userElement = templatePicture.cloneNode(true);
  userElement.querySelector('.picture__img').src = user.url;
  userElement.querySelector('.picture__comments').textContent = user.comments.length;
  userElement.querySelector('.picture__likes').textContent = user.likes;
  return userElement;
};


var showPhotos = function () {
  var pictures = usersData();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < TOTAL_OBJECTS; i++) {
    fragment.appendChild(renderUser(pictures[i]));
  }
  similarPictures.appendChild(fragment);
};

showPhotos();
