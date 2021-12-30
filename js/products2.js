// Récupération et création de l'objet ID produit
const usp = new URLSearchParams(window.location.search);
const articleID = usp.get("id");

// Requête API sur ID produit + Ajouts des infos sur la page HTML
fetch(`http://localhost:3000/api/products/${articleID}`)
  .then((res) => {
    return res.json();
  })
  .then((dataList) => {
    document.querySelector(
      ".item__img"
    ).innerHTML += `<img src="${dataList.imageUrl}" alt="${dataList.altTxt}">`;
    document.querySelector("#title").textContent += dataList.name;
    document.querySelector("#price").textContent += dataList.price;
    document.querySelector("#description").textContent += dataList.description;
    dataList.colors.forEach((color) => {
      let newOption = document.createElement("option");
      newOption.innerHTML = `${color}`;
      newOption.value = `${color}`;

      let parentNode = document.querySelector("#colors");
      parentNode.appendChild(newOption);
    });

    // Enregistrement du panier dans le local storage
    function saveToBasket(basketArray) {
      localStorage.setItem("BASKET", JSON.stringify(basketArray));
    }

    // récupération du local storage
    function getFromBasket() {
      return localStorage.getItem("BASKET");
    }

    // vérification s'il y a un doublon dans le local storage
    function checkSameArticle(article) {
      const basketArray = JSON.parse(getFromBasket());

      let findSameIndex = basketArray.findIndex(
        (object) => object.id == article.id && object.color == article.color
      );

      return findSameIndex;
    }

    // Ajout d'un article au panier du Local Storage
    function addToBasket(article) {
      const basket = getFromBasket();

      if (!basket) {
        let basketArray = [];
        basketArray.push(article);
        saveToBasket(basketArray);
      } else {
        basketArray = JSON.parse(basket);
        const sameArticleIndex = checkSameArticle(article);
        if (sameArticleIndex >= 0) {
          basketArray[sameArticleIndex].quantity = String(
            parseFloat(basketArray[sameArticleIndex].quantity) +
              parseFloat(article.quantity)
          );
          basketArray[sameArticleIndex].totalPrice = String(
            parseFloat(basketArray[sameArticleIndex].totalPrice) +
              parseFloat(article.price)
          );
        } else {
          basketArray.push(article);
        }
        saveToBasket(basketArray);
      }
    }

    // Création d'un article + envoi au locastorage
    function getArticle() {
      const quantity = document.querySelector("#quantity");
      const color = document.querySelector("#colors");

      if (color.value == "") {
        alert("Merci de selectionner une couleur");
      } else {
        let article = {
          id: `${articleID}`,
          name: `${dataList.name}`,
          color: `${color.value}`,
          quantity: `${quantity.value}`,
          totalPrice: String(`${quantity.value}` * `${dataList.price}`),
          price: `${dataList.price}`,
          image: `${dataList.imageUrl}`,
          altTxt: `${dataList.altTxt}`,
        };
        addToBasket(article);
      }
    }

    //Event Listener sur le bouton
    const btn = document.querySelector("#addToCart");
    btn.addEventListener("click", getArticle);
  })
  .catch((error) => {
    console.log(`ERREUR Page 2 : ${error}`);
  });
