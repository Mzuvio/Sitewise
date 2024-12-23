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
                clickedStates[index]
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
          });
        }
      });
    }
    calculateTotal(cartItems);
  };

  render();
};

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
        <div class="cart-item" data-index="${index}">
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

const renderChairsForHomePage = (listProducts) => {
  try {
    const productContainer = document.querySelector(".product-container");

    if (!productContainer) {
      console.log(
        "The 'product-container' element is not available on this page."
      );
      return;
    }

    let displayItems = listProducts
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
  } catch (error) {
    console.error("Error:", error);
  }
};

const renderChairsForShopPage = (products, loadmore = 8) => {
  try {
    const chairDisplayWrapper = document.querySelector(".chairs-display");
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

    let displayItems = listProducts
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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const currentPage = window.location.pathname;
    let cartItems = getCartFromLocalStorage();
    let wishlistItems = getWishlistFromLocalStorage();
    updateItemCount(cartItems);
    updateWishlistCount(wishlistItems);

    const response = await fetch("https://raw.githubusercontent.com/Mzuvio/Sitewise/master/data/products.json");

    listProducts = await response.json();

    if (currentPage.includes("index")) {
      renderChairsForHomePage(listProducts);
    } else if (currentPage.includes("shop")) {
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

      filterIcon.addEventListener("click", () => {
        if (dropdownFilter.classList.contains("select-hide")) {
          dropdownFilter.classList.remove("select-hide");
        } else {
          dropdownFilter.classList.add("select-hide");
        }
      });

      sortItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          let currentSort = e.target.textContent;
          selectedFilter.innerHTML = currentSort;
          dropdownFilter.classList.add("select-hide");
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
    }
  } catch (error) {
    console.log(listProducts);
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
