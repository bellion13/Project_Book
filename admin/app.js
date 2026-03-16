var courseAPI = "https://64036281302b5d671c4e05dc.mockapi.io/book";
var main = document.getElementById("main-show-data");
var $ = document.querySelector.bind(document);
var allCourses = [];

const inputName = document.getElementById("input-title");
const inputAuthor = document.getElementById("input-author");
const inputPrice = document.getElementById("input-price");
const inputNXB = document.getElementById("input-nxb");
const inputNamXB = document.getElementById("input-namxb");
const inputMaHang = document.getElementById("input-mahang");
const inputTenNhaCungCap = document.getElementById("input-tennhacungcap");
const inputNgonNgu = document.getElementById("input-ngonngu");
const inputTrongLuong = document.getElementById("input-trongluong");
const inputKichThuoc = document.getElementById("input-kichthuoc");
const inputLoaiBia = document.getElementById("input-loaibia");
const inputSoTrang = document.getElementById("input-sotrang");
const inputImage = document.getElementById("input-image");
const inputDescription = document.getElementById("input-description");

const save = document.querySelector("#save");
const create = document.querySelector("#create");
const updateBtn = document.querySelector("#update-btn");
const searchInput = document.getElementById("admin-search");

function start() {
  getCourses(function (courses) {
    allCourses = courses;
    applySearch();
  });
  handleCreateForm();
  HandleBtnAdd();
  setupSearch();
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
      getCourses(function (courses) {
        allCourses = courses;
        applySearch();
      });
    })
    .then(callback);
}

//  chỗ cần làm 
function handleCreateForm() {
  var createBtn = $("#create");
  createBtn.onclick = function () {
    let formData = {
      title: inputName.value,
      author: inputAuthor.value,
      price: inputPrice.value,
      NXB: inputNXB.value,
      NamXB: inputNamXB.value,
      MaHang: inputMaHang.value,
      TenNhaCungCap: inputTenNhaCungCap.value,
      NgonNgu: inputNgonNgu.value,
      TrongluongGr: inputTrongLuong.value,
      KichThuoc: inputKichThuoc.value,
      SoTrang: inputSoTrang.value,
      LoaiBia: inputLoaiBia.value,
      description: inputDescription.value,
      cover_url: inputImage.value,
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
      inputName.value = ProductUpdate.title;
      inputAuthor.value = ProductUpdate.author;
      inputPrice.value = ProductUpdate.price;
      inputNXB.value = ProductUpdate.NXB;
      inputNamXB.value = ProductUpdate.NamXB;
      inputMaHang.value = ProductUpdate.MaHang;
      inputTenNhaCungCap.value = ProductUpdate.TenNhaCungCap;
      inputNgonNgu.value = ProductUpdate.NgonNgu;
      inputTrongLuong.value = ProductUpdate.TrongluongGr;
      inputKichThuoc.value = ProductUpdate.KichThuoc;
      inputLoaiBia.value = ProductUpdate.LoaiBia;
      inputSoTrang.value = ProductUpdate.SoTrang;
      inputDescription.value = ProductUpdate.description;
      inputImage.value = ProductUpdate.cover_url;
      // inputBrand.value = ProductUpdate.brand;
      save.onclick = () => {
        HandleUpdateForm(`${ProductUpdate.id}`);
      };
    });
}

function HandleUpdateForm(id) {
  let formData = {
    title: inputName.value,
    author: inputAuthor.value,
    price: inputPrice.value,
    NXB: inputNXB.value,
    NamXB: inputNamXB.value,
    MaHang: inputMaHang.value,
    TenNhaCungCap: inputTenNhaCungCap.value,
    NgonNgu: inputNgonNgu.value,
    TrongluongGr: inputTrongLuong.value,
    KichThuoc: inputKichThuoc.value,
    SoTrang: inputSoTrang.value,
    LoaiBia: inputLoaiBia.value,
    description: inputDescription.value,
    cover_url: inputImage.value,
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
    getCourses(function (courses) {
      allCourses = courses;
      applySearch();
    });
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
    getCourses(function (courses) {
      allCourses = courses;
      applySearch();
    });
  });
}

function renderCourses(courses) {
  main.innerHTML = courses
    .map((currentValue) => {
      // console.log(currentValue);
      return `
    <tr id="list-courses" >
        <td>${currentValue.id}</td>
        <td>${currentValue.title}</td>
        <td>${currentValue.author}</td>
        <td>${parseInt(currentValue.price).toLocaleString()}đ</td>
        <td>${currentValue.description.slice(0, 100)}...</td>   
        <td><img src="${currentValue.cover_url}" alt="${
        currentValue.title
      }" style="height:40px;"></td>   
        <td class="text-center">
            <div class="action-btns">
              <button class="btn-icon btn-view" data-toggle="modal" data-target="#viewModal" onclick="viewInfo(${
                currentValue.id
              })" title="Xem">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn-icon btn-update" id="update-btn" data-toggle="modal" data-target="#myModal" onclick="updateFind(${
                currentValue.id
              })" title="Sửa">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn-icon btn-delete" onclick="HandleDeleteCourses(${
                " " + currentValue.id
              })" title="Xoá">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
        </td>
    </tr>
    `;
    })
    .join("");
}

function viewInfo(id) {
  const item = allCourses.find((c) => String(c.id) === String(id));
  if (!item) return;
  document.getElementById("view-title").textContent = item.title || "";
  document.getElementById("view-author").textContent = item.author || "";
  document.getElementById("view-price").textContent = parseInt(item.price || 0).toLocaleString() + "đ";
  document.getElementById("view-nxb").textContent = item.NXB || "";
  document.getElementById("view-namxb").textContent = item.NamXB || "";
  document.getElementById("view-mahang").textContent = item.MaHang || "";
  document.getElementById("view-ncc").textContent = item.TenNhaCungCap || "";
  document.getElementById("view-ngonngu").textContent = item.NgonNgu || "";
  document.getElementById("view-trongluong").textContent = item.TrongluongGr || "";
  document.getElementById("view-kichthuoc").textContent = item.KichThuoc || "";
  document.getElementById("view-loaibia").textContent = item.LoaiBia || "";
  document.getElementById("view-sotrang").textContent = item.SoTrang || "";
  document.getElementById("view-description").textContent = item.description || "";
  document.getElementById("view-image").src = item.cover_url || "";
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

function applySearch() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  if (!query) {
    renderCourses(allCourses);
    return;
  }
  const filtered = allCourses.filter((course) =>
    (course.title || "").toLowerCase().includes(query)
  );
  renderCourses(filtered);
}

function setupSearch() {
  if (!searchInput) return;
  searchInput.addEventListener("input", applySearch);
}
