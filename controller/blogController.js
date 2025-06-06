const supabase = require("../config/db");

const getBlogs = async (req, res) => {
  try {
    const { data, error } = await supabase.from("blogs").select("*");
    if (error) return res.status(500).json({ error: error.message });

    console.log(data);
    return res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// add api
const addBlog = async (req, res) => {
  const { title, author, content, tags } = req.body;

  // validation
  if (!title || !author || !content) {
    return res.status(400).json({
      error: "Missing required fields: title, author, and content are required",
    });
  }

  try {
    const { data, error } = await supabase
      .from("blogs")
      .insert([{ title, author, content, tags }])
      .select();
    if (error) return res.status(500).json({ error: error.message });

    return res
      .status(201)
      .json({ message: "Blog added successfully", data: data[0] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update api
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, author, content, tags } = req.body;

  // Validate required fields
  if (!title || !author || !content) {
    return res.status(400).json({
      error: "Missing required fields: title, author, and content are required",
    });
  }

  try {
    // check if the blog exists
    const { data: existingBlog, error: fetchError } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existingBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // update the blog
    const { data, error } = await supabase
      .from("blogs")
      .update({ title, author, content, tags })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      message: "Blog updated successfully",
      data: data[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete ki api
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getBlogs, addBlog, updateBlog, deleteBlog };
