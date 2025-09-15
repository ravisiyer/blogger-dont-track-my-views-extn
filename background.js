const blogDomains = [
  "https://ravisiyer.blogspot.com",
  "https://ravisiyermisc.blogspot.com",
  "https://raviswdev.blogspot.com"
];

// Function to check cookies and update badge
function updateBadge() {
  let offCount = 0;

  const promises = blogDomains.map(domain => {
    return new Promise(resolve => {
      chrome.cookies.get({ url: domain, name: "_ns" }, (cookie) => {
        if (!cookie) offCount++;
        resolve();
      });
    });
  });

  Promise.all(promises).then(() => {
    // Set badge text
    const text = offCount > 0 ? `${offCount}` : "✓"; 
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color: offCount > 0 ? 'red' : 'green' });

    // Show toast/notification if any blog is missing the cookie
    if (offCount > 0) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Blogger Cookie Alert",
        message: `${offCount} blog(s) are tracking your own views. Click the extension icon to check details.`,
        priority: 2
      });
    }
  });
}

// Run badge update immediately when service worker starts
updateBadge();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "updateBadge") updateBadge();
});

// Optional: run on Chrome startup (service worker may already be alive)
chrome.runtime.onStartup.addListener(updateBadge);
