let up = document.querySelector(".scroll-up");

window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 200) {
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }
});
up.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
// --------------------------------------

// popup image
let gallery = document.querySelectorAll(".gallery .container .image img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popupBox";

    let popupImg = document.createElement("img");
    popupImg.src = img.src;

    popupBox.appendChild(popupImg);

    document.body.appendChild(popupBox);

    let span = document.createElement("span");

    span.className = "del";

    span.appendChild(document.createTextNode("X"));

    let next = document.createElement("button");
    next.className = "btn-next";
    next.appendChild(document.createTextNode("next"));
    popupBox.appendChild(next);

    popupBox.appendChild(span);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "del") {
    document.querySelector(".popupBox").remove();
    document.querySelector(".popup-overlay").remove();
  }
});
// --------------------------------------

// next-slider img
// let next = document.querySelector(".btn-next");
// let box = document.querySelector(".gallery .container .image");
// let array = [
//   "project-1 (10).jpg",
//   "project-1 (9).jpg",
//   "project-1 (8).jpg",
//   "project-1 (7).jpg",
//   "project-1 (6).jpg",
//   "project-1 (5).jpg",
//   "project-1 (4).jpg",
//   "project-1 (3).jpg",
//   "project-1 (2).jpg",
// ];

// function prev() {
//   if (i <= 0) i = array.length;
//   i--;
//   return setImg();
// }
// function next() {
//   if (i >= array.length - 1) i = -1;
//   i++;
//   return setImg();
// }

// function setImg() {
//   return gallery.setAttribute("src", "imgs/" + array[i]);
// }
// --------------------------------------

//count down
let wantedDate = new Date("Nov 27, 2024 23:0:0").getTime();

let counter = setInterval(() => {
  let dateNow = new Date().getTime();

  let diffDate = wantedDate - dateNow;

  let days = Math.floor(diffDate / (1000 * 60 * 60 * 24));
  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;

  let hours = Math.floor((diffDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;

  let minutes = Math.floor((diffDate % (1000 * 60 * 60)) / (1000 * 60));
  document.querySelector(".minutes").innerHTML =
    minutes < 10 ? `0${minutes}` : minutes;

  let seconds = Math.floor((diffDate % (1000 * 60)) / 1000);
  document.querySelector(".seconds").innerHTML =
    seconds < 10 ? `0${seconds}` : seconds;

  if (diffDate < 0) {
    alert("it`s KO 19");
  }
}, 1000);
// --------------------------------------------------------------

// animation on scroll to skill section
let section = document.querySelector(".skills");
let theSpan = document.querySelectorAll(".progress .percent span");
// console.log(theSpan);

window.addEventListener("scroll", (e) => {
  if (window.scrollY >= section.offsetTop - 100) {
    theSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
});

// --------------------------------------------------------------

// animation on scroll to stats section
let sectionStats = document.querySelector(".stats");
let moveH = document.querySelectorAll(".stats .container .box h3");
let started = true;

// create function for counter
function startCount(e) {
  let goal = e.dataset.goal; //data goal => from html
  let count = setInterval(() => {
    e.textContent++;
    if (e.textContent == goal) {
      clearInterval(count);
    }
  }, 100 / goal);
}
// start function counter when scroll
window.onscroll = function () {
  if (window.scrollY >= sectionStats.offsetTop - 100) {
    if (started) {
      moveH.forEach((cou) => {
        startCount(cou);
      });
    }
    started = false; // دي عشان توقف الكاونتر عند العدد ال ف الجول
  }
};
// --------------------------------------------------------------

// scrolling to section when click on bullet
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
// طريقة
function scrollingOnClick(ele) {
  ele.forEach((e) => {
    e.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollingOnClick(allBullets);

//  طريقةأخرى
// allBullets.forEach((element) => {
//   element.addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector(e.target.dataset.section).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });
// ------------------------------------------------------------

// settings box

let settingBox = document.querySelector(".setting-box .silder");
let sectionBox = document.querySelector(".setting-box");

settingBox.onclick = function () {
  sectionBox.classList.toggle("open");
};
// ------------------------------------------------------------------
/*
changing color
*/

// function to remove active and add it again
function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  e.target.classList.add("active");
}

let colorList = document.querySelectorAll(".color-list li");
// console.log(colorList);
colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });
});

let mainColor = window.localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".color-list li").forEach((re) => {
    re.classList.remove("active");

    if (re.dataset.color === mainColor) {
      re.classList.add("active");
    }
  });
}
