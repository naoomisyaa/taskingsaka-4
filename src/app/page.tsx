// src/app/posts/page.tsx
"use client";
import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost, updatePost, selectPostById } from "@/redux/slices/postSlice";
import styles from "./page.module.css";
import { useState } from "react";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [selectedPost, setSelectedPost] = useState<any>(null);

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

    setTitle("");
    setDescription("");
  };

  const handleRemovePost = (postId: number) => {
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

    setEditMode(false);
    setEditPostId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSelectPost = (postId: number) => {
    const post = selectPostById({ posts }, postId);
    setSelectedPost(post);
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
      {selectedPost && (
        <div className={styles.selectedPost}>
          <h1><strong>Post Details</strong></h1>
          <p><strong>Title:</strong> {selectedPost.title}</p>
          <p><strong>Description:</strong> {selectedPost.description}</p>
        </div>
      )}
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
            <button
              className={styles.editButton}
              onClick={() => handleSelectPost(post.id)}
            >
              View Details
            </button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
