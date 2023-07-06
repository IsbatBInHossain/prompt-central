'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const OtherProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const path = usePathname().replace('/profile/', '').toString();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${path}/posts`);
      const data = await res.json();
      setPosts(data);
      setName(data[0]?.creator.username);
    };
    fetchPosts();
  }, [path]);

  return (
    <Profile
      name={`${name}'s`}
      desc={`Welcome to ${name}'s profile page`}
      data={posts}
    />
  );
};

export default OtherProfilePage;
