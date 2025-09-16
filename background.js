import { BLOG_DOMAINS, BLOGGER_COOKIE_NAME, STARTUP_DELAY_MINUTES } from "./config.js";
import { checkBlogs, updateBadge } from "./utils.js";

async function updateBadgeAndToast(showToast = false) {
  const results = await checkBlogs(BLOG_DOMAINS, BLOGGER_COOKIE_NAME);
  await updateBadge(results);

  const missingCount = results.filter(r => !r.hasCookie).length;
  if (missingCount > 0 && showToast) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon48.png",
      title: "Blogger Views Tracking",
      message: `${missingCount} blog(s) may be tracking your views.`,
      priority: 2
    });
  }
}

// Schedule a one-shot alarm after configured delay
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create("delayedCheck", { delayInMinutes: STARTUP_DELAY_MINUTES });
  // chrome.alarms.create("delayedCheck", { delayInMinutes: 1 });
  // chrome.alarms.create("delayedCheck", { delayInMinutes: 5 / 60 });
});

// When the alarm fires, do the check once
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "delayedCheck") {
    updateBadgeAndToast(true);
    // optional: clear the alarm explicitly, though it auto-clears after firing once
    chrome.alarms.clear("delayedCheck");
  }
});
