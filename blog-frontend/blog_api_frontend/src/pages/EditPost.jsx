import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API, { getUsername } from '../api/axios';

export default function EditPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await API.get(`/posts/${id}/`);
                setTitle(res.data.title);
                setContent(res.data.content);
                setLoading(false);
            } catch (err) {
                console.log('Fetch error:', err.response?.data);
                setError('Failed to load post!');
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/posts/${id}/`, {
                title: title.trim(),
                content: content.trim(),
                author: getUsername()
            });
            navigate('/');
        } catch (err) {
            console.log('Update error:', err.response?.data);
            setError(JSON.stringify(err.response?.data));
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2>Edit Post</h2>
                    <Link to="/" style={styles.backBtn}>← Back</Link>
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        style={styles.textarea}
                        placeholder="Post content..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={8}
                    />
                    <button style={styles.button} type="submit">
                        Update Post
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: { maxWidth: '800px', margin: '0 auto', padding: '20px' },
    card: { background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    backBtn: { color: '#2196F3', textDecoration: 'none' },
    input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' },
    button: { width: '100%', padding: '10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' },
    error: { color: 'red', marginBottom: '10px', padding: '10px', background: '#ffe0e0', borderRadius: '5px' },
};