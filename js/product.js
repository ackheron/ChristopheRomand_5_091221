const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};

const getProduct = (productId) => {
  return fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => {
      return response.json();
    })

    .then((product) => {
      console.log(product);
      document.querySelector(
        ".item__img"
      ).innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
      document.querySelector("#title").textContent += product.name;
      document.querySelector("#price").textContent += product.price;
      document.querySelector("#description").textContent += product.description;

      let colorId = document.querySelector("#colors");
      console.log(colorId);
      console.log(product.colors);

      for (color of product.colors) {
        let option = document.createElement("option");
        option.innerHTML = `${color}`;
        option.value = `${color}`;

        colorId.appendChild(option);
        console.log(option);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

(async () => {
  const productId = getProductId();
  const product = getProduct(productId);
})();
