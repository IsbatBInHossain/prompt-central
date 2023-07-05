'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
      localStorage.setItem('posts', JSON.stringify(data)); // Store posts in local storage
    };

    // Check local storage for stored posts on initial mount
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }

    if (!storedPosts && session?.user.id) {
      fetchPosts();
    }
  }, [session]);

  const handleEdit = post => {
    router.push(`update-prompt?id=${post._id}`);
  };

  const handleDelete = async post => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter(item => item._id !== post._id);
        setPosts(filteredPosts);
        localStorage.setItem('posts', JSON.stringify(filteredPosts)); // Update stored posts in local storage
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
