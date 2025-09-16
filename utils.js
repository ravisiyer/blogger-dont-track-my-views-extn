export async function checkBlogs(domains, cookieName) {
  const results = [];
  for (const domain of domains) {
    const cookie = await chrome.cookies.get({ url: domain, name: cookieName });
    results.push({ domain, hasCookie: !!cookie, cookie });
  }
  return results;
}

export async function updateBadge(results) {
  const missingCount = results.filter(r => !r.hasCookie).length;
  if (missingCount === 0) {
    chrome.action.setBadgeText({ text: "✓" });
    chrome.action.setBadgeBackgroundColor({ color: "green" });
  } else {
    chrome.action.setBadgeText({ text: String(missingCount) });
    chrome.action.setBadgeBackgroundColor({ color: "red" });
  }
}
