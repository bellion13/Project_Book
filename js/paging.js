const pagination = document.querySelector(".pagination");

window.currPage = 1;

window.renderPagination = function (totalItems) {
  const totalPages = Math.ceil(totalItems / window.itemPerPage);
  let html = '';

  // Prev Button
  html += `<a href="#" class="prev" onclick="handlePageChange(window.currPage - 1)">«</a>`;

  // Page Numbers
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      html += createPageLink(i);
    }
  } else {
    // 1 2 ... 4 5 6 ... 10
    if (window.currPage <= 3) {
      for (let i = 1; i <= 3; i++) html += createPageLink(i);
      html += '<span>...</span>';
      html += createPageLink(totalPages);
    } else if (window.currPage >= totalPages - 2) {
      html += createPageLink(1);
      html += '<span>...</span>';
      for (let i = totalPages - 2; i <= totalPages; i++) html += createPageLink(i);
    } else {
      html += createPageLink(1);
      html += '<span>...</span>';
      html += createPageLink(window.currPage - 1);
      html += createPageLink(window.currPage);
      html += createPageLink(window.currPage + 1);
      html += '<span>...</span>';
      html += createPageLink(totalPages);
    }
  }

  // Next Button
  html += `<a href="#" class="next" onclick="handlePageChange(window.currPage + 1)">»</a>`;

  pagination.innerHTML = html;
};

function createPageLink(page) {
  const activeClass = page === window.currPage ? 'active' : '';
  return `<a href="#" class="page ${activeClass}" onclick="handlePageChange(${page})">${page}</a>`;
}

window.handlePageChange = function (page) {
  const totalContents = window.data.length;
  const maxPage = Math.ceil(totalContents / window.itemPerPage);

  if (page < 1 || page > maxPage) return;

  window.currPage = page;
  if (typeof window.renderBooks === 'function') {
    window.renderBooks(window.currPage);
    window.renderPagination(totalContents);
  }
};
