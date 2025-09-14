chrome.runtime.onStartup.addListener(() => {
  const bloggerDomain = "https://www.blogger.com";

  chrome.cookies.get({ url: bloggerDomain, name: "_ns" }, (cookie) => {
    if (!cookie) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Blogger Tracking Alert",
        message: "⚠️ 'Don't track my views' is OFF for your Blogger blogs!"
      });
    } else {
      console.log("✅ Don't track is ON, _ns cookie found:", cookie.value);
    }
  });
});
