const pagination = document.querySelector(".pagination");

window.currPage = 1;

window.renderPagination = function (totalItems) {
  const totalPages = Math.ceil(totalItems / window.itemPerPage);
  let html = "";
  if (totalPages === 0) {
    pagination.innerHTML = "";
    return;
  }
  const prevDisabled = window.currPage <= 1 ? "disabled" : "";
  const nextDisabled = window.currPage >= totalPages ? "disabled" : "";
  const prevOnclick = prevDisabled ? "" : `onclick="handlePageChange(window.currPage - 1)"`;
  const nextOnclick = nextDisabled ? "" : `onclick="handlePageChange(window.currPage + 1)"`;
  html += `<a href="#" class="prev ${prevDisabled}" ${prevOnclick}>&laquo;</a>`;
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      html += createPageLink(i);
    }
  } else {
    if (window.currPage <= 3) {
      for (let i = 1; i <= 3; i++) html += createPageLink(i);
      html += "<span>...</span>";
      html += createPageLink(totalPages);
    } else if (window.currPage >= totalPages - 2) {
      html += createPageLink(1);
      html += "<span>...</span>";
      for (let i = totalPages - 2; i <= totalPages; i++) html += createPageLink(i);
    } else {
      html += createPageLink(1);
      html += "<span>...</span>";
      html += createPageLink(window.currPage - 1);
      html += createPageLink(window.currPage);
      html += createPageLink(window.currPage + 1);
      html += "<span>...</span>";
      html += createPageLink(totalPages);
    }
  }
  html += `<a href="#" class="next ${nextDisabled}" ${nextOnclick}>&raquo;</a>`;

  pagination.innerHTML = html;
};

function createPageLink(page) {
  const activeClass = page === window.currPage ? "active" : "";
  return `<a href="#" class="page ${activeClass}" onclick="handlePageChange(${page})">${page}</a>`;
}

window.handlePageChange = function (page) {
  const totalContents = window.data.length;
  const maxPage = Math.ceil(totalContents / window.itemPerPage);

  if (page < 1 || page > maxPage) return;

  window.currPage = page;
  if (typeof window.renderBooks === "function") {
    window.renderBooks(window.currPage);
    window.renderPagination(totalContents);
  }
};
