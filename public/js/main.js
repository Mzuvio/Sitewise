const backTop = document.querySelector("#back-top-btn");
backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    backTop.style.display = "grid";
  } else {
    backTop.style.display = "none";
  }
});

const header = document.querySelector("header");
document.addEventListener("scroll", () => {
  let position = window.scrollY;
  position ? header.classList.add("sticky") : header.classList.remove("sticky");
});

const checkout = document.querySelector(".shopping-cart .btn-checkout");
const continueShopping = document.querySelector(
  ".wishlist-container .continue"
);
const showWishList = document.querySelector(".whishlist-icon");
const showCart = document.querySelector(".cart-icon");
const body = document.querySelector("body");
const closeCart = document.querySelector(".shopping-cart .btn-cancel");
const closeWishlist = document.querySelector(".wishlist-container .btn-cancel");
const menuCard = document.querySelector(".nav-menu .menu-icon");
const menuIcon = document.querySelector(".menu-icon ion-icon");
const menu = document.querySelector(".menu-link");
const closeLoginForm = document.querySelector(".form-close");
const showLoginForm = document.querySelector(".account");
const checkoutBtn = document.querySelector(".btn-checkout");

if (menuCard) {
  menuCard.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      menuIcon.name = "menu-outline";
    } else {
      menu.classList.add("active");
      menuIcon.name = "close-outline";
      body.classList.remove("show-wishlist");
      body.classList.remove("show-cart");
    }
  });
}

if (showCart) {
  showCart.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.add("show-cart");
    body.classList.remove("show-wishlist");
    menu.classList.remove("active");
    menuIcon.name = "menu-outline";
  });
}

if (showWishList) {
  showWishList.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.add("show-wishlist");
    body.classList.remove("show-cart");
    menu.classList.remove("active");
    menuIcon.name = "menu-outline";
  });
}

if (closeCart) {
  closeCart.addEventListener("click", () => {
    body.classList.remove("show-cart");
    menuIcon.name = "menu-outline";
  });
}

if (closeWishlist) {
  closeWishlist.addEventListener("click", () => {
    body.classList.remove("show-wishlist");
    menuIcon.name = "menu-outline";
  });
}

if (showLoginForm) {
  showLoginForm.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.toggle("show-loginform");
    body.classList.remove("show-wishlist");
    body.classList.remove("show-cart");
    menu.classList.remove("active");
    menuIcon.name = "menu-outline";
  });
}

if (closeLoginForm) {
  closeLoginForm.addEventListener("click", () => {
    body.classList.toggle("show-loginform");
    menuIcon.name = "menu-outline";
  });
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

const playBtn = document.querySelector("#playBtn");
const videoContainer = document.querySelector(".banner-video");
const closeBtn = document.querySelector("#closeBtn");
const video = document.querySelector("#video");

if (playBtn) {
  playBtn.addEventListener("click", () => {
    videoContainer.classList.add("viewed");
    video.play();
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    videoContainer.classList.remove("viewed");
    video.pause();
    video.currentTime = 0;
  });
}

const cartItemContainer = document.querySelector(".cart-items");
const productFilters = document.querySelectorAll(".filter-item ");
const itemCount = document.querySelector(".item-count");
const favorite = document.querySelectorAll(".product-favorite");
const newsletterBtn = document.querySelector(".newsletter-btn");

if (newsletterBtn) {
  newsletterBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

let listProducts = [];

if (productFilters.length > 0) {
  productFilters[0].classList.add("active");
}

productFilters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    productFilters.forEach((f) => f.classList.remove("active"));
    filter.classList.add("active");
    const category = e.currentTarget.dataset.id.toLowerCase();
    displayFiltered(category, listProducts);
  });
});

function displayFiltered(category, listProducts) {
  const filteredProducts = listProducts.filter((product) => {
    return product.categoryType.toLowerCase() === category;
  });
  if (category == "all") {
    renderChairsForHomePage(listProducts);
  } else {
    renderChairsForHomePage(filteredProducts);
  }
}

function closeCartPopup() {
  document.getElementById("cart-notification").classList.remove("show");
}

function showCartPopup() {
  console.log("Show");
  const popup = document.getElementById("cart-notification");
  popup.classList.add("show");

  setTimeout(() => {
    closeCartPopup();
  }, 2000);
}

const loadCheckout = () => {};

let cartItems = [];
let wishlistItems = [];

let total = 0;
function calculateTotal(cartItems) {
  if (cartItems.length === 0) {
    total = 0;
  } else {
    total = cartItems.reduce(
      (acc, item) => acc + item.basePrice * item.quantity,
      0
    );
  }
  total === 0 ? "0" : `R${total.toFixed(2)}`;
  document.querySelector(".cart-total").textContent = `Subtotal R${total}`;
  return total;
}

const updateItemCount = (cartItems) => {
  const itemCountElement = document.querySelector(".item-count");
  if (!itemCountElement) return;
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  itemCountElement.textContent = itemCount;
};

const updateWishlistCount = (wishlistItems) => {
  const countElement = document.querySelector(".whishlist-count");
  countElement.textContent = wishlistItems.length;
};

const getWishlistFromLocalStorage = () => {
  const wishlist = localStorage.getItem("wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
};

const saveWishlistToLocalStorage = (wishlistItems) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
};

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const getCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};

const saveWhishlisTotLocalStorage = (whishlist) => {
  localStorage.setItem("whishlist", JSON.stringify(whishlist));
};
const getWhishlistFromLocalStorage = () => {
  const whishlistItems = localStorage.getItem("whishlist");
  return whishlistItems ? JSON.parse(whishlistItems) : [];
};

// RELOAD CHECKOUT

const reloadCheckout = () => {
  let checkoutItems = getCartFromLocalStorage();
  let cartItemSubtotal = calculateTotal(checkoutItems);
  let vatPrice = parseFloat(cartItemSubtotal) * 0.15;
  let totalPrice = cartItemSubtotal + vatPrice;

  const subtotal = document.querySelector("#subtotal");
  const itemList = document.querySelector(".item-list");
  const vat = document.querySelector("#vat-price");
  const overallTotal = document.querySelector("#total-price");

  const itemsToRender = checkoutItems
    .map((item) => {
      return `<div class="item">
              <div class="cart-items">
                ${item.itemName} <span class="item-no">X ${item.quantity}</span>
              </div>
              <span>${item.price}</span>
            </div>`;
    })
    .join("");
  if (!itemsToRender.length > 0) {
    itemList.innerHTML = `<span> No items on the cart!</span>`;
  } else {
    itemList.innerHTML = itemsToRender;
  }

  vat.textContent = `R${vatPrice.toFixed(2)}`;
  subtotal.textContent = `R${cartItemSubtotal.toFixed(2)}`;
  overallTotal.textContent = `${totalPrice.toFixed(2)}`;
};

// RENDER TO CART

const renderCartProducts = (cartItems) => {
  let clickedStates = cartItems.map(() => false);

  const render = () => {
    if (cartItems.length === 0) {
      cartItemContainer.innerHTML = `
        <div class="cart-empty">
          <span class="icon"><ion-icon name="cart-outline"></ion-icon></span>
          <p>Your cart is empty.</p>
        </div>
      `;
    } else {
      const productList = cartItems
        .map((product, index) => {
          return ` 
          <div class="cart-item" data-index="${index}">
            <div class="cart-item-img-wrapper">
              <img
                src="${product.imgURL}"
                alt="${product.itemName}"
                class="cart-item-img"
              />
            </div>
    
            <p class="cart-item-name">${product.itemName}</p>
            <span class="cart-item-price" data-index="${index}">${
            product.price
          }</span>
            <div class="cart-item-quantity">
              ${
                clickedStates[index] || product.quantity > 1
                  ? `<button class="quantity-decrease" data-index="${index}">
                       <ion-icon name="remove-outline"></ion-icon>
                     </button>`
                  : `<button class="remove-to-cart" data-index="${index}">
                       <ion-icon name="trash-outline"></ion-icon>
                     </button>`
              }
              <span class="item-quantity" data-index="${index}">${
            cartItems[index].quantity
          }</span>
              <button class="quantity-increase quant-btn" data-index="${index}">
                <ion-icon name="add-outline"></ion-icon>
              </button>
            </div>
          </div>`;
        })
        .join("");

      cartItemContainer.innerHTML = productList;

      const cartProducts = document.querySelectorAll(".cart-item");

      cartProducts.forEach((product) => {
        const index = parseInt(product.dataset.index, 10);

        const increaseBtn = product.querySelector(".quantity-increase");
        const decreaseBtn = product.querySelector(".quantity-decrease");
        const deleteBtn = product.querySelector(".remove-to-cart");

        if (increaseBtn) {
          increaseBtn.addEventListener("click", (e) => {
            cartItems[index].quantity++;
            let newPrice =
              cartItems[index].basePrice * cartItems[index].quantity;
            cartItems[index].price = `R${newPrice.toFixed(2)}`;
            e.stopPropagation();
            clickedStates[index] = true;
            saveCartToLocalStorage(cartItems);
            updateItemCount(cartItems);
            render();
            reloadCheckout();
          });
        }

        if (decreaseBtn) {
          decreaseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (cartItems[index].quantity > 1) {
              cartItems[index].quantity--;
              let newPrice =
                cartItems[index].basePrice * cartItems[index].quantity;
              cartItems[index].price = `R${newPrice.toFixed(2)}`;
              saveCartToLocalStorage(cartItems);
              render();
            }
            if (cartItems[index].quantity === 1) {
              clickedStates[index] = false;
              saveCartToLocalStorage(cartItems);
              updateItemCount(cartItems);
              render();
              reloadCheckout();
            }
          });
        }

        if (deleteBtn) {
          deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            cartItems.splice(index, 1);
            itemCount.textContent = cartItems.length;
            clickedStates = clickedStates.filter((_, i) => i !== index);
            saveCartToLocalStorage(cartItems);
            updateItemCount(cartItems);
            render();
            reloadCheckout();
          });
        }
      });
    }
    calculateTotal(cartItems);
  };

  render();
};

// RENDER DISPLAY CHECKOUT

const renderDisplayWishilist = (target, displayCard) => {
  let wishlist = getWishlistFromLocalStorage();
  target.addEventListener("click", (e) => {
    e.stopPropagation();
    const productElement = displayCard;
    const id = productElement.dataset.id;
    const productName = productElement.querySelector(".chair-name").textContent;
    const productPrice =
      productElement.querySelector(".chair-price").textContent;
    const productImage = productElement.querySelector(".image-card img").src;

    const productInWishlist = wishlist.some((item) => item.id === id);

    if (productInWishlist) {
      wishlist = wishlist.filter((item) => item.id !== id);
      target.name = "heart-outline";
      target.style.color = "#2d2a32";
    } else {
      wishlist.push({
        id: id,
        name: productName,
        price: productPrice,
        image: productImage,
      });
      target.name = "heart";
      target.style.color = "#2d2a32";
    }

    saveWishlistToLocalStorage(wishlist);
    updateWishlistCount(wishlist);
    renderWishlistProducts(wishlist);
  });
};

// RENDER WISHLIST

const renderWishlistProducts = (wishlistItems) => {
  const wishlistContainer = document.querySelector(".wishlist-items");
  const wishlistCount = document.querySelector(".count-wishlist");

  if (wishlistItems.length === 0) {
    wishlistContainer.innerHTML = `
      <div class="wishlist-empty">
        <p>Your wishlist is empty.</p>
      </div>
    `;
  } else {
    const productList = wishlistItems
      .map((product, index) => {
        return `
        <div class="cart-item" data-index="${index} data-id=${product.id}">
          <div class="cart-item-img-wrapper">
            <img
              src="${product.image}"
              alt="${product.name}"
              class="wishlist-img"
            />
          </div>

          <p class="item-name">${product.name}</p>
          <span class="item-price">${product.price}</span>
          <button class="remove-to-wishlist" data-index="${index}">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>`;
      })
      .join("");

    wishlistContainer.innerHTML = productList;

    const removeButtons = wishlistContainer.querySelectorAll(
      ".remove-to-wishlist"
    );
    removeButtons.forEach((btn) => {
      const index = parseInt(btn.dataset.index, 10);
      btn.addEventListener("click", () => {
        wishlistItems.splice(index, 1);
        saveWishlistToLocalStorage(wishlistItems);
        updateWishlistCount(wishlistItems);
        renderWishlistProducts(wishlistItems);
      });
    });
  }

  wishlistCount.textContent = wishlistItems.length;
};

// RENDER CHAIRS ON HOME PAGE

const renderChairsForHomePage = (products) => {
  try {
    const productContainer = document.querySelector(".product-container");
    productContainer.innerHTML = "";
    if (!productContainer) {
      console.log(
        "The 'product-container' element is not available on this page."
      );
      return;
    }

    console.log(products);

    let displayItems = products
      .map((product, index) => {
        if (index < 8) {
          return `<div class="product-item" data-id="${
            product.id
          }" data-category="${product.category}" data-item-name="${
            product.name
          }">
            <div class="product-image">
              <div>${
                product.sale ? '<span class="for-sale">Sale</span>' : ""
              } </div>
              <div class="image-card">  <img src="${product.image}" alt="${
            product.name
          }"></div>
              <div class="cart-btn">
                <span class="icon"><ion-icon name="bag-outline"></ion-icon></span>
                Add To Cart
              </div>
            </div>
            <div class="product-details">
              <span class="product-category">${product.category}</span>
              <div class="product-favorite">
                <ion-icon name="${
                  product.favoriteIcon
                }" class="favorite-icon"></ion-icon>
              </div>
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price}</div>
          </div>`;
        }
      })
      .join("");
    productContainer.innerHTML = displayItems;

    const cartBtn = document.querySelectorAll(".cart-btn");
    const popupWrapper = document.querySelector(".popup-wrapper");
    const closePopupButton = document.querySelector(".popup-close ion-icon");
    const imageCards = document.querySelectorAll(".image-card");
    const productDisplay = document.querySelector(".product-display");
    const closeProductDisplay = document.querySelector(
      ".product-display .icon-close"
    );
    const whishlistHeart = document.querySelector(".wishlist-area ion-icon");
    const quantityBtns = document.querySelectorAll(".quantity-area .icon");
    const productQuantity = document.querySelector(".quantity-area .quantity");
    const addToCart = document.querySelector(".product-display .cart-add");

    let quantityNo = parseInt(productQuantity.textContent);

    if (quantityBtns.length > 0) {
      quantityBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let currentTarget = e.target;
          if (currentTarget.closest(".decrease")) {
            if (quantityNo > 1) {
              quantityNo--;
              productQuantity.textContent = quantityNo;
            }
          } else if (currentTarget.closest(".increase")) {
            quantityNo++;
            productQuantity.textContent = quantityNo;
          }
        });
      });
    }

    let wishlist = getWishlistFromLocalStorage();

    const favoriteIcons = document.querySelectorAll(".favorite-icon");

    favoriteIcons.forEach((icon) => {
      const productItem = icon.closest(".product-item");
      const productId = productItem.dataset.id;

      if (wishlist.some((item) => item.id === productId)) {
        icon.name = "heart";
        icon.style.color = "#2d2a32";
      } else {
        icon.name = "heart-outline";
        icon.style.color = "#2d2a32";
      }

      icon.addEventListener("click", (e) => {
        e.stopPropagation();

        const productElement = icon.closest(".product-item");
        const productId = productElement.dataset.id;
        const productName =
          productElement.querySelector(".product-name").textContent;
        const productPrice =
          productElement.querySelector(".product-price").textContent;
        const productImage =
          productElement.querySelector(".image-card img").src;

        const productInWishlist = wishlist.some(
          (item) => item.id === productId
        );

        if (productInWishlist) {
          wishlist = wishlist.filter((item) => item.id !== productId);
          icon.name = "heart-outline";
          icon.style.color = "#2d2a32";
        } else {
          wishlist.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
          });
          icon.name = "heart";
          icon.style.color = "#2d2a32";
        }

        saveWishlistToLocalStorage(wishlist);
        updateWishlistCount(wishlist);
        renderWishlistProducts(wishlist);
      });
    });

    imageCards.forEach((image) => {
      image.addEventListener("click", (e) => {
        let productElement = e.target.parentElement.parentElement.parentElement;
        const whishlistIcon = document.querySelector(".display-wishlist-icon");
        let imgURL = productElement.querySelector(".image-card img").src;
        let id = productElement.dataset.id;
        productDisplay.dataset.id = id;
        let itemName = productElement.dataset.itemName;
        let basePrice =
          productElement.querySelector(".product-price").textContent;

        let chairImage = document.querySelector(".left-side img");
        let chairName = document.querySelector(".chair-name");
        let chairPrice = document.querySelector(".chair-price");
        basePrice = parseFloat(basePrice.replace("R", "").replace(",", ""));

        chairImage.src = imgURL;
        chairName.textContent = itemName;
        chairPrice.textContent = `R${basePrice}`;

        productDisplay.classList.add("show");

        if (whishlistIcon) {
          renderDisplayWishilist(whishlistIcon, productDisplay);
        }

        if (addToCart) {
          addToCart.onclick = () => {
            let quantity = parseInt(Number(productQuantity.textContent));
            const storedCart = getCartFromLocalStorage();
            cartItems = storedCart;
            if (id) {
              let exists = cartItems.find((item) => item.id === id);

              if (!exists) {
                cartItems.push({
                  id,
                  imgURL,
                  itemName,
                  price: `R${basePrice.toFixed(2)}`,
                  basePrice,
                  quantity: quantity,
                });
                saveCartToLocalStorage(cartItems);
                updateItemCount(cartItems);
                showCartPopup();
              } else {
                showPopup();
              }
            }
            renderCartProducts(cartItems);
          };
        }
      });
    });

    closeProductDisplay.addEventListener("click", () => {
      if (productDisplay.classList.contains("show")) {
        productDisplay.classList.remove("show");
        if (whishlistHeart.name === "heart") {
          whishlistHeart.name = "heart-outline";
          whishlistHeart.style.color = "#2d2a32";
        }
        productQuantity.textContent = "1";
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target === productDisplay) {
        if (productDisplay.classList.contains("show")) {
          productDisplay.classList.remove("show");
          if (whishlistHeart.name === "heart") {
            whishlistHeart.name = "heart-outline";
            whishlistHeart.style.color = "#2d2a32";
          }
          productQuantity.textContent = "1";
        }
      }
    });

    function showPopup() {
      popupWrapper.classList.add("show");
    }
    function hidePopup() {
      popupWrapper.classList.remove("show");
    }

    window.addEventListener("click", (e) => {
      if (e.target === popupWrapper) {
        if (popupWrapper.classList.contains("show")) {
          popupWrapper.classList.remove("show");
        }
      }
    });

    closePopupButton.addEventListener("click", hidePopup);
    cartBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const storedCart = getCartFromLocalStorage();
        cartItems = storedCart;

        let productElement = e.target.parentElement.parentElement;
        let imgURL = productElement.querySelector(".image-card img").src;
        let id = productElement.dataset.id;
        let itemName = productElement.dataset.itemName;
        let basePrice =
          productElement.querySelector(".product-price").textContent;
        basePrice = parseFloat(basePrice.replace("R", "").replace(",", ""));

        if (id) {
          let exists = cartItems.find((item) => item.id === id);

          if (!exists) {
            cartItems.push({
              id,
              imgURL,
              itemName,
              price: `R${basePrice.toFixed(2)}`,
              basePrice,
              quantity: 1,
            });
            saveCartToLocalStorage(cartItems);
            updateItemCount(cartItems);
            showCartPopup();
          } else {
            showPopup();
          }
        }

        renderCartProducts(cartItems);
      });
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

// RENDER CHAIRS ON SHOP PAGE

const renderChairsForShopPage = (products, loadmore = 8) => {
  try {
    const chairDisplayWrapper = document.querySelector(".chairs-display");
    chairDisplayWrapper.innerHTML = "";
    const viewedCount = document.querySelector(".viewed-count");
    if (products.length > 0) {
      viewedCount.textContent = Math.min(loadmore, products.length);
    }

    if (!chairDisplayWrapper) {
      console.log(
        "The 'chairs-display' element is not available on this page."
      );
      return;
    }



    let displayItems = products
      .map((product, index) => {
        if (index < loadmore) {
          return `<div class="product-item" data-id="${
            product.id
          }" data-category="${product.category}" data-item-name="${
            product.name
          }">
            <div class="product-image">
              <div>${
                product.sale ? '<span class="for-sale">Sale</span>' : ""
              } </div>
              <div class="image-card">  <img src="${product.image}" alt="${
            product.name
          }"></div>
              <div class="cart-btn">
                <span class="icon"><ion-icon name="bag-outline"></ion-icon></span>
                Add To Cart
              </div>
            </div>
            <div class="product-details">
              <span class="product-category">${product.category}</span>
              <div class="product-favorite">
                <ion-icon name="${
                  product.favoriteIcon
                }" class="favorite-icon"></ion-icon>
              </div>
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price}</div>
          </div>`;
        }
      })
      .join("");
    chairDisplayWrapper.innerHTML = displayItems;

    

    const favoriteIcons = document.querySelectorAll(".favorite-icon");
    const cartBtn = document.querySelectorAll(".cart-btn");
    const popupWrapper = document.querySelector(".popup-wrapper");
    const closePopupButton = document.querySelector(".popup-close ion-icon");
    const imageCards = document.querySelectorAll(".image-card");
    const productDisplay = document.querySelector(".product-display");
    const closeProductDisplay = document.querySelector(
      ".product-display .icon-close"
    );
    const whishlistHeart = document.querySelector(".wishlist-area ion-icon");
    const quantityBtns = document.querySelectorAll(".quantity-area .icon");
    const productQuantity = document.querySelector(".quantity-area .quantity");
    const addToCart = document.querySelector(".product-display .cart-add");
    const loadMoreBtn = document.querySelector(".progress-summary-btn");

    let quantityNo = parseInt(productQuantity.textContent);

    if (quantityBtns.length > 0) {
      quantityBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let currentTarget = e.target;
          if (currentTarget.closest(".decrease")) {
            if (quantityNo > 1) {
              quantityNo--;
              productQuantity.textContent = quantityNo;
            }
          } else if (currentTarget.closest(".increase")) {
            quantityNo++;
            productQuantity.textContent = quantityNo;
          }
        });
      });
    }

    if (whishlistHeart) {
      whishlistHeart.addEventListener("click", (e) => {
        e.stopPropagation();

        if (whishlistHeart.name === "heart-outline") {
          whishlistHeart.name = "heart";
          whishlistHeart.style.color = "#2d2a32";
        } else {
          whishlistHeart.name = "heart-outline";
          whishlistHeart.style.color = "#2d2a32";
        }
      });
    }

    imageCards.forEach((image) => {
      image.addEventListener("click", (e) => {
        let productElement = e.target.parentElement.parentElement.parentElement;
        let imgURL = productElement.querySelector(".image-card img").src;
        let id = productElement.dataset.id;
        let itemName = productElement.dataset.itemName;
        let basePrice =
          productElement.querySelector(".product-price").textContent;

        let chairImage = document.querySelector(".left-side img");
        let chairName = document.querySelector(".chair-name");
        let chairPrice = document.querySelector(".chair-price");

        basePrice = parseFloat(basePrice.replace("R", "").replace(",", ""));

        chairImage.src = imgURL;
        chairName.textContent = itemName;
        chairPrice.textContent = `R${basePrice}`;

        productDisplay.classList.add("show");

        if (addToCart) {
          addToCart.onclick = () => {
            const storedCart = getCartFromLocalStorage();
            cartItems = storedCart;
            if (id) {
              let exists = cartItems.find((item) => item.id === id);

              if (!exists) {
                cartItems.push({
                  id,
                  imgURL,
                  itemName,
                  price: `R${basePrice.toFixed(2)}`,
                  basePrice,
                  quantity: 1,
                });
                saveCartToLocalStorage(cartItems);
                updateItemCount(cartItems);
                showCartPopup();
              } else {
                showPopup();
              }
            }
            renderCartProducts(cartItems);
          };
        }
      });
    });

    closeProductDisplay.addEventListener("click", () => {
      if (productDisplay.classList.contains("show")) {
        productDisplay.classList.remove("show");
        if (whishlistHeart.name === "heart") {
          whishlistHeart.name = "heart-outline";
          whishlistHeart.style.color = "#2d2a32";
        }
        productQuantity.textContent = "1";
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target === productDisplay) {
        if (productDisplay.classList.contains("show")) {
          productDisplay.classList.remove("show");
          if (whishlistHeart.name === "heart") {
            whishlistHeart.name = "heart-outline";
            whishlistHeart.style.color = "#2d2a32";
          }
          productQuantity.textContent = "1";
        }
      }
    });

    function showPopup() {
      popupWrapper.classList.add("show");
    }
    function hidePopup() {
      popupWrapper.classList.remove("show");
    }

    window.addEventListener("click", (e) => {
      if (e.target === popupWrapper) {
        if (popupWrapper.classList.contains("show")) {
          popupWrapper.classList.remove("show");
        }
      }
    });

    closePopupButton.addEventListener("click", hidePopup);
    cartBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const storedCart = getCartFromLocalStorage();
        cartItems = storedCart;

        let productElement = e.target.parentElement.parentElement;
        let imgURL = productElement.querySelector(".image-card img").src;
        let id = productElement.dataset.id;
        let itemName = productElement.dataset.itemName;
        let basePrice =
          productElement.querySelector(".product-price").textContent;
        basePrice = parseFloat(basePrice.replace("R", "").replace(",", ""));

        if (id) {
          let exists = cartItems.find((item) => item.id === id);

          if (!exists) {
            cartItems.push({
              id,
              imgURL,
              itemName,
              price: `R${basePrice.toFixed(2)}`,
              basePrice,
              quantity: 1,
            });
            saveCartToLocalStorage(cartItems);
            updateItemCount(cartItems);
            showCartPopup();
          } else {
            showPopup();
          }
        }

        renderCartProducts(cartItems);
      });
    });

    favoriteIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        e.stopPropagation();

        if (icon.name === "heart-outline") {
          icon.name = "heart";
          icon.style.color = "#2d2a32";
        } else {
          icon.name = "heart-outline";
          icon.style.color = "#2d2a32";
        }
      });
    });

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", (e) => {
        e.preventDefault();

        let notLoaded = products.length - loadmore;

        if (notLoaded > 0) {
          loadmore += Math.min(8, notLoaded);

          viewedCount.textContent = Math.min(loadmore, products.length);

          renderChairsForShopPage(products, loadmore);
        }

        if (loadmore >= products.length) {
          loadMoreBtn.style.display = "none";
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// MAIN FUNCTION

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const popupWrapper = document.querySelector(".popup-wrapper");
    const currentPage = window.location.pathname;
    let cartItems = getCartFromLocalStorage();
    let wishlistItems = getWishlistFromLocalStorage();
    updateItemCount(cartItems);
    updateWishlistCount(wishlistItems);

    const response = await fetch("/data/products.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    listProducts = await response.json();

    function showPopup() {
      popupWrapper.classList.add("show");
    }

    window.addEventListener("click", (e) => {
      if (e.target === popupWrapper) {
        if (popupWrapper.classList.contains("show")) {
          popupWrapper.classList.remove("show");
        }
      }
    });

    if (currentPage.includes("index")) {
      renderChairsForHomePage(listProducts);

      const defaultFilter = document.querySelector(
        '.filter-item[data-id="all"]'
      );
      if (defaultFilter) {
        defaultFilter.click();
      }

      const promotionImgUrl = document.querySelector(
        ".promotion-wrapper #promotion-image"
      );
      const promotionChairName = document.querySelector(
        ".promotion-wrapper .promotion-title"
      );
      const promotionPrice = document.querySelector(".promotion-price");
      const promotionBtn = document.querySelector(
        ".promotion-wrapper .shop-now"
      );

      if (promotionBtn) {
        promotionBtn.addEventListener("click", (e) => {
          e.preventDefault();
          let productElement =
            e.target.parentElement.parentElement.parentElement;
          let id = listProducts[listProducts.length - 1].id + 1;
          productElement.dataset.promoId = id;
          let productImage = promotionImgUrl.src;
          let productName = promotionChairName.textContent;
          let newId = productElement.dataset.promoId;
          let price = parseFloat(
            promotionPrice.textContent.replace("R", "").replace(",", ".")
          );
          if (newId) {
            cartItems = getCartFromLocalStorage();
            let exists = cartItems.find((item) => item.id == newId);
            if (!exists) {
              cartItems.push({
                id: newId,
                imgURL: productImage,
                itemName: productName,
                price: `R${price.toFixed(2)}`,
                basePrice: price,
                quantity: 1,
              });
            } else {
              showPopup();
            }
            saveCartToLocalStorage(cartItems);
            updateItemCount(cartItems);
          }
          renderCartProducts(cartItems);
        });
      }
    } else if (currentPage.includes("shop")) {
      const originalProducts = [...listProducts];

      listProducts.forEach((product) => {
        product.image = "../".concat(product.image);
      });
      renderChairsForShopPage(listProducts);
      const categoryFilters = document.querySelectorAll(
        ".filter-category .custom-label"
      );

      categoryFilters.forEach((label) => {
        label.addEventListener("click", (e) => {
          categoryFilters.forEach((filter) =>
            filter.classList.remove("active")
          );
          label.classList.add("active");
        });
      });

      const filterIcon = document.querySelector(".sort-dropdown .icon");
      const dropdownFilter = document.querySelector(".select-items");
      const selectedFilter = document.querySelector(".select-selected");
      const sortItems = document.querySelectorAll(".select-items .item");
      const progressTotal = document.querySelector(".total-count");
      const sidebarFilters = document.querySelectorAll(".price-list li");
      const colorItems = document.querySelectorAll(".color-item input");

      filterIcon.addEventListener("click", () => {
        if (dropdownFilter.classList.contains("select-hide")) {
          dropdownFilter.classList.remove("select-hide");
        } else {
          dropdownFilter.classList.add("select-hide");
        }
      });

      const sortLowToHigh = (item1, item2) => {
        if (item1.basePrice > item2.basePrice) {
          return 1;
        } else if (item1.basePrice < item2.basePrice) {
          return -1;
        } else {
          return 0;
        }
      };

      const sortHighToLow = (item1, item2) => {
        if (item1.basePrice < item2.basePrice) {
          return 1;
        } else if (item1.basePrice > item2.basePrice) {
          return -1;
        } else {
          return 0;
        }
      };

      const sortByCategory = (item1, item2) => {
        if (item1.category > item2.category) {
          return 1;
        } else if (item1.category < item2.category) {
          return -1;
        } else {
          return 0;
        }
      };

      sortItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          let currentSort = e.target.textContent;
          if (listProducts.length > 0) {
            switch (e.target.dataset.value) {
              case "0":
                listProducts = [...originalProducts];
                break;
              case "1":
                listProducts.sort(sortByCategory);
                break;
              case "2":
                listProducts.sort(sortLowToHigh);
                break;
              case "3":
                listProducts.sort(sortHighToLow);
                break;
            }
            renderChairsForShopPage(listProducts);
          }

          selectedFilter.innerHTML = currentSort;
          dropdownFilter.classList.add("select-hide");
        });
      });

      function filterByPrice(items, range) {
        return items.filter((product) => {
          const price = Number(product.basePrice);

          switch (range) {
            case "0-2500":
              return price > 0 && price <= 2500;
            case "2500-5000":
              return price > 2500 && price <= 5000;
            case "5000-7500":
              return price > 5000 && price <= 7500;
            case "7500-10000":
              return price > 7500 && price <= 10000;
            case "10000+":
              return price > 10000;
            default:
              console.warn(`Unknown price range: ${range}`);
              return false;
          }
        });
      }

      sidebarFilters.forEach((filter) => {
        filter.addEventListener("click", (e) => {
          e.preventDefault();
          sidebarFilters.forEach(priceFilter=> {
            priceFilter.classList.remove('active')
          })
          let range = e.target.dataset.range;
          if (!range) {
            console.error("Price range not found on clicked element.");
            return;
          }
          let filteredProducts = filterByPrice(listProducts, range);
          renderChairsForShopPage(filteredProducts);
          e.target.parentElement.classList.add('active')
        });
      });

      function filterByColor(items, color) {
        return items.filter(
          (product) => product.color.toLowerCase() === color.toLowerCase()
        );
      }

      colorItems.forEach((colorItem) => {
        colorItem.addEventListener("change", (e) => {
          let selectedColor = e.target.value;
          let filteredProducts = filterByColor(listProducts, selectedColor);
          if (filteredProducts.length === 0) {
            console.log(`No chairs found with color: ${selectedColor}`);
          } else {
            renderChairsForShopPage(filteredProducts);
          }
        });
      });

      progressTotal.textContent = listProducts.length;
    } else if (currentPage.includes("about")) {
      const slides = [
        {
          heading: "Explore Our Collection",
          description:
            "Discover a wide variety of luxury chairs, from classic designs to contemporary styles. Each piece is crafted with the highest quality materials to provide both comfort and elegance for your home or office.",
        },
        {
          heading: "Elevate Your Space",
          description:
            "Transform your living or working area with our exquisite range of designer chairs, blending functionality and aesthetic appeal seamlessly.",
        },
        {
          heading: "Comfort and Style Combined",
          description:
            "Experience unparalleled comfort and modern style with our handpicked selection of premium chairs, perfect for any setting.",
        },
      ];

      const headingElement = document.querySelector(".slider-heading");
      const descriptionElement = document.querySelector(".slider-description");
      const sliderControls = document.querySelectorAll(".slider-control");

      let currentText = 0;
      let autoChangeInterval;

      function updateSlide(index) {
        currentText = index;

        headingElement.classList.remove("active");
        descriptionElement.classList.remove("active");

        setTimeout(() => {
          headingElement.innerHTML = slides[index].heading;
          descriptionElement.innerHTML = slides[index].description;

          headingElement.classList.add("active");
          descriptionElement.classList.add("active");
        }, 500);

        sliderControls.forEach((control, i) => {
          control.classList.toggle("active", i === index);
        });
      }

      sliderControls.forEach((control) => {
        control.addEventListener("click", (e) => {
          clearInterval(autoChangeInterval);
          const index = parseInt(e.currentTarget.dataset.index);
          updateSlide(index);
          startAutoChange();
        });
      });

      function startAutoChange() {
        autoChangeInterval = setInterval(() => {
          const nextText = (currentText + 1) % slides.length;
          updateSlide(nextText);
        }, 3000);
      }

      updateSlide(currentText);
      startAutoChange();
    } else if (currentPage.includes("checkout")) {
      reloadCheckout();

      const radioButtons = document.querySelectorAll('input[type="radio"]');
      const paymentDescriptions = document.querySelectorAll(
        ".method-description"
      );

      radioButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          let currentElement = e.target.parentElement.parentElement;
          let currentDecription = currentElement.querySelector(
            ".method-description"
          );
          paymentDescriptions.forEach((description) => {
            description.classList.remove("show");
          });
          currentDecription.classList.add("show");
        });
      });
    }
  } catch (error) {
    console.error("Error during page initialization:", error);
  }
  renderCartProducts(cartItems);
});

const initializeCart = () => {
  cartItems = getCartFromLocalStorage();
  updateItemCount(cartItems);
  renderCartProducts(cartItems);
};

document.addEventListener("DOMContentLoaded", initializeCart);

const initializeWishlist = () => {
  wishlistItems = getWishlistFromLocalStorage();
  updateWishlistCount(wishlistItems);
  renderWishlistProducts(wishlistItems);
};

document.addEventListener("DOMContentLoaded", initializeWishlist);
