// Pagination settings
window.itemPerPage = 10;
window.data = []; // Current display data (filtered/sorted)
window.originalData = []; // Backup of original data
const ListProduct = document.querySelector(".book-list");

// Render function exposed for paging.js
window.renderBooks = function (page = 1) {
  const start = (page - 1) * window.itemPerPage;
  const end = start + window.itemPerPage;
  const pageData = window.data.slice(start, end);

  ListProduct.innerHTML = pageData
    .map((product) => {
      // Use logic to format price if needed, referencing existing code structure
      // Note: Existing code just used product.price directly in the template
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
};

// Fetch API
fetch("https://64036281302b5d671c4e05dc.mockapi.io/book")
  .then((response) => response.json())
  .then((products) => {
    window.originalData = products;
    window.data = products;
    if (typeof window.renderPagination === 'function') {
      window.renderPagination(products.length);
    }
    window.renderBooks(1);

    // Initial Search Setup
    const input = document.querySelector(".inputx");
    input.addEventListener("keyup", (event) => {
      const target = event.target;
      const value = target.value;
      const convertToLowerCase = value.toLowerCase();

      const filterData = window.originalData.filter((item) =>
        item.title.toLowerCase().includes(convertToLowerCase)
      );

      window.data = filterData;
      window.currPage = 1;
      if (typeof window.renderPagination === 'function') {
        window.renderPagination(filterData.length);
      }
      window.renderBooks(1); // Reset to page 1 on search
    });
  });

// Sort function
function sort() {
  let value = document.querySelector("#sort");
  if (value.value == 1) {
    // A-Z
    window.data.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
  } else if (value.value == 2) {
    // Z-A
    window.data.sort((a, b) => {
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0;
    });
  } else {
    // Default / Reset
    window.data = [...window.originalData];
    const input = document.querySelector(".inputx");
    if (input && input.value) {
      const val = input.value.toLowerCase();
      window.data = window.originalData.filter(item => item.title.toLowerCase().includes(val));
    }
  }

  // Update View
  window.currPage = 1;
  window.renderBooks(1);
  if (typeof window.renderPagination === 'function') {
    window.renderPagination(window.data.length);
  }
}

// const VND = new Intl.NumberFormat('vi-VN', {
//   style: 'currency',
//   currency: 'VND',
// });

// console.log('Việt Nam đồng: ' + VND.format(price)); // Việt Nam đồng: 21.450 ₫
// let price = "";
// let text = price.toLocaleString("vi-VN", {style:"currency", currency:"VND"});

// document.getElementsByClassName("book-img").innerHTML = text;