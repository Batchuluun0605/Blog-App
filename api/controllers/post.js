import { postModel } from "../model/post.js";
export const getPosts = async (req, res) => {
  try {
    const cat = req.query.cat;
    const result = cat
      ? await postModel.find({ cat: { $gte: cat } })
      : await postModel.find();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await postModel.findById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const addPost = async (req, res) => {
  try {
    const { title, desc, img, cat } = req.body;
    await postModel.create({ title, desc, img, cat });
    return res.status(200).json("post has been created");
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json("not Authenticated");
    }
    const id = req.params.id;
    await postModel.findByIdAndDelete(id);
    return res.status(200).json("deleted");
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, desc, img, cat } = req.body;
    await postModel.findByIdAndUpdate(id, { title, desc, img, cat });
    res.status(200).json("Post has been updated");
  } catch (error) {
    console.log(error);
  }
};
