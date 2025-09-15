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
    // Show number of blogs where _ns is OFF, or ✓ if all ON
    const text = offCount > 0 ? `${offCount}` : "✓"; 
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color: offCount > 0 ? 'red' : 'green' });
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
