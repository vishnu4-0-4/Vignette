import React, { useEffect, useState } from "react";
import Service from "../appwrite/config";
import Container from "../components/container";
import PostCard from "../components/postCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await Service.getPosts();
      if (response) {
        setPosts(response.documents);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-10">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video w-full rounded-xl bg-gray-200" />
                <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-24">
        <Container>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Login to read posts
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to see the latest content from BlogNest.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-10">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;