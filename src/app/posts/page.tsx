"use client";
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost, updatePost } from "../../redux/slices/postSlice";
import styles from "./page.module.css";
import { useState } from "react";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const posts = useSelector((state: any) => state.posts);
  const dispatch = useDispatch();

  const handleAddPost = (e: any) => {
    e.preventDefault();

    if (!title && !description) return;

    const newPost = {
      id: Date.now(),
      title,
      description,
    };

    dispatch(addPost(newPost));

    // Reset form fields
    setTitle("");
    setDescription("");
  };

  const handleRemovePost = (postId: any) => {
    dispatch(deletePost(postId));
  };

  const handleEdit = (post: any) => {
    setEditMode(true);
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditDescription(post.description);
  };

  const handleUpdatePost = (e: any) => {
    e.preventDefault();

    if (!editTitle && !editDescription) return;

    const updatedPost = {
      id: editPostId,
      title: editTitle,
      description: editDescription,
    };

    dispatch(updatePost(updatedPost));

    // Reset edit mode
    setEditMode(false);
    setEditPostId(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={editMode ? handleUpdatePost : handleAddPost}>
        <p className={styles.formTitle}>{editMode ? "Edit Post" : "Add New Post"}</p>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            placeholder="Title"
            value={editMode ? editTitle : title}
            onChange={(e) => (editMode ? setEditTitle(e.target.value) : setTitle(e.target.value))}
          />
        </div>
        <div className={styles.inputContainer}>
          <textarea
            placeholder="Description"
            value={editMode ? editDescription : description}
            className={styles.input}
            onChange={(e) => (editMode ? setEditDescription(e.target.value) : setDescription(e.target.value))}
          ></textarea>
        </div>
        <button className={styles.submit} type="submit">
          {editMode ? "Update Post" : "Add New Post"}
        </button>
      </form>
      <h1 className={styles.heading}>Posts</h1>
      {posts ? (
        posts.map((post: any) => (
          <div key={post.id} className={styles.post}>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.description}>{post.description}</p>
            <button
              className={styles.deleteButton}
              onClick={() => handleRemovePost(post.id)}
            >
              Delete
            </button>
            <button
              className={styles.editButton}
              onClick={() => handleEdit(post)}
            >
              Edit
            </button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
