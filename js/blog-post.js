const postSlug = new URLSearchParams(window.location.search).get("post");

import(`../data/blog-post-${postSlug}.js`).then((module) => {
  const data = module.default;

  document.getElementById("blog-image").src = data.image;
  document.getElementById("blog-image").alt = data.title;
  document.getElementById("blog-date").textContent = data.date;
  document.getElementById("blog-title").textContent = data.title;
  document.getElementById("blog-content").innerHTML = data.content;
});
