'use client'

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '@/types';
import { updatePosts } from '@/utils';

const PostForm: React.FC = () => {
  // Define the state for the form fields
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const params = useParams()
  const {userId} = params

  const queryClient = useQueryClient()

  // Use the mutation
  const mutation = useMutation(updatePosts, {
    // Optimistically update the UI before the mutation request is done
    onMutate: async (newPost: Post) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['posts', userId] })

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Post[]>(['posts', userId])

      // Optimistically update to the new value
      queryClient.setQueryData(['posts', userId], (oldPosts: Post[] | undefined) => [
        ...(oldPosts || []),
        newPost,
      ])

      // Return a context with the previous and new todo
      return { previousPosts, newPost }
    },
    // If the mutation fails, use the context we returned above
    onError: async (err, newPost, context) => {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.error('An error occurred while creating the post. Please try again.');

      queryClient.setQueryData(
        ['posts', userId],
        context?.previousPosts,
      )
    },
    // Always refetch after error or success:
    onSettled: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts', newPost?.userId] })
    },
  })

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    const newPost: Post = {
      id: Math.floor((Math.random() * 1000000) + 1),
      title,
      body,
      userId: Number(userId),
    }
    
    // Trigger the mutation
    mutation.mutate(newPost);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-8 w-full space-y-4 bg-base-100 rounded-xl"
    >
      {/* Title Input */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Body Textarea */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Body</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="textarea textarea-bordered"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="btn btn-neutral btn-block"
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;
