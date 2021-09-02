
import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/Posts';
import PostLoadingComponent from './components/PostLoading';

function App() {

    // higher order component 
    // run this post loading component first - check the state first
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: false,
        posts: null,
    });

    // DidMount + DidUpdate
    useEffect(() => {
        setAppState({ loading: true });
        const apiUrl = `http://127.0.0.1:8000/api/stock`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              console.log(data[0])
              setAppState({ loading: false, posts: data });
          });
    }, [setAppState]);
  
    return (
        <div className="App">
            <h1>Latest Posts</h1>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}

export default App;
