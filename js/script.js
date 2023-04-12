// data
let data;
//  api home
const ListProduct = document.querySelector(".book-list");
console.log(ListProduct);
fetch("https://64036281302b5d671c4e05dc.mockapi.io/book")
  .then((response) => response.json())
  .then((products) => {
    // Tạo HTML cho mỗi sản phẩm và thêm vào trang web
    data = products;
    ListProduct.innerHTML = products
      .map((product) => {
        return `
        <div class="book-img" >
        <li class="book">
        <a href="./detail.html?id=${product.id}">
        <img src=${product.cover_url} alt="${product.title}">
        <p class="book-title">${product.title}</p>
        <p class="book-author">${product.author}</p>
        </a>
        <p class="book-price">${product.price}</p>
        </li> 
        </div> 
      `;
      })
      .join(" ");
  })
  // tìm kiếm
  .then((products) => {
    console.log(data);
    const input = document.querySelector(".inputx");
    input.addEventListener("keyup", (event) => {
      const target = event.target;
      const value = target.value;
      const convertToLowerCase = value.toLowerCase();
      const filterData = data.filter((item) =>
        item.title.toLowerCase().includes(convertToLowerCase)
      );
      ListProduct.innerHTML = filterData
        .map((product) => {
          return `
        <div class="book-img" >
        <li class="book">
        <a href="./detail.html?id=${product.id}">
        <img src=${product.cover_url} alt="${product.title}">
        <p class="book-title">${product.title}</p>
        <p class="book-author">${product.author}</p>
        </a>
        <p class="book-price">${product.price}</p>
        </li> 
        </div> 
      `;
        })
        .join(" ");
    });
  });
// sắp xếp
function sort() {
  let value = document.querySelector("#sort");
  if (data && value.value == 1) {
    let dataFilter = [...data];
    let newData = dataFilter.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    ListProduct.innerHTML = newData
      .map((product) => {
        return `
      <div class="book-img" >
      <li class="book">
      <a href="./detail.html?id=${product.id}">
      <img src=${product.cover_url} alt="${product.title}">
      <p class="book-title">${product.title}</p>
      <p class="book-author">${product.author}</p>
      </a>
      <p class="book-price">${product.price}</p>
      </li> 
      </div> 
    `;
      })
      .join(" ");
  } else if (data && value.value == 2) {
    let dataFilter = [...data];
    let newData = dataFilter.sort((a, b) => {
      if (a.title < b.title) {
        return 1;
      }
      if (a.title > b.title) {
        return -1;
      }
      return 0;
    });
    ListProduct.innerHTML = newData
      .map((product) => {
        return `
      <div class="book-img" >
      <li class="book">
      <a href="./detail.html?id=${product.id}">
      <img src=${product.cover_url} alt="${product.title}">
      <p class="book-title">${product.title}</p>
      <p class="book-author">${product.author}</p>
      </a>
      <p class="book-price">${product.price}</p>
      </li> 
      </div> 
    `;
      })
      .join(" ");
  } else if (data && value.value == 0) {
    newData = data;
    ListProduct.innerHTML = newData
      .map((product) => {
        return `
      <div class="book-img" >
      <li class="book">
      <a href="./detail.html?id=${product.id}">
      <img src=${product.cover_url} alt="${product.title}">
      <p class="book-title">${product.title}</p>
      <p class="book-author">${product.author}</p>
      </a>
      <p class="book-price">${product.price}</p>
      </li> 
      </div> 
    `;
      })
      .join(" ");
  }
}

// const VND = new Intl.NumberFormat('vi-VN', {
//   style: 'currency',
//   currency: 'VND',
// });

// console.log('Việt Nam đồng: ' + VND.format(price)); // Việt Nam đồng: 21.450 ₫