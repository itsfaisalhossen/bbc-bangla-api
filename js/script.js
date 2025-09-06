const bookmarkCount = document.getElementById("bookmark-count");
const newsContainer = document.getElementById("news-container");
const modalContainer = document.getElementById("modal-conatiner");
const newsDetailsModal = document.getElementById("news-details-modal");
const categoryContainer = document.getElementById("category-container");
const bookmarkContainer = document.getElementById("bookmark-container");

let bookmarks = [];
const loadCategories = () => {
  try {
    const url = `https://news-api-fs.vercel.app/api/categories`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const categories = data.categories;
        displayCategories(categories);
      });
  } catch (error) {
    console.log(error);
  }
};

const loadNewsByCategory = async (newsId) => {
  const url = `https://news-api-fs.vercel.app/api/categories/${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const categoryNews = data.articles;
      displayNews(categoryNews);
    })
    .catch((err) => {
      showError();
      alert("Something wen worng");
    });
};

const displayCategories = (newsCategories) => {
  newsCategories.forEach((element) => {
    categoryContainer.innerHTML += `
          <li id="${element.id}" class="cursor-pointer hover:border-red-600 border-red-600 hover:border-b-4">
          ${element.title}
          </li>
    `;
  });
  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });
    if (e.target.localName === "li") {
      showLoading();
      e.target.classList.add("border-b-4");
      loadNewsByCategory(e.target.id);
    }
  });
};

const displayNews = (newsDetails) => {
  if (newsDetails.length === 0) {
    showEmtyMessage();
    alert("No news found for this category");
    return;
  }
  newsContainer.innerHTML = "";
  newsDetails.forEach((article) => {
    newsContainer.innerHTML += `
        <div id="${article.id}" class="wfull flex flex-col justify-between h-[100%] border-1 p-2 rounded border-gray-200">
    
          <img class="w-full rounded" src="${article.image.srcset[6].url}"/>
          <h3 class="text-lg font-medium my-3">${article.title}</h3>
          <p class="mb-5">${article.time}</p>
      
        <div class="flex items-center justify-between"> 
          <button class="btn-xs btn w-[40%]">BookMark</button>
          <button class="btn-xs btn w-[40%]">ShowDetails</button>
          </div>
        </div>
    `;
  });
};

newsContainer.addEventListener("click", (e) => {
  if (e.target.innerText === "BookMark") {
    handleBookMarks(e);
  }
  if (e.target.innerText === "ShowDetails") {
    handleViewDetails(e);
  }
});

const handleBookMarks = (e) => {
  const title = e.target.parentNode.parentNode.children[1].innerText;
  const id = e.target.parentNode.parentNode.id;
  const x = { title, id };
  bookmarks.push(x);
  showBookMarks(bookmarks);
};

const showBookMarks = (bookmarks) => {
  bookmarkContainer.innerHTML = "";
  bookmarks.forEach((bookMarkItem) => {
    bookmarkContainer.innerHTML += `
    <div class="my-3 p-2 bg-gray-200 rounded">
      <h2>${bookMarkItem.title}</h2>
      <button onclick="handleBookDelete('${bookMarkItem.id}')" class="btn btn-xs">Delete</button>
    </div>
    `;
  });
  bookmarkCount.innerText = bookmarks.length;
};

const handleBookDelete = (id) => {
  const filteredBookMarks = bookmarks.filter((bMark) => bMark.id !== id);
  console.log(filteredBookMarks);
  bookmarks = filteredBookMarks;
  showBookMarks(bookmarks);
};

const showLoading = () => {
  newsContainer.innerHTML = `
      <div class="bg-green-500 p-3 text-white">Loading....</div>
   `;
};

const showError = () => {
  newsContainer.innerHTML = `
    <div class="bg-red-500 p-3 text-white">Something went worng</div>
  `;
};

const showEmtyMessage = () => {
  newsContainer.innerHTML = `
       <div class="bg-orange-500 p-3 text-white">No news found this category</div>
  `;
};

const handleViewDetails = (e) => {
  const id = e.target.parentNode.parentNode.id;
  fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => {
      showDetailsNews(data.article);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showDetailsNews = (article) => {
  newsDetailsModal.showModal();
  modalContainer.innerHTML = `
  <h1 class="font-bold">${article.title}</h1>
  <img class="my-4" src="${article.images[0].url}" />
  <p>${article.content.join("")}</p>
  `;
  console.log(article);
};

loadCategories();
loadNewsByCategory("main");

// const loadNewsCategories2 = async () => {
//   try {
//     const url = `https://news-api-fs.vercel.app/api/     categories`;
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// loadNewsCategories2();
