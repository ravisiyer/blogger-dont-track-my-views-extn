// List of your Blogger blogs
const blogDomains = [
  "https://ravisiyer.blogspot.com",
  "https://ravisiyermisc.blogspot.com",
  "https://raviswdev.blogspot.com"
];

// Function to check _ns cookie for each blog
function checkBlogs() {
  blogDomains.forEach(domain => {
    chrome.cookies.get({ url: domain, name: "_ns" }, (cookie) => {
      if (!cookie) {
        console.warn(`⚠️ 'Don't track my views' is OFF for ${domain}`);
      } else {
        console.log(`✅ Don't track is ON for ${domain}, _ns value: ${cookie.value}`);
      }
    });
  });
}

// Run check on Chrome startup
chrome.runtime.onStartup.addListener(checkBlogs);

// Run check when extension icon is clicked
chrome.action.onClicked.addListener(checkBlogs);
