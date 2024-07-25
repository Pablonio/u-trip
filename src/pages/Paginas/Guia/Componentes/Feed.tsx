import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
interface Post {
  id: number;
  content: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleNewPost = async () => {
      try {
        const idUsuario = Cookies.get('idUsuario') || '1'; // Default to '1' if undefined
        const id = parseInt(idUsuario, 10);
        const response = await axios.post('/api/Publicacion/crearPublicacion', {
          idUsuario: id,
          tituloPost: newPostTitle,
        });

        console.log('Respuesta:', response.data);
        const data = response.data;
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    handleNewPost();
  }, [page]);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const handleNewPost = async () => {
    try {
      const res = await fetch('/api/crearPublicacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idUsuario: 1, tituloPost: newPostTitle }), // Adjust idUsuario as needed
      });
      const data = await res.json();
      if (data.success) {
        setPosts([data.response, ...posts]);
        setNewPostTitle('');
        setIsModalOpen(false);
      } else {
        console.error('Error creating new post:', data.error);
      }
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 overflow-y-scroll h-screen">
      <div
        className="bg-white p-4 mb-4 shadow rounded cursor-pointer flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="text-2xl">+</span>
        <span className="ml-2">Nueva Publicación</span>
      </div>
      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={posts.length === index + 1 ? lastPostElementRef : null}
          className="bg-white p-4 mb-4 shadow rounded"
        >
          {post.content}
        </div>
      ))}
      {!hasMore && <p>No more posts</p>}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="mb-4 text-lg">Crear Nueva Publicación</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows={4}
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleNewPost}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


