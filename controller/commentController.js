const supabase = require("../config/db");

const addComment = async (req, res) => {
  const { id } = req.params;
  const { comments } = req.body;

  try {
    if (!comments || !comments.trim()) {
      return res.status(400).json({ error: "Comment text is required" });
    }

    const { data: existingBlogs, error: fetchError } = await supabase
      .from("blogs")
      .select("comments")
      .eq("id", id);

    if (fetchError || existingBlogs.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const oldComments = existingBlogs[0].comments || "";
    const newComments = oldComments
      ? `${oldComments},${comments.trim()}`
      : comments.trim();

    const { data, error } = await supabase
      .from("blogs")
      .update({ comments: newComments })
      .eq("id", id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Comment added successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addComment };