// Variable qui récupère les articles du panier dans le local storage
let basket = JSON.parse(localStorage.getItem("basket"));

// Variable pour stocker les id de chaque articles présent dans le panier
let products = [];

// Variable qui récupère l'orderId envoyé par comme réponse par le serveur
let orderId = "";

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
                <p>Couleur du produit: ${product.color}</p>
                <p>Prix unitaire: ${product.price}€</p>
            </div>
        <div class="cart__item__content__settings">
            <div id="jojo" class="cart__item__content__settings__quantity">
                <p id="quantité">Qté : ${product.quantity} </p>
                <p id="sousTotal">Prix total pour cet article: ${product.totalPrice}€</p> 
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
     </article>`;

  // Récupération des Id de chaque articles et envoi dans le tableau de la variable products[]
  products.push(product.id);
  console.log(products);
}

// Fonction récupération des prix des articles et somme totale

let addPriceFunction = () => {
  console.log(basket);
  let found = basket.map((element) => element.totalPrice);
  console.log(found);

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let somme = found.reduce(reducer);
  console.log(somme);
  return somme;
};

// Fonction récupération des quantités des articles et quantité totale

let addQuantFunction = () => {
  console.log(basket);
  let found2 = basket.map((element) => element.quantity);
  console.log(found2);

  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let quant = found2.reduce(reducer);
  console.log(quant);
  return quant;
};

// Fonction mise à jour du local storage products

let majLocalStorageProducts = () => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

// Fonction d'injection dans le DOM des donnés addPrice et addQuant

function injectSommeQuant() {
  // Appel de la fonction addPriceFunction
  let sommeTotale = addPriceFunction();
  //Injection de la somme totale dans le DOM
  document.querySelector("#totalPrice").textContent = sommeTotale;
  // Appel de la fonction addQuantFunction
  let quantTotale = addQuantFunction();

  //injection de la quantité des articles dans le DOM
  document.querySelector("#totalQuantity").textContent = quantTotale;

  majLocalStorageProducts();
}
injectSommeQuant();

console.log(basket);
let itemQuantity = Array.from(document.querySelectorAll(".itemQuantity"));
let sousTotal = Array.from(document.querySelectorAll("#sousTotal"));
let screenQuantity = Array.from(document.querySelectorAll("#quantité"));

itemQuantity.forEach(function (quantity, i, k) {
  quantity.addEventListener("change", (event) => {
    event.preventDefault();
    let newArticlePrice = quantity.value * basket[i].price;
    console.log(quantity.value);

    screenQuantity[i].textContent = "Qté: " + quantity.value;
    basket[i].quantity = parseInt(quantity.value, 10);

    sousTotal[i].textContent =
      "Prix total pour cet article: " + newArticlePrice + " €";
    basket[i].totalPrice = newArticlePrice;

    console.log(`le prix de ${basket[i].name} et passé à ${newArticlePrice}`);

    injectSommeQuant();
  });
});

/******************************** SUPPRESSION DES ARTICLES****************************/

let supprimerSelection = Array.from(document.querySelectorAll(".deleteItem"));
console.log(supprimerSelection);
let tab = [];

// supprimer element

for (let i = 0; i < supprimerSelection.length; i++) {
  console.log(supprimerSelection.length);
  supprimerSelection[i].addEventListener("click", () => {
    supprimerSelection[i].parentElement.style.display = "none";

    tab = basket;

    tab.splice([i], 1);

    basket = localStorage.setItem("basket", JSON.stringify(tab));

    window.location.href = "cart.html";
  });
}

/*************************************  LE FORMULAIRE ********************************/

// sélection du bouton Commander

const btnCommander = document.querySelector("#order");
console.log(btnCommander);

// addEventListener

btnCommander.addEventListener("click", (event) => {
  event.preventDefault();

  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  console.log(contact);

  /******************************** GESTION DU FORMULAIRE ****************************/

  const regExPrenomNomVille = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };

  const regExAdresse = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };

  const regExEmail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      value
    );
  };

  // Fonctions de contrôle
  function firstNameControl() {
    const prenom = contact.firstName;
    let inputFirstName = document.querySelector("#firstName");
    if (regExPrenomNomVille(prenom)) {
      inputFirstName.style.backgroundColor = "green";
      return true;
    } else {
      inputFirstName.style.backgroundColor = "#FF6F61";
      return false;
    }
  }
  function lastNameControl() {
    const nom = contact.lastName;
    let inputLastName = document.querySelector("#lastName");
    if (regExPrenomNomVille(nom)) {
      inputLastName.style.backgroundColor = "green";
      return true;
    } else {
      inputLastName.style.backgroundColor = "#FF6F61";
      return false;
    }
  }

  function addressControl() {
    const adresse = contact.address;
    let inputAddress = document.querySelector("#address");
    if (regExAdresse(adresse)) {
      inputAddress.style.backgroundColor = "green";
      return true;
    } else {
      inputAddress.style.backgroundColor = "#FF6F61";
      return false;
    }
  }
  function cityControl() {
    const ville = contact.city;
    let inputCity = document.querySelector("#city");
    if (regExPrenomNomVille(ville)) {
      inputCity.style.backgroundColor = "green";
      return true;
    } else {
      inputCity.style.backgroundColor = "#FF6F61";
      return false;
    }
  }
  function mailControl() {
    const courriel = contact.email;
    let inputMail = document.querySelector("#email");
    if (regExEmail(courriel)) {
      inputMail.style.backgroundColor = "green";
      return true;
    } else {
      inputMail.style.backgroundColor = "#FF6F61";
      return false;
    }
  }

  // Contrôle validité formulaire avant de l'envoyer dans le local storage
  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    mailControl()
  ) {
    // Enregistrer le formulaire dans le local storage
    // localStorage.setItem("contact", JSON.stringify(contact));
    sendToServer();
  } else {
    console.log("Veuillez bien remplir le formulaire");
  }

  /********************************FIN GESTION DU FORMULAIRE ****************************/

  /*******************************REQUÊTE DU SERVEUR ET POST DES DONNÉES ***************/
  function sendToServer() {
    const sendToServer = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // Ensuite on stock la réponse de l'api (orderId)
      .then(function (response) {
        return response.json();
      })
      .then(function (server) {
        orderId = server.orderId;
      });
    // SI on a bien obtenu un orderId en réponse on redirige notre utilisateur
    if (orderId != "") {
      location.href = "confirmation.html?" + orderId;
    }
  }
});

// Maintenir le contenu du localStorage dans le champs du formulaire

let dataFormulaire = JSON.parse(localStorage.getItem("contact"));

console.log(dataFormulaire);

document.querySelector("#firstName").value = dataFormulaire.firstName;
document.querySelector("#lastName").value = dataFormulaire.lastName;
document.querySelector("#address").value = dataFormulaire.address;
document.querySelector("#city").value = dataFormulaire.city;
document.querySelector("#email").value = dataFormulaire.email;
