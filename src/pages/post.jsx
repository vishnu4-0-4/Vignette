import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

import Service from "../appwrite/config";
import Button from "../components/button";
import Container from "../components/container";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post?.userId === userData?.$id;

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      setLoading(true);
      const fetchedPost = await Service.getPost(id);

      if (fetchedPost) {
        setPost(fetchedPost);
      } else {
        navigate("/");
      }
      setLoading(false);
    };

    fetchPost();
  }, [id, navigate]);

  const deletePost = async () => {
    const status = await Service.deletePost(post.$id);

    if (status) {
      await Service.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <Container>
          <div className="mb-4 aspect-video w-full animate-pulse rounded-xl bg-gray-200" />
          <div className="mb-6 h-8 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
        </Container>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="py-8">
      <Container>
        <div className="relative mb-6 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
          <img
            src={Service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full max-h-[480px] object-cover"
          />

          {isAuthor && (
            <div className="absolute right-4 top-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-600">Edit</Button>
              </Link>
              <Button bgColor="bg-red-600" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        </div>

        <div className="prose prose-gray max-w-none">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  );
};

export default Post;