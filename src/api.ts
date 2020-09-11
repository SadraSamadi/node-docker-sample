import {Router} from 'express';
import faker from 'faker';
import {Post} from './post';

const api = Router();

api.post('/', async (req, res) => {
  let post = new Post();
  post.title = req.body.title || faker.name.title();
  post.body = req.body.body || faker.lorem.paragraph();
  await post.save();
  res.json(post);
});

api.get('/', async (req, res) => {
  let posts = await Post.find();
  res.json(posts);
});

api.get('/:id', async (req, res) => {
  let post = await Post.findOne(req.params.id);
  res.json(post);
});

api.patch('/:id', async (req, res) => {
  let post = await Post.findOne(req.params.id);
  post.title = req.body.title;
  post.body = req.body.body;
  await post.save();
  res.json(post);
});

api.delete('/:id', async (req, res) => {
  let post = await Post.findOne(req.params.id);
  await post.remove();
  res.end();
});

export default api;
