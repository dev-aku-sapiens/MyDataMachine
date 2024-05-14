import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios, { AxiosResponse } from 'axios';

import { RecordsProps } from './types/post-types';

import Spinner from './components/Spinner';
import Pagination from './components/Pagination';

import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';

const App: React.FC = () => {
  const [posts, setPosts] = useState<RecordsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<RecordsProps[]> = await axios.get<
          RecordsProps[]
        >(
          `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`
        );
        setPosts(response.data);
        const totalPosts = parseInt(response.headers['x-total-count'], 10);
        setTotalPages(Math.ceil(totalPosts / postsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const heavyComputation = useCallback((data: string): string => {
    console.time('Heavy Computation');
    const result = data.split('').reverse().join('');
    console.timeEnd('Heavy Computation');

    return result;
  }, []);

  const computedPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      computed: heavyComputation(post.body),
    }));
  }, [posts, heavyComputation]);

  const handlePostClick = useCallback((postId: number) => {
    setSelectedPost(postId);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='p-4 w-full flex flex-col items-center max-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Posts</h1>
      <div className='w-full flex flex-col lg:flex-row lg:space-x-8 min-h-[80vh] border p-4 rounded shadow-sm'>
        <div className='w-full lg:w-1/2 overflow-y-auto scroll-container'>
          {loading ? (
            <Spinner />
          ) : (
            <div className='space-y-4'>
              {computedPosts.map((post) => (
                <PostCard
                  post={post}
                  onClick={handlePostClick}
                  key={post.title + post.userId}
                />
              ))}
            </div>
          )}
        </div>

        <div className='w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0'>
          {selectedPost && (
            <PostDetail
              postId={selectedPost}
              onClose={() => setSelectedPost(null)}
            />
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onClick={handlePageChange}
      />
    </div>
  );
};

export default App;
