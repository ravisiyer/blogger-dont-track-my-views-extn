import { BLOG_DOMAINS, BLOGGER_COOKIE_NAME } from "./config.js";
import { checkBlogs, updateBadge } from "./utils.js";

async function updateBadgeAndToast(showToast = false) {
  const results = await checkBlogs(BLOG_DOMAINS, BLOGGER_COOKIE_NAME);
  await updateBadge(results);

  const missingCount = results.filter(r => !r.hasCookie).length;
  if (missingCount > 0 && showToast) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Blogger Views Tracking",
      message: `${missingCount} blog(s) may be tracking your views.`,
      priority: 2
    });
  }
}

chrome.runtime.onStartup.addListener(() => {
  updateBadgeAndToast(true);
});
