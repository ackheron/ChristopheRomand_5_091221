const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const orderId = getProductId();

const basket = JSON.parse(localStorage.getItem("basket"));

const idConfirmation = document.querySelector("#orderId");

//Fonction Auto-invoquer pour afficher l'orderId dans le DOM

(function () {
  idConfirmation.textContent = orderId;
  //   localStorage.clear();
})();

`<div class="confirmation">
        <p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId">
            ${orderId}
          </span></p>
          <span>Le montant de votre commande est de 
      </div>`;
