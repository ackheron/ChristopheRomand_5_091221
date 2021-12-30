// Sélection de l'ID colors
const colorIdSelected = document.querySelector("#colors");

// Sélection de l'ID quantity
const quantSelected = document.querySelector("#quantity");

// Sélection du bouton Ajouter au panier
const btnSend = document.querySelector("#addToCart");

const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => {
    return response.json();
  })

  .then((product) => {
    productSelected(product);
    productRegistered(product);
  })
  .catch((error) => {
    alert(error);
  });

// Fonction qui récupère les données de la promesse .then(product) pour injecter les valeurs dans le fichier Html

let productSelected = (product) => {
  console.log(product);
  // Injection des données de l'objet sélectionner dans le Html
  document.querySelector("head > title").textContent = product.name;
  document.querySelector(
    ".item__img"
  ).innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector("#title").textContent += product.name;
  document.querySelector("#price").textContent += product.price;
  document.querySelector("#description").textContent += product.description;

  // Sélection de de la balise color-select dans le Html

  let colorId = document.querySelector("#colors");
  console.log(colorId);
  console.log(product.colors);

  // Itération dans le tableau colors de l'objet et insertion des variables dans le Html

  for (color of product.colors) {
    let option = document.createElement("option");
    option.innerHTML = `${color}`;
    option.value = `${color}`;

    colorId.appendChild(option);
    console.log(option);
  }
};

// Fonction qui enregistre dans un objet les options de l'utilisateur au click sur le bouton ajouter au panier

let productRegistered = (product) => {
  // Écoute de l'évènement click sur le bouton ajouter

  btnSend.addEventListener("click", (event) => {
    event.preventDefault();

    if (colorIdSelected.value == false) {
      confirm("Veuillez sélectionner une couleur");
    } else if (quantSelected.value == 0) {
      confirm("Veuillez sélectionner le nombre d'articles souhaités");
    } else {
      // Enregistrement des valeurs dans un objet optionProduct
      let optionProduct = {
        id: product._id,
        name: product.name,
        img: product.imageUrl,
        altTxt: product.altTxt,
        description: product.description,
        color: colorIdSelected.value,
        quantity: quantSelected.value,
        price: product.price * quantSelected.value,
      };
      console.log(optionProduct);

      // Le Local Storage

      // let localStorageProducts = JSON.parse(localStorage.getItem("basket"));

      // console.log(localStorageProducts);
      // if (localStorageProducts == false) {
      //   localStorageProducts.push(optionProduct);

      //   localStorage.setItem("basket", JSON.stringify(localStorageProducts));
      //   console.log(localStorageProducts);
      // } else {
      //   localStorageProducts = [];
      //   localStorageProducts.push(optionProduct);

      //   localStorage.setItem("basket", JSON.stringify(localStorageProducts));
      //   console.log(localStorageProducts);
      // }

      // let localStorageProducts =
      //   JSON.parse(localStorage.getItem("products")) || [];
      let localStorageProducts =
        JSON.parse(localStorage.getItem("basket")) || [];

      let item = localStorageProducts.find((item) => product.name === "name");

      if (item) {
        item.quantity += quantity;
      } else {
        localStorageProducts.push(optionProduct);
      }
      console.log(item);

      // then put it back.
      localStorage.setItem("basket", JSON.stringify(localStorageProducts));
      console.log(localStorageProducts);

      // ------------------test
      // for (let i = 0; i < localStorageProducts.length; i++) {
      //   let color = localStorageProducts[i].color;
      //   let id = localStorageProducts[i].id;
      //   console.log(color);
      //   console.log(id);

      //   if (color == product.color && id == product.id) {
      //     product.id += 10;
      //   } else {
      //     localStorageProducts.push(optionProduct);
      //   }
      // }
    }
  });
};
