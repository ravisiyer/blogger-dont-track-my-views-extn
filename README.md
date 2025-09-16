# Blogger Don't Track My Views Checker

A Chrome Extension to check whether Blogger is tracking your own pageviews across multiple blogs.  

## Features

- Displays the `_ns` cookie status for each configured Blogger blog.
  - If the cookie is **set**, Blogger is *not* tracking your own views.  
  - If the cookie is **absent**, Blogger *is* tracking your own views.
- Shows a **popup** with detailed ON/OFF status when you click the extension icon.
- Displays a **badge** on the extension icon:
  - **Green tick (✓)** if all blogs have `_ns` cookie set.
  - **Red number** showing how many blogs do **not** have the cookie.
- Automatically shows a **toast notification** at Chrome startup if one or more blogs are tracking your views.
- Startup check is **delayed by a configurable amount of time** (default 5 seconds) to avoid slowing down Chrome startup.
- Popup always provides **on-demand detailed status** for all configured blogs.

## Installation

1. Download the extension:
   - Download a [release](https://github.com/ravisiyer/blogger-dont-track-my-views-extn/releases).  
        **Or**  
   - Clone or download this repository.  
2. Open `chrome://extensions/` in Chrome.  
3. Enable **Developer mode**.  
4. Click **Load unpacked** and select the folder containing this extension.

## Configuration

- The extension currently checks the following blogs by default:

  ```text
  https://ravisiyer.blogspot.com
  https://ravisiyermisc.blogspot.com
  https://raviswdev.blogspot.com
  ```

- Configuration options are in config.js:

  - BLOG_DOMAINS: list of blogs to check.

  - BLOGGER_COOKIE_NAME: the name of the Blogger cookie (default _ns).

  - STARTUP_DELAY_MINUTES: delay before the startup check (default 5 / 60 = 5 seconds).

- To check other blogs or adjust cookie name/startup delay, edit config.js accordingly.

- config.default.js is a clean fallback copy of the default configuration.

  - If your config.js becomes unusable or you want to reset, simply delete it and copy config.default.js as a fresh config.js.

- Permissions in manifest.json:  
  - By default, the extension’s `manifest.json` provides permission for **all `blogspot.com` blogs** (`https://*.blogspot.com/*`).  
  - If you want to track blogs on other domains, you will need to update `manifest.json` to include the corresponding host permissions.

## Author and Background

Ravi S. Iyer with assistance from ChatGPT. 

For more context, see the associated blog post: [Blogger's Don't track my views setting gets reset after some time - Probable cause; Chrome extn for notification if reset](https://raviswdev.blogspot.com/2025/09/bloggers-dont-track-my-views-setting.html)

## License

MIT License