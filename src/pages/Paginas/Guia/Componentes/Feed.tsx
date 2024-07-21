import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  content: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Aquí puedes cargar tus publicaciones desde una API o base de datos.
    const fetchedPosts: Post[] = [
      { id: 1, content: 'Post 1' },
      { id: 2, content: 'Post 2' },
      { id: 3, content: 'Post 3' },
    ];
    setPosts(fetchedPosts);
  }, []);

  return (
    <div className="flex-1 bg-gray-50 p-4 overflow-y-scroll h-screen">
      {posts.map(post => (
        <div key={post.id} className="bg-white p-4 mb-4 shadow rounded">
          {post.content}
        </div>
      ))}
    </div>
  );
};

export default Feed;
