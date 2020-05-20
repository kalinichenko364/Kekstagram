'use strict';

var ESC_KEY = 'Escape';

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
  var usersArr = [];

  for (let i = 0; i < TOTAL_OBJECTS; i++) {
    usersArr.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: createComments()
    })
  }
  return usersArr;
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


// part 2

var bodyDoc = document.querySelector('body');
var bigPicture = document.querySelector('.big-picture');
var commentCount = bigPicture.querySelector('.social__comment-count');
var loaderBtn = bigPicture.querySelector('.comments-loader');
var bigPreview = bigPicture.querySelector('.big-picture__preview');
var socialComments = bigPreview.querySelector('.social__comments');

var addVisible = function (className) {
  className.classList.remove('hidden');
  className.classList.remove('visually-hidden');
}
var removeVisible = function (className) {
  className.classList.add('hidden');
}
var addClassName = function (className, assign) {
  className.classList.add(assign);
}
var removeClassName = function (className, assign) {
  className.classList.remove(assign);
}


removeVisible(loaderBtn);
removeVisible(commentCount);

// Открытие большой картинки при клике на маленькую картинку
var pictures = document.querySelectorAll('.picture');
for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', function () {
    addVisible(bigPicture);
    addClassName(bodyDoc, 'modal-open');

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        removeVisible(bigPicture);
        removeClassName(bodyDoc, 'modal-open');
      }
    })
  })
}

// Закрыть большую картинку клик по кнопке
var cancelBigPictures = bigPicture.querySelector('.cancel');
cancelBigPictures.addEventListener('click', function () {
  removeVisible(bigPicture);
  removeClassName(bodyDoc, 'modal-open');
});


// Создать елемент комментарий разметку для большой фото
var generateFullScreenComment = function () {
  var container = document.createElement('li');
  container.classList.add('social__comment');

  var commentImg = document.createElement('img');
  commentImg.classList.add('social__picture');
  commentImg.style.width = '35px';
  commentImg.style.height = '35px';
  commentImg.src = 'img/avatar-' + getRandomNumber(minNumAvatar, maxNumAvatar) + '.svg';
  commentImg.alt = usersData()[0].comments[0].name;

  var text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = getRandomElementArray(sampleMessage);

  container.appendChild(commentImg);
  container.appendChild(text);

  return container
}

// Собрать весь элемент большого фото+комментарии
var renderFullScreenPhoto = function (userData) {
  bigPreview.querySelector('.big-picture__img img').src = userData.url;
  bigPreview.querySelector('.likes-count').textContent = userData.likes;
  bigPreview.querySelector('.comments-count').textContent = userData.comments.length;

  for (let i = 0; i < maxComents; i++) {
    socialComments.appendChild(generateFullScreenComment());
  }
  bigPreview.querySelector('.social__caption').textContent = userData.description;
}

renderFullScreenPhoto(usersData()[0]);


// 4.2..9. Личный проект: доверяй, но проверяй (часть 1)

var MAX_HASHTAGS = 5;
var MAX_HASHTAGS_LENGTH = 20;

var uploadFile = document.querySelector('.img-upload__input');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var effectsRadio = document.querySelectorAll('.effects__radio');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectValue = document.querySelector('.effect-level__value');
var effectSlider = document.querySelector('.img-upload__effect-level');
var textHashtags = document.querySelector('.text__hashtags');
var effectIntensity = document.querySelector('.effect-level__depth');
var scaleSmoller = document.querySelector('.scale__control--smaller');
var scaleBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');

addVisible(uploadFile);

uploadFile.addEventListener('click', function (evt) {
  evt.preventDefault();
  addVisible(uploadOverlay);
});

textHashtags.addEventListener('input', function () {
  var inputText = textHashtags.value.toLowerCase().trim();
  if (!inputText) {
    return;
  }

  textHashtags.setCastomValidity('');
  var inputArray = inputText.split(/\s+/);

  var isStartNoHashTag = inputArray.some(function (item) {
    return item[0] !== '#';
  });
  if (isStartNoHashTag) {
    textHashtags.setCastomValidity('хэш-тег должен начинаться с символа #');
  }

  var isSplitSpaceHashtag = inputArray.some(function (item) {
    return item.indexOf('#', 0) >= 1;
  });
  if (isSplitSpaceHashtag) {
    textHashtags.setCastomValidity('хэш-теги разделяются пробелами');
  }

  var isRepeatHashTag = inputArray.some(function (item, i, array) {
    return array.indexOf(item, i + 1) >= i + 1;
  });
  if (isRepeatHashTag) {
    textHashtags.setCastomValidity('один и тот же хэш-тег не может быть использован дважды');
  }

  var isLongHashTag = inputArray.some(function (item) {
    return item.length > MAX_HASHTAGS_LENGTH;
  });
  if (isLongHashTag) {
    textHashtags.setCastomValidity('максимальная длина одного хэш-тэга 20 символов, включая решетку');
  }
  if (inputArray.length > MAX_HASHTAGS) {
    textHashtags.setCastomValidity('нельзя указать больше 5-и хэш-тегов');
  }

});


// Окно Эффекты
var changeEffectRadio = function (evt) {
  if (imgUploadPreview.className === 'effects__preview--none') {
    effectSlider.classList.add('hidden');
  }
  imgUploadPreview.className = '';
  var currentFilter = evt.target.value !== 'none' ? 'effects__preview--' + evt.target.value : null;
  imgUploadPreview.classList.add(currentFilter);
  effectLevelPin.style.left = '100%';
  effectIntensity.style.width = '100%';
  imgUploadPreview.style.filter = '';
  effectValue.value = 100;
}

// События на эффекты Клики по маленьким картинкам
effectsRadio.forEach(function (elem) {
  elem.addEventListener('change', changeEffectRadio);
});

// Кнопки '+' '-'
var Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

var changeZoom = function (sign) {
  var zoom = parseInt(scaleValue.value, 10);
  zoom = zoom + sign * Zoom.STEP;

  if (zoom > Zoom.MAX) {
    zoom = Zoom.MAX;
  }
  if (zoom < Zoom.MIN) {
    zoom = Zoom.MIN;
  }

  imgUploadPreview.style.transform = 'scale(' + (zoom / 100) + ')';
  scaleValue.value = zoom + '%';
};

var onScaleInc = function () {
  changeZoom(1);
}
var onScaleDec = function () {
  changeZoom(-1);
}

scaleSmoller.addEventListener('click', onScaleDec);
scaleBigger.addEventListener('click', onScaleInc);

// Закрыть Окно эффекты
imgUploadCancel.addEventListener('click', function () {
  removeVisible(uploadOverlay);
});
