const updateFavorite = async(action, imageUrl, keyword) => {
  const url = `/api/updateFavorites?action=${action}&imageUrl=${imageUrl}&keyword=${keyword}`;
  await fetch(url);
}

const favoriteIconNodes = document.querySelectorAll('.favoriteIcon');

Array.from(favoriteIconNodes).map(node => {
  const handleFavoriteClick = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const keyword = urlParams.get("keyword");

    const imageUrl = node.closest('img').getAttribute("src");


    if (node.getAttribute('src') === 'img/favorite.png') {
      node.setAttribute('src', 'img/favorite_on.png');
      updateFavorite('add', imageUrl, keyword);
    }
    else {
      node.setAttribute('src', 'img/favorite.png');
      updateFavorite('delete', imageUrl);
    }
  };

  node.addEventListener('click', handleFavoriteClick);
});
