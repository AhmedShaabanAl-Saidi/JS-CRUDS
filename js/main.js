// CRUDS =======> create,retrieve,update,delete,search
// select the elements
var productName = document.getElementById("productName");
var productPrices = document.getElementById("productPrices");
var productCat = document.getElementById("productCat");
var productDes = document.getElementById("productDes");
var btnAdd = document.getElementById("btnAdd");
var productRow = document.getElementById("productRow");
var btnUpdate = document.getElementById("btnUpdate");
var searchByName = document.getElementById("searchByName");
var productImg = document.getElementById("productImg");

// list of objs
var productList;

if (localStorage.getItem("list") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("list"));
  // display saved products
  display(productList);
}

btnAdd.onclick = function () {
  addProduct();
};

// add product
function addProduct() {
  // product object
  var productObj = {
    pName: productName.value,
    pPrices: productPrices.value,
    pCat: productCat.value,
    pDes: productDes.value,
    pImg : `./img/${productImg.files[0]?.name}`,
  };

  productList.push(productObj);

  localStorage.setItem("list", JSON.stringify(productList));

  clearForm();

  display(productList);
}

// clear form
function clearForm() {
  productName.value = null;
  productPrices.value = null;
  productCat.value = null;
  productDes.value = null;
}

// display
function display(list) {
  var box = "";

  for (var i = 0; i < list.length; i++) {
    box += `<div class="col-md-3">
    <div class="card position-relative overflow-hidden">
        <img src="${list[i].pImg}" class="card-img-top w-100" alt="products_img">
        <h4 class="badge bg-black position-absolute  rounded-0"  >${i + 1}</h4>
        <div class="card-body">
            <h5 class="card-title">Name :${list[i].pName}</h5>
            <p class="card-text">Desorption :${list[i].pDes}</p>
            <div class="div  d-flex justify-content-between">
                <h6>Category :${list[i].pCat}</h6>
                <h6>Prices :${list[i].pPrices}</h6>
            </div>

            <button class="btn btn-outline-danger form-control my-2" onclick=deleteFun(${i})>Delete</button>
            <button class="btn btn-outline-warning form-control my-2" onclick=updateForEditFun(${i})>Update</button>
        </div>
    </div>
</div>`;
  }

  productRow.innerHTML = box;
}

// delete
function deleteFun(index) {
  productList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(productList));
  display(productList);
}

// update
var globalIndex;
function updateForEditFun(index) {
  globalIndex = index;
  btnUpdate.classList.remove("d-none");
  btnAdd.classList.add("d-none");
  productName.value = productList[index].pName;
  productPrices.value = productList[index].pPrices;
  productCat.value = productList[index].pCat;
  productDes.value = productList[index].pDes;
}

function updateFun() {
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  productList[globalIndex].pName = productName.value;
  productList[globalIndex].pPrices = productPrices.value;
  productList[globalIndex].pCat = productCat.value;
  productList[globalIndex].pDes = productDes.value;

  localStorage.setItem("list", JSON.stringify(productList));
  display(productList);
  clearForm();
}

btnUpdate.onclick = function () {
  updateFun();
};

// search
searchByName.oninput = function () {
  searchFun();
};

function searchFun() {
  var term = searchByName.value.trim().toLowerCase();
  var searchedArr = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].pName.trim().toLowerCase().includes(term) == true) {
      searchedArr.push(productList[i]);
    }
  }
  display(searchedArr);
}
