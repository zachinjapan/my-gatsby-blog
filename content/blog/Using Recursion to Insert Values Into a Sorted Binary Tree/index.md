---
title: Using Recursion to Insert Values Into a Sorted Binary Tree
date: "2022-02-14"
description: "Learn about how to use recursion to insert values into a sorted binary tree"
tags: ["programming concepts", "javascript"]
---

## I have been playing around with sorted binary trees recently.

> In computer science, a binary search tree (BST), also called an ordered or sorted binary tree, is a rooted binary tree data structure whose internal nodes each store a key greater than all the keys in the node's left subtree and less than those in its right subtree. The time complexity of operations on the binary search tree is directly proportional to the height of the tree.

<img src = "https://media.giphy.com/media/qcy6cSzrtP7ybXvZvn/giphy.gif" width = "100%">

## My favorite part about binary trees is using recursion to travel down the nodes.

For the insert() method of my tree. I do 2 things

1. I check if the tree is empty if so I add the node.

2. I create a recursive function to travel down the tree and eventually add the new node if it hits the end of the branch (no more nodes)

## Let's get cracking!

## First part = check if the list is empty and if it is add a new node as the root and return

```
// node class for reference
class Node {
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null
  }
}
```

#Still with me?

Cool! so here's the fun part

```
    this.count++;
    //recursive call
    const searchTree = node => {
      // less than
      if (value < node.value) {
        if (!node.left) {
          node.left = newNode;
        } else {
          searchTree(node.left)
        }
      greater than
      } else if (value > node.value) {
        if (!node.right) {
          node.right = newNode;
        } else {
          searchTree(node.right);
        }
      }
    }
    //start of recursive call
    searchTree(this.root)

  }
```

Let's

<img src ="https://media.giphy.com/media/Qvps3j9alpsQSARLJk/giphy.gif">

We have the following tree

```

            31
        30
    20      29
10
    5
        4

```

## We want add 27

1st. we check if it is empty (it's not)
2nd we start the recursive call with the root (10)

## first call

if (27 < 10) ....false!

goes to else if (27 > 10) ...true!

## inside of else if

if (!10.right) false!!!
else {calls the recursive function but with 20}

## this continues till it hits 29 at which

if (27 < 29) ...true!
if (!node.right)....TRUE!!!!!
ok! we're done!

```
node.right = newNode;
```

<img src = "https://media.giphy.com/media/229OX0vSVNys10AZnS/giphy.gif" width = "100%">

## What do you think?

Did you enjoy this post?

Or did I get something wrong?

Feel free to contact me using my [website](https://zstone.dev)

Have a fantastic day!
