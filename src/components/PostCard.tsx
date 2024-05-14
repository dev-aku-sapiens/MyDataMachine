import React from 'react';
import { RecordsProps } from '../types/post-types';

interface PostCardProps {
  onClick: (postId: number) => void;
  post: RecordsProps & { computed: string };
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <div className='border p-4 rounded shadow-sm'>
      <p>
        <strong>ID:</strong> {post.id}
      </p>
      <p>
        <strong>Title:</strong> {post.title}
      </p>
      <p>
        <strong>Body:</strong> {post.body}
      </p>
      <p>
        <strong className='text-rose-700'>Computed Body:</strong>{' '}
        {post.computed}
      </p>
      <button
        onClick={() => onClick(post.id)}
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
      >
        View Details
      </button>
    </div>
  );
};

export default PostCard;
