var courseAPI = "https://6397f76c86d04c7633a1c4d5.mockapi.io/productPhone";
var main = document.getElementById("main-show-data");
var $ = document.querySelector.bind(document);

const inputPrice = document.getElementById("input-price");
const inputName = document.getElementById("input-name");
const inputAmount = document.getElementById("input-amount");
const inputImage = document.getElementById("input-image");
const inputDescription = document.getElementById("input-description");
const inputBrand = document.getElementById("input-brand");
const save = document.querySelector("#save");
const create = document.querySelector("#create");
const updateBtn = document.querySelector("#update-btn");

function start() {
  getCourses(renderCourses);
  handleCreateForm();
  HandleBtnAdd();
}
start();

function getCourses(callback) {
  fetch(courseAPI)
    .then((response) => {
      return response.json();
    })
    .then(callback);
  }
  
function createCourse(data, callback) {
  fetch(courseAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      response.json();
      getCourses(renderCourses);
    })
    .then(callback);
}

function handleCreateForm() {
  var createBtn = $("#create");
  createBtn.onclick = function () {
    let formData = {
      name: inputName.value,
      description: inputDescription.value,
      img: inputImage.value,
    };
    createCourse(formData, function () {});
  };
}

function updateFind(id) {
  create.style.display = "none";
  save.style.display = "block";
  fetch(courseAPI)
    .then((response) => {
      return response.json();
    })
    .then((x) => {
      var ProductUpdate = x.find((currentValue) => {
        return parseInt(currentValue.id) === id;
      });
      inputName.value = ProductUpdate.name;
      inputDescription.value = ProductUpdate.description;
      inputPrice.value = ProductUpdate.price;
      inputAmount.value = ProductUpdate.warehouse;
      inputImage.value = ProductUpdate.img;
      inputAmount.value = ProductUpdate.warehouse;
      inputBrand.value = ProductUpdate.brand;
      save.onclick = () => {
        HandleUpdateForm(`${ProductUpdate.id}`);
      };
    });
}

function HandleUpdateForm(id) {
  let formData = {
    name: inputName.value,
    description: inputDescription.value,
    price: inputPrice.value,
    warehouse: inputAmount.value,
    img: inputImage.value,
    brand: inputBrand.value,
  };
  UpdateCourse(id, formData, () => {});
}

function HandleDeleteCourses(id) {
  fetch(courseAPI + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    response.json();
    start();
  });
}

function UpdateCourse(id, formData) {
  fetch(courseAPI + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((response) => {
    response.json();
    start();
  });
}

function renderCourses(courses) {
  main.innerHTML = courses
    .map((currentValue) => {
      return `
    <tr id="list-courses" >
        <td>${currentValue.id}</td>
        <td>${currentValue.name}</td>
        <td>${currentValue.brand}</td>
        <td>${parseInt(currentValue.price).toLocaleString()}đ</td>
        <td>${currentValue.warehouse}</td>
        <td>${currentValue.description.slice(0, 100)}...</td>   
        <td><img src="${currentValue.img}" alt="${
        currentValue.name
      }" style="height:40px;"></td>   
        <td class="text-center">
            <button class="btn btn-danger" onclick="HandleDeleteCourses(${
              " " + currentValue.id
            })">Delete</button>
            <button class=" btn btn-warning" id="update-btn" data-toggle="modal" data-target="#myModal" onclick="updateFind(${
              currentValue.id
            })">Update</button>     
        </td>
    </tr>
    `;
    })
    .join("");
}

function HandleBtnAdd() {
  var btnAdd = document.querySelector(".btn-add");
  btnAdd.onclick = () => {
    const save = document.querySelector("#save");
    const create = document.querySelector("#create");
    create.style.display = "block";
    save.style.display = "none";
  };
}
