# Blogger Don't Track My Views Checker

A Chrome Extension to check whether Blogger is tracking your own pageviews across multiple blogs.  

***To be updated to be in sync with latest code***

## Features

- Displays the `_ns` cookie status for each configured Blogger blog.
  - If the cookie is **set**, Blogger is *not* tracking your own views.  
  - If the cookie is **absent**, Blogger *is* tracking your own views.
- Shows a **popup** with detailed ON/OFF status when you click the extension icon.
- Displays a **badge** on the extension icon:
  - **Green tick (✓)** if all blogs have `_ns` cookie set.
  - **Red number** showing how many blogs do **not** have the cookie.
- Automatically updates the badge on **Chrome startup** and when opening the popup.

## Installation

1. Clone or download this repository.  
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

- To check other blogs, edit background.js and popup.js and update the blogDomains array.

## Author and Background

Ravi S. Iyer with assistance from ChatGPT. 

For more context, see the associated blog post: [Blogger's Don't track my views setting gets reset after some time - Probable cause; Exploring Chrome extn for notification if reset](https://raviswdev.blogspot.com/2025/09/bloggers-dont-track-my-views-setting.html)

## License

MIT License