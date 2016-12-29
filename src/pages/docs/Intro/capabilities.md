---
description: "Capabilities of Senna.js"
layout: "guideIntro"
title: "Capabilities"
weight: 3
---

<article id="seo">

###### In order to create a single page application with good perceived latency and good user experience, the SPA engine must handle many aspects of the browser’s native behavior. Here are some of the amazing capabilities of Senna.js.

## SEO & Bookmarkability: 

So if the browser is simply gathering more information rather than refreshing to a separate page, how do you make sure that your users can bookmark and share the content they are viewing? With Senna.js, your app will create specific urls that correlate to the information that your users are viewing. This not only makes it seamless for your users, but it also enables search engines to index that same information just like it would if it was a traditional webpage.

</article>

<article id="hybrid-rendering">

## Hybrid Rendering:

Ajax + server-side rendering allows you to disable pushState at any time, enabling progressive enhancement. The way you render the server-side does not matter, it can be simple HTML fragments or even template views.

</article>

<article id="state-retention">

## State Retention:

When you reload or navigate through the history of the page, Senna will take you right back to the state of the screen that you previously viewed, including the same scroll placement.

</article>

<article id="ui-feedback">

## UI Feedback:

If you have large content on your page and it takes time to load, you can give your users feedback so they know the content will be fully loaded soon. Checkout [UI Feedback](/docs/features/uiFeedback.html) to learn how to enable this feature in your app. 

</article>

<article id="pending-nav">

## Pending Navigation:

To prevent multiple portions of your site from loading at different speeds, you can block UI rendering until the data is fully loaded so that all the content will display at once. In this situation, UI Feedback is a great tool to make sure your users know the content is coming. 

</article>

<article id="timeout">

## Timeout Detection:

Senna.js will timeout if the request takes too long to load or if the user navigates to a different link while another request is pending. If an error occurs, Senna is already setup with [Error Handling](/docs/features/errorHandling.html).

</article>

<article id="history-nav">

## History Navigation:

By using History API, you can manipulate the browser history to use the browser's back and forward buttons.

</article>

<article id="cacheable-screens">

## Cacheable Screens: 

Once you load a certain surface, this content is cached in memory and will be retrieved later on without any additional request to the server.

</article>

<article id="prm">

## Page Resources Management: 

Evaluate scripts and stylesheets from dynamic loaded resources. Additional content loaded using XMLHttpRequest can be appended to the DOM. For security reasons some browsers will not evaluate `<script>` tags from the new fragment, so the SPA engine should handle extracting scripts from the content and parsing them, respecting the browser contract for loading scripts.

</article>

