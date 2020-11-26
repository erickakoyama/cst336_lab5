const favoriteIconNodes = document.querySelectorAll('.favoriteIcon');

Array.from(favoriteIconNodes).map(node => {
  const handleFavoriteClick = () => {
    if (node.getAttribute('src') === 'img/favorite.png') {
      node.setAttribute('src', 'img/favorite_on.png');
    }
    else {
      node.setAttribute('src', 'img/favorite.png');
    }
  };

  node.addEventListener('click', handleFavoriteClick);
});
