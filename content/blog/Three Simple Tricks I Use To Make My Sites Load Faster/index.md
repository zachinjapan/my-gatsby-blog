---
title: Three Simple Tricks I Use To Make My Sites Load Faster
date: "2022-02-22"
description: "Learn about how to increase the speed of your site."
tags: ["web development", "backend-development"]
---

I love optimizing my page's load time.

<img src="https://media.giphy.com/media/vLUhsxMfdVfS8/giphy.gif" width = "50%">

Here are some tricks I use.

## 1. Compress Images

I usually compress my images. Especially images that are used as thumbnails.

I use [tinypng](https://tinypng.com), but other websites exist.

I have seen portfolio websites where the only reason it takes 5-10 seconds to load is that many high-quality images are used as thumbnails!!

Not good.

## 2. Watch the Network Activity.

Recently I ran my portfolio website on Chrome, checking the network activity tab.

<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/07mcrjowp0pxv436g6dm.png" width="100%" alt = "404 missing image">

Uh oh!!! That 404 (bad request) is costing me 40ms on every load!

I updated the image URL and saved 40ms!

<img src = "https://media.giphy.com/media/3oz8xBmTULwn1QSNgI/giphy.gif" width = "50%">

## 3. Use Lazy Loading

My blog posts on my portfolio are displayed as gifs.... gifs can be costly to load!

Here is what the page loads like with the gifs rendered with your regular img tag

<img src = "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/65utkl9qbia1cuj81hja.png" width = "100%" alt = "google chrome network tab">

<br/>

The load time is

<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s85lzk3ct2vk84szudnc.png" width="50%" alt = "google chrome network tab">

Those gifs are blocking the site's initial load. All of that for images that the user will not see until much farther down the page.

Let's add lazy loading.

```
// react component
 <CardMedia
 ... some react stuff ...
 loading="lazy"
 />

```

Watch as the images load once the user reaches them.

<img src = "https://media.giphy.com/media/I69J6ecR0a2g8tzCe3/giphy.gif" width = "100%">

## But what about the load time?

<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qo678y05pi4tvjg39ut2.png" width="100%" alt = "google chrome network tab">

## The result is

<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e9zf1fiixq2bnf31le01.png" width="50%" alt = "google chrome network tab">

<img src = "https://media.giphy.com/media/F0XPSvNDyGpos/giphy.gif" width = "50%">

## What do you think?

Did you enjoy this post?

Or did I get something wrong?

Feel free to contact me using my [website](https://zstone.dev)

Have a fantastic day!
