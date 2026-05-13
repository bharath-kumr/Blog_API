import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.logoText}>📝 BlogApp</Link>
            </div>
            <div style={styles.links}>
                {token ? (
                    <>
                        <Link to="/" style={styles.link}>Home</Link>
                        <Link to="/create" style={styles.link}>+ New Post</Link>
                        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" style={styles.link}>Login</Link>
                )}
            </div>
        </nav>
    );
}

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#2c3e50', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' },
    logo: { display: 'flex', alignItems: 'center' },
    logoText: { color: 'white', textDecoration: 'none', fontSize: '22px', fontWeight: 'bold' },
    links: { display: 'flex', alignItems: 'center', gap: '15px' },
    link: { color: 'white', textDecoration: 'none', fontSize: '15px', padding: '6px 12px', borderRadius: '5px', background: 'rgba(255,255,255,0.1)' },
    logoutBtn: { color: 'white', background: '#e74c3c', border: 'none', padding: '6px 14px', borderRadius: '5px', cursor: 'pointer', fontSize: '15px' },
};