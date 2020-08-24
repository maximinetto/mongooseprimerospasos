const lista = document.getElementById("lista");
const productIdInput = document.getElementById("productId");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const brandInput = document.getElementById("brand");

const modalEdit = document.getElementById("updateModal");

function iniciar(){
    lista.innerHTML = "";
    fetch("http://localhost:1234/products/all")
  .then((res) => res.json())
  .then((res) => {
    res.forEach((p) => {

      lista.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
            <th scope="row" class="id">${p._id}</th>
            <td class="name">${p.name}</td>
            <td class="price">${p.price}</td>
            <td class="brand" >${p.brand.name}</td>
            <td>
                <div class="row">
                    <button class="btn edit btn-primary" data-toggle="modal" data-target="#updateModal">Edit</button>
                    <button class="btn delete btn-danger ml-1" data-toggle="modal" data-target="#deleteModal">Delete</button>
                </div>
            </td>
        </tr>
        `
      );
    });

    const edits = document.getElementsByClassName("edit");

    for (let e of edits) {
      e.addEventListener("click", (e) => {
        const tr = e.target.closest('tr');
        const id = tr.querySelector(".id").innerHTML;
        const name = tr.querySelector(".name").innerHTML;
        const price = tr.querySelector(".price").innerHTML;
        const brand = tr.querySelector(".brand").innerHTML;
        productIdInput.value = id;
        nameInput.value = name;
        priceInput.value = price;
        brandInput.value = brand;
      });
    }
  })
  .catch((err) => console.log(err));


};

iniciar();

  function saveChanges(){
      const productId = productIdInput.value;
      const name = nameInput.value;
      const price = priceInput.value;
      const brand = brandInput.value;

      modificar({productId, name, price, brand});  
  }

  function modificar({productId, name, price, brand}){
    fetch(`http://localhost:1234/products/${productId} `, { method: 'PUT', body: JSON.stringify({
        name, price, brand
    })})
    .then((res) =>  {
        if(res.status !== 200)
            throw new Error("Hubo un error")

        return res.json(); 
    })
    .then( res => {
        $("#updateModal").modal('hide');
        iniciar();
    })
    .catch(err => {
        console.log(err)
    })
  }
