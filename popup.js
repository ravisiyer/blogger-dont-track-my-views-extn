const blogDomains = [
  "https://ravisiyer.blogspot.com",
  "https://ravisiyermisc.blogspot.com",
  "https://raviswdev.blogspot.com"
];

const statusList = document.getElementById("statusList");

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
