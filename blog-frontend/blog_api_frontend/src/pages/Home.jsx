import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await API.get('posts/');
            setPosts(res.data);
        } catch (err) {
            navigate('/login');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await API.delete(`posts/${id}/`);
            fetchPosts();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>📝 Blog Posts</h1>
                <div>
                    <Link to="/create" style={styles.createBtn}>+ New Post</Link>
                    <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                </div>
            </div>
            {posts.length === 0 ? (
                <p style={styles.empty}>No posts yet. Create your first post!</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} style={styles.card}>
                        <h2 style={styles.postTitle}>{post.title}</h2>
                        <p style={styles.content}>{post.content.substring(0, 150)}...</p>
                        <div style={styles.actions}>
                            <Link to={`/edit/${post.id}`} style={styles.editBtn}>Edit</Link>
                            <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

const styles = {
    container: { maxWidth: '800px', margin: '0 auto', padding: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { color: '#333' },
    createBtn: { background: '#4CAF50', color: 'white', padding: '8px 16px', borderRadius: '5px', textDecoration: 'none', marginRight: '10px' },
    logoutBtn: { background: '#f44336', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none', cursor: 'pointer' },
    card: { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '15px' },
    postTitle: { color: '#333', marginBottom: '10px' },
    content: { color: '#666', marginBottom: '15px' },
    actions: { display: 'flex', gap: '10px' },
    editBtn: { background: '#2196F3', color: 'white', padding: '6px 14px', borderRadius: '5px', textDecoration: 'none' },
    deleteBtn: { background: '#f44336', color: 'white', padding: '6px 14px', borderRadius: '5px', border: 'none', cursor: 'pointer' },
    empty: { textAlign: 'center', color: '#999', fontSize: '18px', marginTop: '50px' },
};