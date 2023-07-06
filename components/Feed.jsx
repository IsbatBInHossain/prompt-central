'use client';
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map(post => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  // filter Username
  const filterByUsername = (data, text) => {
    return data.filter(post =>
      post?.creator.username.includes(text.toLowerCase())
    );
  };
  // filter by Tags
  const filterByTag = (data, tag) => {
    return data.filter(post => post?.tag.includes(tag.toLowerCase()));
  };

  const searchPosts = text => {
    const data = JSON.parse(localStorage.getItem('allPosts'));
    const nameFilteredPosts = filterByUsername(data, text);
    const tagFilteredPosts = filterByTag(data, text);
    const concatedPosts = nameFilteredPosts.concat(tagFilteredPosts);
    const filteredPosts = [...new Set(concatedPosts)];
    setPosts(filteredPosts);
  };

  const handleSearch = e => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
    searchPosts(searchTerm);
  };

  const handleTagClick = tag => {
    const tagText = tag.replace('#', '');
    setSearchText(tagText);
    const data = JSON.parse(localStorage.getItem('allPosts'));
    const tagFilteredPosts = filterByTag(data, tagText);
    setPosts(tagFilteredPosts);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch('api/prompt');
      const data = await res.json();
      setPosts(data);
      localStorage.setItem('allPosts', JSON.stringify(data));
    })();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearch}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
