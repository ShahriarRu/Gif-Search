const btn = document.querySelector(".button");
let input = document.querySelector(".search-bar");

let pushDom = function () {
  let bg = document.querySelector(".hero-bg");
  bg.style.display = "none";
  let input = document.querySelector(".search-bar");
  searchGiphy(input.value);
};

btn.addEventListener("click", pushDom);

input.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    pushDom();
  }
  // pushDom();
});

function searchGiphy(searchQuery) {
  var url =
    "https://api.giphy.com/v1/gifs/search?api_key=j69EHOh67l2BdC0qylW45BlGneq77dzO&q=" +
    searchQuery;
  //AJAX Request

  var GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open("GET", url);
  GiphyAJAXCall.send();

  GiphyAJAXCall.addEventListener("load", function (e) {
    let data = e.target.response;
    pushToDom(data);
  });
}

let pushToDom = function (inp) {
  var output = JSON.parse(inp);
  let container = document.querySelector(".gif-container");
  container.innerHTML = "";

  // let gf = document.createElement('div');
  // gf.classList.add('gif');
  // container.appendChild(gf);

  // let cardBody = document.createElement('div');
  // cardBody.classList.add('card-body');
  // let cardFoot = document.createElement('div');
  // cardFoot.classList.add('card-body');
  var imgUrls = output.data;
  if (!imgUrls.length) {
    let bg = document.querySelector(".hero-bg");
    bg.style.display = "block";
    let nt = document.querySelector(".nothing");
    nt.style.display = "block";
    return;
  }

  let counter = 0;
  imgUrls.forEach((image) => {
    let img = image.images.fixed_height.url;
    let name = image.title.split("GIF");
    // console.log(name);

    const html = `<div class="gif" id ="#gif${counter}">
                        <div class="card-body" id ="#body${counter}">
                            <img src="${img}">
                        </div>
                        <div class="card-footer" id ="#footer${counter}">
                            <h3>${name[0]}</h3>
                        </div>
                      </div>`;
    container.innerHTML += html;
    counter++;
  });
};

let gfs = document.querySelectorAll(".gif");
console.log(gfs);
