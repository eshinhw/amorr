import asyncHandler from 'express-async-handler';

import Post from '../models/postModel.js';

// @desc get posts
// @route GET /api/posts
// @access Private
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

// @desc post posts
// @route POST /api/posts
// @access Private
const postPosts = asyncHandler(async (req, res) => {

  let tmp = req.body;
  if (!tmp.postText) {
    res.status(400);
    throw new Error('add new postText');
  }

  const post = await Post.create({
    postText: tmp.postText,
    provider_name: req.provider.name,
    provider_id: req.provider.id
  });

  res.status(200).json(post);

});

// @desc update post
// @route PUT /api/posts/:id
// @access Private
// only owner can update their own post
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  //check if user exists
  if (!req.provider) {
    res.status(401);
    throw new Error('provider not found');
  }

  // compare owner identity using id
  if (post.provider_id.toString() !== req.provider.id) {
    res.status(401);
    throw new Error('not authorized, (provider is now the one posted)');
  }

  const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.status(200).json(updatePost);
});

// @desc delete post
// @route DELETE /api/posts/:id
// @access Private
// only owner can delete their own post
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  //check if user exists
  if (!req.provider) {
    res.status(401);
    throw new Error('provider not found');
  }

  // compare owner identity using id
  if (post.provider_id.toString() !== req.provider.id) {
    res.status(401);
    throw new Error('not authorized, (provider is now the one posted)');
  }

  await post.remove();

  res.status(200).json({ id: req.params.id });
});

export { getAllPosts, postPosts, updatePost, deletePost };