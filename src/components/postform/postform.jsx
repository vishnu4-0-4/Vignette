import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import service from "../../appwrite/config";
import Input from "../input";
import Button from "../button";
import Select from '../select';
import RTE from "../RTE";

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
      slug: post?.slug || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (data) => {
    setError("");
    setSubmitting(true);
    try {
      if (post) {
        const file = data.image?.[0]
          ? await service.uploadFile(data.image[0])
          : null;

        if (file) {
          await service.deleteFile(post.featuredImage);
        }

        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        } else {
          setError("Update failed. Please try again.");
        }
      } else {
        const file = await service.uploadFile(data.image[0]);

        if (file) {
          const dbPost = await service.createPost({
            ...data,
            featuredImage: file.$id,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          } else {
            setError("Post creation failed. Please try again.");
          }
        } else {
          setError("Image upload failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("PostForm submit error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-y-4">
      <div className="w-full lg:w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Enter title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-full lg:w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4 overflow-hidden rounded-lg border border-gray-200">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          className="w-full"
          bgColor={post ? "bg-green-600" : undefined}
          disabled={submitting}
        >
          {submitting ? "Saving..." : post ? "Update" : "Submit"}
        </Button>

        {error && (
          <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    </form>
  );
};

export default PostForm;