window.addEventListener("load", (event) => {
  rendeFeaturedGameList();
  renderHeroImg();
  rendeNewGameList();
});
// list game

const getFeaturedGames = async () => {
  try {
    const URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/features";
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
getFeaturedGames().then((err) => console.log(err));

const getCategoryGames = async () => {
  try {
    const URL =
      "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?genres=action&steamspy_tags=fps&page=2&limit=5";
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
getCategoryGames().then((code) => console.log(code));

const GetAllGames = async () => {
  try {
    const URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games";
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
GetAllGames().then((code) => console.log(code));

const rendeFeaturedGameList = async () => {
  try {
    const data = await getFeaturedGames();
    const featuredGameList = document.querySelector("#featured-game-list");
    const ulFeaturedGameList = featuredGameList.children[0];
    ulFeaturedGameList.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      const li = document.createElement("li");
      li.innerHTML = `<div class="featured-game-img" onclick="InputHeroImg(${data.data[i].appid})"><img src="${data.data[i].header_image}" alt=""></div>
            <div class="featured-game-name" onclick="InputHeroImg(${data.data[i].appid})">${data.data[i].name}</div>`;
      ulFeaturedGameList.appendChild(li);
    }
  } catch (error) {
    console.log(error);
  }
};
rendeFeaturedGameList();

const renderHeroImg = async () => {
  try {
    const data = await getFeaturedGames();
    const heroImage = document.querySelector("#hero-img");
    heroImage.innerHTML = "";
    const div = document.createElement("div");
    heroImage.style.background = `url(${data.data[0].header_image})`;
    div.innerHTML = `<div>
        <div class="mg-bt">
         <div class="description fonts">${data.data[0].description}</div>
         <div class="fonts-free">Free</div>
         <div class="flex-hero">
           <div class="get-btn fonts1 btn">${data.data[0].genres[1]}</div>
           <div class="wishlist-btn fonts1 btn"><i class="fa-solid fa-circle-plus">Add to wishlist</i></div>
         </div>
        </div>
      </div>`;
    heroImage.appendChild(div);
  } catch (error) {
    console.log(error);
  }
};

const InputHeroImg = async (gameid) => {
  try {
    const data = await getFeaturedGames();
    const heroImage = document.querySelector("#hero-img");
    heroImage.innerHTML = "";
    const div = document.createElement("div");
    // heroImage.style.background = `url(${data.data[0].header_image})`;
    const game = data.data.find((index) => index.appid == gameid);
    heroImage.style.background = `url(${game.header_image})`;
    if (game.price === 0) {
      div.innerHTML = `<div>
            <div class="mg-bt">
             <div class="description fonts">${game.description}</div>
             <div class="fonts-free">Free</div>
             <div class="flex-hero">
               <div class="get-btn fonts1 btn">${game.genres[1]}</div>
               <div class="wishlist-btn fonts1 btn"><i class="fa-solid fa-circle-plus">Add to wishlist</i></div>
             </div>
            </div>
          </div>`;
    } else {
      div.innerHTML = `<div>
            <div class="mg-bt">
             <div class="description fonts">${game.description}</div>
             <div class="fonts-free">Free</div>
             <div class="flex-hero">
               <div class="get-btn fonts1 btn">${game.genres[1]}</div>
               <div class="wishlist-btn fonts1 btn"><i class="fa-solid fa-circle-plus">Add to wishlist</i></div>
             </div>
            </div>
          </div>`;
    }
    heroImage.appendChild(div);
  } catch (err) {
    console.log("err", err);
  }
};

//newgame
const rendeNewGameList = async () => {
  try {
    const data = await GetAllGames();
    const featuredGameList = document.querySelector("#new-games");
    const ulFeaturedGameList = featuredGameList.children[0];
    ulFeaturedGameList.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      const div = document.createElement("div");
      if (data.data[i].price === 0) {
        div.innerHTML = `<div class="game-area-slider">
                    <div class="game-img-medium" onclick="renderGameDetails(${data.data[i].appid})"><img src="${data.data[i].header_image}" alt=""></div>
                    <div class="game-name" onclick="renderGameDetails(${data.data[i].appid})">${data.data[i].name}</div>
                    <div class="game-flex">
                    <div>
                    <div class="new-price" onclick="renderGameDetails(${data.data[i].appid})">Free to play</div>
                    </div>
                    </div>
                  </div>`;
      } else {
        div.innerHTML = `<div class="game-area-slider">
                    <div class="game-img-medium" onclick="renderGameDetails(${data.data[i].appid})"><img src="${data.data[i].header_image}" alt=""></div>
                    <div class="game-name" onclick="renderGameDetails(${data.data[i].appid})">${data.data[i].name}</div>
                    <div class="game-flex">
                    <div>
                    <div class="new-price" onclick="renderGameDetails(${data.data[i].appid})">$ ${data.data[i].price}</div>
                    </div>
                </div>
                </div>`;
      }
      ulFeaturedGameList.appendChild(div);
    }
  } catch (error) {
    console.log(error);
  }
};
//physicsname
const rendeCategoryGame = async () => {
  try {
    const data = await getCategoryGames();
    const featuredGameList = document.querySelector("#category-game");
    const ulFeaturedGameList = featuredGameList.children[0];
    ulFeaturedGameList.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      const li = document.createElement("li");
      li.innerHTML = ` <div class="game-area-slider">
            <div class="game-img-medium" onclick="rendeCategoryGameDetail(${data.data[i].appid})"><img src="${data.data[i].header_image}" alt=""></div>
            <div class="game-name" onclick="rendeCategoryGameDetail(${data.data[i].appid})">${data.data[i].name}</div>
            <div class="game-flex">
              <div>
                <div class="new-price" onclick="rendeCategoryGameDetail(${data.data[i].appid})">${data.data[i].price}$</div>
              </div>
            </div>
          </div>`;
      ulFeaturedGameList.appendChild(li);
    }
  } catch (error) {
    console.log(error);
  }
};
rendeCategoryGame();

const renderGameDetails = async (gameid) => {
  try {
    const data = await GetAllGames();
    const popupGame = document.querySelector("#popup-game");
    popupGame.innerHTML = "";
    const div = document.createElement("div");
    const game = data.data.find((index) => index.appid == gameid);
    console.log(game);
    if (game.price === 0) {
      div.innerHTML = `<div id="overlay">
          <div class="popup">
            <div class="close" onclick="closePopup()">&times;</div>
            <div class="content_popup">
              <div class="game-img-big"><img src="${game.header_image}" alt=""></div>
              <div class="game-name">${game.name}</div>
              <div class="game-price">Free to play</div>
              <div class="game-category">Category: ${game.genres}</div>
              <div class="game-developer">Developer: ${game.developer}</div>
              <div class="flex-popup">
              <div class="get-btn-1 fonts1 btn">Get this game</div>
              <div class="wishlist-btn-1 fonts1 btn"><i class="fa-solid fa-circle-plus"></i>Add to wishlist</div>
              </div>
            </div>
          </div>
        </div>`;
    } else {
      div.innerHTML = `<div id="overlay">
          <div class="popup" >
            <div class="close" onclick="closePopup()">&times;</div>
            <div class="content_popup">
              <div class="game-img-big"><img src="${game.header_image}" alt=""></div>
              <div class="game-name">${game.name}</div>
              <div class="game-price">Price: $ ${game.price}</div>
              <div class="game-category">Category: ${game.genres}</div>
              <div class="game-developer">Developer: ${game.developer}</div>
              <div class="flex-popup"> <div class="get-btn-1 fonts1 btn">Get this game</div>
              <div class="wishlist-btn-1 fonts1 btn"><i class="fa-solid fa-circle-plus"></i>Add to wishlist</div></div>
            </div>
          </div>
        </div>`;
    }
    popupGame.appendChild(div);
    const overLay = document.querySelector("#overlay");
    overLay.style.background = `url(${game.background})`;
    //   overLay.style.visibility = "visible"
  } catch (err) {
    console.log("err", err);
  }
};
const closePopup = () => {
  const popupGame = document.querySelector("#popup-game");
  popupGame.innerHTML = "";
  const overLay = document.querySelector("#overlay");
  overLay.style.visibility = "hidden";
};
renderGameDetails();

const rendeCategoryGameDetail = async (gameid) => {
  try {
    const data = await getCategoryGames();
    const popupGame = document.querySelector("#popup-game");
    popupGame.innerHTML = "";
    const div = document.createElement("div");
    const game = data.data.find((index) => index.appid == gameid);
    if (game.price === 0) {
      div.innerHTML = `<div id="overlay">
          <div class="popup">
            <div class="close" onclick="closePopup()">&times;</div>
            <div class="content_popup">
              <div class="game-img-big"><img src="${game.header_image}" alt=""></div>
              <div class="game-name">${game.name}</div>
              <div class="game-price">Free to play</div>
              <div class="game-category">Category: ${game.genres}</div>
              <div class="game-developer">Developer: ${game.developer}</div>
              <div class="flex-popup">
              <div class="get-btn-1 fonts1 btn">Get this game</div>
              <div class="wishlist-btn-1 fonts1 btn"><i class="fa-solid fa-circle-plus"></i>Add to wishlist</div>
              </div>
            </div>
          </div>
        </div>`;
    } else {
      div.innerHTML = `<div id="overlay">
          <div class="popup">
            <div class="close" onclick="closePopup()">&times;</div>
            <div class="content_popup">
              <div class="game-img-big"><img src="${game.header_image}" alt=""></div>
              <div class="game-name">${game.name}</div>
              <div class="game-price">Price: $ ${game.price}</div>
              <div class="game-category">Category: ${game.genres}</div>
              <div class="game-developer">Developer: ${game.developer}</div>
              <div class="flex-popup"> <div class="get-btn-1 fonts1 btn">Get this game</div>
              <div class="wishlist-btn-1 fonts1 btn"><i class="fa-solid fa-circle-plus"></i>Add to wishlist</div></div>
            </div>
          </div>
        </div>`;
    }
    popupGame.appendChild(div);
    const overLay = document.querySelector("#overlay");
    overLay.style.background = `url(${game.background})`;
    //   overLay.style.visibility = "visible"
  } catch (err) {
    console.log("err", err);
  }
};

rendeCategoryGameDetail();
