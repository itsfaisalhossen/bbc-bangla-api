const categoryContainer = document.getElementById("category-container");
const newsContainer = document.getElementById("news-container");

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
  try {
    const url = `https://news-api-fs.vercel.app/api/categories/${newsId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const categoryNews = data.articles;
        displayNews(categoryNews);
      });
  } catch (error) {
    console.log(error);
  }
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
      e.target.classList.add("border-b-4");
      loadNewsByCategory(e.target.id);
    }
  });
};

const displayNews = (newsDetails) => {
  newsContainer.innerHTML = "";
  newsDetails.forEach((article) => {
    newsContainer.innerHTML += `
        <div class="w-full">
          <img class="w-full" src="${article.image.srcset[6].url}"/>
          <p class="text-lg font-medium">${article.title}</p>
          <p>${article.time}</p>
        </div>
    `;
  });
};

loadCategories();
loadNewsByCategory("main");

// const loadNewsCategories2 = async () => {
//   try {
//     const url = `https://news-api-fs.vercel.app/api/categories`;
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
// loadNewsCategories2();
