// Variable contenant l'addresse de l'api

const kanapApi = "http://localhost:3000/api/products";

// Requête HTTP de type GET vers l'api

// fetch(kanapApi)
//   .then((response) => response.json())

//   .then((products) => {
//     products.forEach((data) => {
//       console.log(data);
//       document.getElementById(
//         "items"
//       ).innerHTML += `<a href="./product.html?id=${data._id}">
//              <article>
//                 <img
//                     src="${data.imageUrl}"
//                     alt="${data.altTxt}"/>
//                 <h3 class="productName"> ${data.name}</h3>
//                 <p class="productDescription"> ${data.description}</p>
//             </article>
//         </a>`;
//     });
//   })
//   .catch((error) =>
//     console.log(
//       "Il y a eu un problème avec l'opération fetch: " + error.message
//    )
//   );

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
    console.log("test d'erreur");
    document.getElementById(
      "items"
    ).innerHTML += `<h3>Erreur de chargment</h3>`;
  });
