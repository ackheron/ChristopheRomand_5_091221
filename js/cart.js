let tab = [];
let supprimerSelection;

let basket = JSON.parse(localStorage.getItem("basket"));

for (product of basket) {
  document.querySelector(
    "#cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
        <div class="cart__item__img">
            <img src="${product.img}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p><${product.color}/p>
                <p id="article__price"> ${product.price}€</p>
            </div>
        <div class="cart__item__content__settings">
            <div id="jojo" class="cart__item__content__settings__quantity">
                <p>Qté : ${product.quantity} </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
     </article>`;
}

// Fonction récupération des prix des articles et somme totale

let addPriceFunction = () => {
  console.log(basket);
  let found = basket.map((element) => element.price);
  console.log(found);

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let somme = found.reduce(reducer);
  console.log(somme);
  return somme;
};
// Appel de la fonction addPriceFunction
let sommeTotale = addPriceFunction();
console.log(sommeTotale);
//Injection de la somme totale dans le DOM
document.querySelector("#totalPrice").textContent = sommeTotale;

console.log(product.quantity);

let itemQuantity = document.querySelectorAll(".itemQuantity");
console.log(itemQuantity[1]);

const selectQuantity = document.querySelectorAll(".itemQuantity");

let test = document.querySelectorAll("#article__price");

selectQuantity.forEach(function (quantity, i, k) {
  quantity.addEventListener("change", (event) => {
    event.preventDefault();
    let newArticlePrice = quantity.value * basket[i].price;
    console.log(quantity.value);
    // let test = document.querySelectorAll("#article__price");
    console.log(test[0]);
    console.log(test[1]);
    console.log(test.length);

    // document.querySelector("#article__price").textContent =
    //   newArticlePrice + " €";

    // test[quantity].textContent = newArticlePrice;

    for (k = 0; k < test.length; k++) {
      test[k].textContent = newArticlePrice;
    }
    console.log(`le prix de ${basket[i].name} et passé à ${newArticlePrice}`);
  });
});

// SUPPRESSION PRODUIT - VISUEL Et localStorage
let deleteProduit = () => {
  supprimerSelection = Array.from(
    document.querySelectorAll(".supprimerProduit");
    console.log(supprimerSelection);   
  );
  i; // variable SUPPRIMER SELECTION

  for (let i = 0; i < supprimerSelection.length; i++) {
    supprimerSelection[i].addEventListener("click", () => {
      supprimerSelection[i].parentElement.style.display = "none";

      tab = basket;
      tab.splice([i], 1);

      basket = localStorage.setItem("mon panier", JSON.stringify(tab));

      window.location.href = "panier.html";
    });
  }
};
