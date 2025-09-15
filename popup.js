const blogDomains = [
  "https://ravisiyer.blogspot.com",
  "https://ravisiyermisc.blogspot.com",
  "https://raviswdev.blogspot.com"
];

const statusList = document.getElementById("statusList");

// Clear previous list items
statusList.innerHTML = "";

// Check cookies and update popup list
blogDomains.forEach(domain => {
  chrome.cookies.get({ url: domain, name: "_ns" }, (cookie) => {
    const li = document.createElement("li");
    if (cookie) {
      li.textContent = `${domain}: ON (_ns=${cookie.value})`;
      li.className = "on";
    } else {
      li.textContent = `${domain}: OFF`;
      li.className = "off";
    }
    statusList.appendChild(li);
  });
});

// Tell background to update badge (best-effort)
chrome.runtime.sendMessage({ action: "updateBadge" });
