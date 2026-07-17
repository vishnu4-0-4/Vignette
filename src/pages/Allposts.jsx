import React, { useEffect, useState } from "react";
import Service from "../appwrite/config";
import Container from "../components/container";
import PostCard from "../components/postCard";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const allPosts = await Service.getPosts();
      if (allPosts) {
        setPosts(allPosts.documents);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-10">
      <Container>
        <h1 className="mb-8 text-2xl font-semibold text-gray-900">All Posts</h1>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video w-full rounded-xl bg-gray-200" />
                <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-gray-900">No posts yet</p>
            <p className="mt-1 text-sm text-gray-500">
              Check back later for new content.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllPosts;