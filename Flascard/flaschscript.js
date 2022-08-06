const deck = {
  "cards": [
    {
      "position": 1,
      "frontMedia": {
        "mimeType": null,
        "src": null
      },
      "frontCopy": "Where is the sympathetic chain",
      "backMedia": {
        "mimeType": "image/jpeg",
        "src": "https://slideplayer.com/slide/3256268/11/images/7/Sympathetic_Trunk_Ganglia.jpg"
      },
      "backCopy": "The bilaterally symmetric sympathetic chain ganglia, also called the paravertebral ganglia, are located just ventral and lateral to the spinal cord. The chain extends from the upper neck down to the coccyx, forming the unpaired coccygeal ganglion"
    },
    {
      "position": 2,
      "frontMedia": {
        "mimeType": null,
        "src": null
      },
      "frontCopy": "What is the best position to perform C/S AROM for an acute injury or post whiplash?",
      "backMedia": {
        "mimeType": "image/jpeg",
        "src": "http://livingmetta.com/wp-content/uploads/2012/08/14%20Plow%20SM1-550x300.jpg"
      },
      "backCopy": "Supine position with head resting on pillow"
    }
  ]
};

window.onload = function() {
  hideNavButtonsForMobileOperatingSystems();
  showCard(0);
  var initialX = null;
  
  document.getElementsByClassName('flash-card')[0]
    .addEventListener('click', handleClick, false);
  document.getElementsByClassName('bg-full-screen')[0]
    .addEventListener('click', handleClick, false);
  document.getElementsByClassName('img-responsive')[0]
    .addEventListener('click', handleClick, false);
  
  var swipe = document.getElementById('cardViewer');
  swipe.addEventListener('touchstart', handleTouchStart, false);
  swipe.addEventListener('touchmove', handleTouchMove, false);
  swipe.addEventListener('touchend', handleTouchEnd, false);
}

document.body.onkeyup = function(e) {
  const spaceBar = 32;
  const leftArrow = 37;
  const rightArrow = 39;
  
  switch (e.keyCode) {
    case spaceBar:
      flipCard();
      break;
    case leftArrow:
      previousCard();
      break;
    case rightArrow:
      nextCard();
      break;
  }
}

function toggleFullscreen(event, el) {
  event.stopPropagation();
  
  if (el) {
    src = el.src;
    document.getElementById('fullScreenImg').src = src;
  } else {
    document.getElementById('fullScreenImg').src = '';
  }
  
  document.getElementsByClassName('bg-full-screen')[0].classList.toggle('show');
}

function flipCard() {
  document.getElementById('cardViewer').classList.toggle('flip');
}

function nextCard() {
  const newIndex = parseInt(document.getElementById('currentPosition').textContent, 10);
  const cardCount = deck.cards.length;
  
  let transformClass = 'slide-right-stop';
  let transitionTime = 50;
  if (cardCount > newIndex) {
    transformClass = 'slide-right';
    transitionTime = 250;
  }
  
  document.getElementsByClassName('flash-card-view')[0].classList.add(transformClass);
  setTimeout(function(){
    if (cardCount > newIndex) showCard(newIndex);
    document.getElementsByClassName('flash-card-view')[0].classList.remove(transformClass);
  }, transitionTime);
}

function previousCard() {
  const newIndex = parseInt(document.getElementById('currentPosition').textContent, 10) - 2;
  
  let transformClass = 'slide-left-stop';
  let transitionTime = 50;
  if (newIndex >= 0) {
    transformClass = 'slide-left';
    transitionTime = 250;
  }
  
  document.getElementsByClassName('flash-card-view')[0].classList.add(transformClass);
  setTimeout(function() {
    if (newIndex >= 0) showCard(newIndex);
    document.getElementsByClassName('flash-card-view')[0].classList.remove(transformClass);
  }, transitionTime);
}

function swipeNextCard() {
  const newIndex = parseInt(document.getElementById('currentPosition').textContent, 10);
  const cardCount = deck.cards.length;
  let transformClass = 'slide-left-stop';
  let transitionTime = 50;
  if (cardCount > newIndex) {
    transformClass = 'slide-left';
    transitionTime = 250;
  }
  
  let cardView = document.getElementById('cardViewer');
  
  cardView.style.transform = null;
  cardView.classList.add(transformClass);
  setTimeout(function() {
    if (cardCount > newIndex) showCard(newIndex);
    document.getElementsByClassName('flash-card-view')[0].classList.remove(transformClass);
  }, transitionTime);
}

function swipePreviousCard() {
  const newIndex = parseInt(document.getElementById('currentPosition').textContent, 10) - 2;
  
  let transformClass = 'slide-right-stop';
  let transitionTime = 50;
  if (newIndex >= 0) {
    transformClass = 'slide-right';
    transitionTime = 250;
  }
  
  let cardView = document.getElementById('cardViewer');
  
  cardView.style.transform = null;
  cardView.classList.add(transformClass);
  setTimeout(function() {
    if (newIndex >= 0) showCard(newIndex);
    document.getElementsByClassName('flash-card-view')[0].classList.remove(transformClass);
  }, transitionTime);
}

function showCard(i) {
  setInitialCardPosition();
  const card = deck.cards[i];
  
  setFrontMedia(card.frontMedia);
  document.getElementById('frontCopy').innerHTML = card.frontCopy;
  
  setBackMedia(card.backMedia);
  document.getElementById('backCopy').innerHTML = card.backCopy;
  
  document.getElementById('currentPosition').innerHTML = i + 1;
  document.getElementById('cardCount').innerHTML = deck.cards.length;
}

function setFrontMedia(media) {
  if (media.src === null) return false;
  
  let mediaEl;
  if (media.mimeType.indexOf("video") >= 0) {
    mediaEl = document.getElementById('frontVideo');
    
    mediaEl.classList.remove('hide');
    document.getElementById('frontImage').classList.add('hide');
  } else {
    mediaEl = document.getElementById('frontImage');
    
    mediaEl.classList.remove('hide');
    document.getElementById('frontVideo').classList.add('hide');
  }
  
  mediaEl.src = media.src;
  mediaEl.type = media.mimeType;
}

function setBackMedia(media) {
  if (media.src === null) return false;
  
  let mediaEl;
  if (media.mimeType.indexOf("video") >= 0) {
    mediaEl = document.getElementById('backVideo');
    
    mediaEl.classList.remove('hide');
    document.getElementById('backImage').classList.add('hide');
  }  else {
    mediaEl = document.getElementById('backImage');
    
    mediaEl.classList.remove('hide');
    document.getElementById('backVideo').classList.add('hide');
  }
  
  mediaEl.src = media.src;
  mediaEl.type = media.mimeType;
}

function showCardBacksFirst() {
  return document.getElementById('cardBacksFirst').checked;
}

function setInitialCardPosition() {
  if (showCardBacksFirst()) {
    document.getElementById('cardViewer').classList.add('flip');
  } else {
    document.getElementById('cardViewer').classList.remove('flip');
  }
}

function handleTouchStart(e) {
  initialX = e.touches[0].clientX;
  e.preventDefault();
}

function handleTouchMove(e) {
  if (initialX === null) return;
  
  let currentX = e.changedTouches[0].clientX;
  let diffX = currentX - initialX;
  let card = document.getElementById('cardViewer');
  
  card.style.transform = 'translateX(' + diffX + 'px)';
  
  e.preventDefault();
}

function handleTouchEnd(e) {
  if (initialX === null) return;

  let currentX = e.changedTouches[0].clientX;
  
  let diffX = currentX - initialX;
  let card = document.getElementById('cardViewer');
  let cardWidth = card.offsetWidth;
  let percentMovedX = diffX / cardWidth;
  
  if (Math.abs(percentMovedX) >= 0.2) {
    // sliding horizontally
    if (percentMovedX >= 0.2) {
      // swiped left
      card.style.transform = null;
      swipePreviousCard();
      e.preventDefault();
    } else if (percentMovedX <= -0.2) {
      // swiped right
      card.style.transform = null;
      swipeNextCard();
      e.preventDefault();
    }
  } else if (Math.abs(diffX) <= 35) {
    if (e.target.classList.contains('img-responsive')) {
      toggleFullscreen(e, e.target);
    } else {
      flipCard();
    }
  }
  
  initialX = null;
}

function handleClick(e) {
  if (e.target.tagName.toLowerCase() === 'img') {
    toggleFullscreen(e, e.target);
  } else {
    flipCard();
  }
}

function isMobileOperatingSystem() {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/windows phone/i.test(userAgent) ||
      /android/i.test(userAgent) ||
      /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  {
    return true;
  }

  return false;
}

function hideNavButtonsForMobileOperatingSystems() {
  if (isMobileOperatingSystem()) {
    document.querySelectorAll('.btn-circle').forEach(function(el) {
      el.style.display = 'none';
    });
    document.getElementById('previousCard').style.display = 'none';
    document.getElementById('nextCard').style.display = 'none';
  }
}