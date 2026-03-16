
window.itemPerPage = 10;
window.data = []; 
window.originalData = []; 
const ListProduct = document.querySelector(".book-list");
const emptyBooks = document.querySelector(".book-empty");

window.renderBooks = function (page = 1) {
  const start = (page - 1) * window.itemPerPage;
  const end = start + window.itemPerPage;
  const pageData = window.data.slice(start, end);

  ListProduct.innerHTML = pageData
    .map((product) => {
      return `
        <div class="book-img" >
        <li class="book">
        <a href="./detail.html?id=${product.id}">
        <img src=${product.cover_url} alt="${product.title}">
        <p class="book-title">${product.title}</p>
        <p class="book-author">${product.author}</p>
        </a>
        <p class="book-price">${product.priceFormatted}</p>
        </li> 
        </div> 
      `;
    })
    .join(" ");
};

function parsePrice(value) {
  if (typeof value === "number") return value;
  const digits = String(value || "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

function formatPrice(value) {
  return Number(value).toLocaleString("vi-VN") + " đ";
}

function applyFilters() {
  const input = document.querySelector(".inputx");
  const minInput = document.querySelector("#price-min");
  const maxInput = document.querySelector("#price-max");
  const sortSelect = document.querySelector("#sort");

  const query = input ? input.value.trim().toLowerCase() : "";
  const minPrice = minInput && minInput.value ? Number(minInput.value) : null;
  const maxPrice = maxInput && maxInput.value ? Number(maxInput.value) : null;
  const sortValue = sortSelect ? sortSelect.value : "0";

  let filtered = window.originalData.filter((item) => {
    const title = (item.title || "").toLowerCase();
    const author = (item.author || "").toLowerCase();
    if (query && !title.includes(query) && !author.includes(query)) return false;
    const price = item.priceNumber;
    if (minPrice !== null && price < minPrice) return false;
    if (maxPrice !== null && price > maxPrice) return false;
    return true;
  });

  if (sortValue === "1") {
    filtered = filtered.slice().sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  } else if (sortValue === "2") {
    filtered = filtered.slice().sort((a, b) => (b.title || "").localeCompare(a.title || ""));
  } else if (sortValue === "3") {
    filtered = filtered.slice().sort((a, b) => a.priceNumber - b.priceNumber);
  } else if (sortValue === "4") {
    filtered = filtered.slice().sort((a, b) => b.priceNumber - a.priceNumber);
  }

  window.data = filtered;
  window.currPage = 1;
  if (emptyBooks) {
    emptyBooks.style.display = filtered.length === 0 ? "block" : "none";
  }
  if (typeof window.renderPagination === "function") {
    window.renderPagination(filtered.length);
  }
  window.renderBooks(1);
}

// Fetch API
fetch("https://64036281302b5d671c4e05dc.mockapi.io/book")
  .then((response) => response.json())
  .then((products) => {
    const normalized = products.map((p) => {
      const priceNumber = parsePrice(p.price);
      return {
        ...p,
        priceNumber,
        priceFormatted: formatPrice(priceNumber),
      };
    });
    window.originalData = normalized;
    window.data = normalized;
    applyFilters();

    const input = document.querySelector(".inputx");
    const minInput = document.querySelector("#price-min");
    const maxInput = document.querySelector("#price-max");
    const sortSelect = document.querySelector("#sort");

    if (input) input.addEventListener("input", applyFilters);
    if (minInput) minInput.addEventListener("input", applyFilters);
    if (maxInput) maxInput.addEventListener("input", applyFilters);
    if (sortSelect) sortSelect.addEventListener("change", applyFilters);
  });
