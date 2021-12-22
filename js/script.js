// Variable contenant l'addresse de l'api

const kanapApi = "http://localhost:3000/api/products";

// Requête HTTP de type GET vers l'api

fetch(kanapApi)
  .then((response) => {
    return response.json();
  })

  .then((products) => {
    console.log(products);
    for (data of products) {
      console.log(data);
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${data._id}">
              <article>
               <img
                     src="${data.imageUrl}"
                     alt="${data.altTxt}"/>
                 <h3 class="productName"> ${data.name}</h3>
                 <p class="productDescription"> ${data.description}</p>
             </article>
         </a>`;
    }
  })

  .catch((err) => {
    alert(error);
  });
