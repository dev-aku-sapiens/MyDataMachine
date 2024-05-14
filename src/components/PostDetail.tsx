import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RecordsProps } from '../types/post-types';

interface PostDetailProps {
  postId: number;
  onClose: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ postId, onClose }) => {
  const [post, setPost] = useState<RecordsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get<RecordsProps>(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPost(response.data);
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

  useEffect(() => {
    console.log('PostDetail re-rendered');
  }, [postId]);

  if (loading)
    return (
      <div className='flex justify-center items-center h-full'>
        <div className='spinner' />
      </div>
    );

  if (!loading)
    return (
      <div className='p-4 border rounded shadow-sm'>
        <h2 className='text-xl font-bold'>Post Details</h2>
        <p>
          <strong>ID:</strong> {post?.id}
        </p>
        <p>
          <strong>Title:</strong> {post?.title}
        </p>
        <p>
          <strong>Body:</strong> {post?.body}
        </p>
        <button
          onClick={onClose}
          className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
        >
          Close
        </button>
      </div>
    );
};

export default PostDetail;
