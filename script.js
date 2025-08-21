const apiKey = "pub_ab04fed1c6b642c9ae36de170ba1ad19"; // your NewsData.io API key
const newsContainer = document.getElementById("news-container");
const categorySelect = document.getElementById("category");

async function fetchNews(category = "technology") {
  try {
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=${category}&language=en`;
    const res = await fetch(url);
    const data = await res.json();

    newsContainer.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      newsContainer.innerHTML = "<p>No news found for this category.</p>";
      return;
    }

    data.results.forEach(article => {
      const card = document.createElement("div");
      card.classList.add("news-card");

      card.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.link}" target="_blank">Read More</a>
      `;

      newsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>⚠️ Failed to load news. Try again later.</p>";
  }
}

categorySelect.addEventListener("change", () => {
  fetchNews(categorySelect.value);
});

// Load default category on startup
fetchNews();
