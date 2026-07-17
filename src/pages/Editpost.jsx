import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Container from "../components/container";
import PostForm from "../components/postform/PostForm";
import Service from "../appwrite/config";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) {
                navigate("/");
                return;
            }

            const post = await Service.getPost(id);

            if (post) {
                setPost(post);
            } else {
                navigate("/");
            }
        };

        fetchPost();
    }, [id, navigate]);

    if (!post) {
        return null;
    }

    return (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    );
};

export default EditPost;