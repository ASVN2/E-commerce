const menu = document.querySelector(".menu");
const colse = document.querySelector(".container .colse");
const slide = document.querySelector(".links ul");
const images = document.querySelectorAll(".thumbnail li img");
const boxImage = document.querySelector(".perview img");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const counter = document.querySelector(".counter");
let prodact = document.querySelector(".shop-area .cart");
let itWorks = true;
let countering = 0;
let current = 0;
let ones = 1;
let itWorks2 = false;
let runDelet = false;

// for open the menu
menu.addEventListener("click", () => {
  slide.classList.add("active");
  overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);
});

// for colse the menu
colse.addEventListener("click", () => {
  slide.classList.remove("active");
  document.querySelector(".overlay").remove();
});

function imageChange() {
  // change preview images
  images.forEach((image) => {
    image.addEventListener("click", () => {
      // remove the classes
      images.forEach((image) => {
        image.parentElement.classList.remove("active");
      });

      image.parentElement.classList.add("active");
      boxImage.src = image.src.replace("-thumbnail", "");
    });
  });
}
imageChange();
// function for remove the classes

function removeing(theClass, array) {
  array.forEach((element) => {
    element.classList.remove(theClass);
  });
}

// counter of prodacts

plus.addEventListener("click", () => {
  if (countering < 99) {
    countering += 1;
    counter.textContent = countering;
  }
});

minus.addEventListener("click", () => {
  if (countering > 0) {
    countering -= 1;
    counter.textContent = countering;
  }
});

// after clicking on the add to cart button

document.querySelector("#cart").addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "pordact";
  countering == 0 ? (countering = 1) : (countering = countering);
  div.innerHTML = `
  <div class="pordact">
  <div class="image">
    <img src="images/image-product-1-thumbnail.jpg" alt="" />
  </div>
  <div class="info">
    <div class="title">Fall Limited Edition Sneakers</div>
    <div class="price">
      $150.00 x ${countering} <span class="total">$${countering * 125}.00</span>
    </div>
  </div>
  <div class="trush">
    <img src="images/icon-delete.svg" alt="" />
  </div>
</div>;
  `;

  if (itWorks) {
    document.querySelector(".shop-area .cart-box").appendChild(div);
    itWorks = false;
    runDelet = true;
  }

  // remove the prodact
  removePro(document.querySelector(".trush"));

  // icon show you the number of the prodact out of the cart
  let prodactSold = Number(prodact.dataset.prodact);

  if (countering === 0) {
    prodact.classList.add("pro");
    prodact.setAttribute("data-prodact", 1);
  } else {
    prodact.setAttribute("data-prodact", countering);
    prodact.classList.add("pro");
  }
});

// popup image
function sliderImage() {
  // create overlay
  overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  const div = document.createElement("div");

  div.setAttribute("class", "boxing");
  div.innerHTML = `
  <div class="boxing">

  <div class="holder">
  <div class="colse">
  <img src="images/icon-close-w.svg" alt="" />
</div>
    <div class="theimage">
      <img src="images/image-product-1.jpg" alt="" />
    </div>
    <div class="perv">
      <img src="images/icon-previous.svg" alt="" />
    </div>
    <div class="next">
      <img src="images/icon-next.svg" alt="" />
    </div>
  </div>
  <ul class="thethoum">
    <li class="active"><img src="images/image-product-1-thumbnail.jpg" alt="" /></li>
    <li><img src="images/image-product-2-thumbnail.jpg" alt="" /></li>
    <li><img src="images/image-product-3-thumbnail.jpg" alt="" /></li>
    <li><img src="images/image-product-4-thumbnail.jpg" alt="" /></li>
  </ul>
</div>
  `;
  document.body.appendChild(div);
}

// remove the popup
function removing() {
  document.querySelector(".boxing .colse").addEventListener("click", () => {
    document.querySelector(".boxing").remove();
    document.querySelector(".overlay").remove();
  });
}

// show the popup window when you click on the image
boxImage.addEventListener("click", () => {
  sliderImage();
  removing();
  swiper();

  // when you left the image stop there
  document.querySelectorAll(".thethoum li img").forEach((image) => {
    image.parentElement.classList.remove("active");
  });
  document.querySelector(".boxing .theimage img").src = images[current].src.replace("-thumbnail", "");
  document.querySelectorAll(".thethoum li img")[current].parentElement.classList.add("active");

  document.querySelector(".holder .next").addEventListener("click", () => {
    if (current != images.length - 1) {
      current += 1;
      document.querySelector(".boxing .theimage img").src = images[current].src.replace("-thumbnail", "");
      document.querySelectorAll(".thethoum li img").forEach((image) => {
        image.parentElement.classList.remove("active");
      });
      document.querySelectorAll(".thethoum li img")[current].parentElement.classList.add("active");
    }
  });
  document.querySelector(".perv").addEventListener("click", () => {
    if (current != 0) {
      current -= 1;
      document.querySelectorAll(".thethoum li img").forEach((image) => {
        image.parentElement.classList.remove("active");
      });
      document.querySelectorAll(".thethoum li img")[current].parentElement.classList.add("active");
      document.querySelector(".boxing .theimage img").src = images[current].src.replace("-thumbnail", "");
    }
  });
});

// swipe the images

function swiper() {
  // change preview images
  document.querySelectorAll(".thethoum li img").forEach((image) => {
    image.addEventListener("click", () => {
      // remove the classes
      document.querySelectorAll(".thethoum li img").forEach((image) => {
        image.parentElement.classList.remove("active");
      });
      image.parentElement.classList.add("active");
      document.querySelector(".boxing .theimage img").src = image.src.replace("-thumbnail", "");
    });
  });
}

// on the phone when you click on the next and previous buttons

document.querySelector(".perview .next").addEventListener("click", () => {
  if (current < images.length - 1) {
    current += 1;
    boxImage.src = images[current].src.replace("-thumbnail", "");
  }
});

document.querySelector(".perview .prev").addEventListener("click", () => {
  if (current != 0) {
    current -= 1;
    boxImage.src = images[current].src.replace("-thumbnail", "");
  }
});

document.querySelector(".shop-area .cart img").addEventListener("click", () => {
  document.querySelector(".cart-box").classList.toggle("show");
});

function removePro(trush) {
  trush.addEventListener("click", () => {
    trush.parentElement.parentElement.remove();
    itWorks = true;
    prodact.classList.remove("pro");
  });
}
