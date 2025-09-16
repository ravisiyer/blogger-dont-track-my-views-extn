import { BLOG_DOMAINS, BLOGGER_COOKIE_NAME } from "./config.js";
import { checkBlogs, updateBadge } from "./utils.js";

async function renderPopup() {
  const container = document.getElementById("status");
  container.innerHTML = "";

  const results = await checkBlogs(BLOG_DOMAINS, BLOGGER_COOKIE_NAME);
  await updateBadge(results);

  results.forEach(r => {
    const div = document.createElement("div");
    div.textContent = r.hasCookie
      ? `✅ Don't track is ON for ${r.domain}, _ns value: ${r.cookie.value}`
      : `⚠️ Don't track my views is OFF for ${r.domain}`;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", renderPopup);
