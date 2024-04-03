const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/coding-blog");
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

app.post("/api/blogs", async (req, res) => {
  const { title, content } = req.body;
  const newBlog = new Blog({ title, content });

  await newBlog.save();
  res.json(newBlog);
});

app.put("/api/blogs/:id", async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.findById(req.params.id);
  blog.title = title;
  blog.content = content;
  await blog.save();
  res.json(blog);
});
