const Home = () => {
    const handleOAuth = () => {
        window.location.href = 'http://localhost:8000/zoom/redirect/';
    };
    
    return (
        <div>
            <h1>Hiiiiiiiiiiiiiiiiiiii</h1>
            <button onClick={handleOAuth}>Connect to Zoom</button>
        </div>
    );
}

export default Home;