const pagination = document.querySelector(".pagination");
const pages = pagination.querySelectorAll(".page");
const prev = pagination.querySelector(".prev");
const next = pagination.querySelector(".next");
let currentPage = 1;

function showPage(page) {
  // Code to show the content of the selected page
}

function setActivePage(page) {
  pages.forEach((p) => p.classList.remove("active"));
  page.classList.add("active");
}

function goToPage(page) {
  setActivePage(page);
  showPage(page);
  currentPage = parseInt(page.textContent);
}

prev.addEventListener("click", () => {
  if (currentPage > 1) {
    goToPage(pages[currentPage - 2]);
  }
});

next.addEventListener("click", () => {
  if (currentPage < pages.length) {
    goToPage(pages[currentPage]);
  }
});

pages.forEach((p) => {
  p.addEventListener("click", () => {
    goToPage(p);
  });
});
