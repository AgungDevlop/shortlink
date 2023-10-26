import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import './App.css'; // Import your CSS file

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <h1>Redirect...</h1>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>Not Found 404</h1>
    </div>
  );
};

const RedirectComponent = () => {
  const { parameter } = useParams();
  const [redirectData, setRedirectData] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/AgungDevlop/React/contents/url.json')
      .then(response => response.json())
      .then(data => {
        const content = atob(data.content);
        setRedirectData(JSON.parse(content));
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error);
      });
  }, []);

  if (!redirectData) {
    return <Loading />;
  }

  const redirectItem = redirectData.find(item => item[parameter]);

  if (!redirectItem) {
    return <Navigate to="/not-found" />;
  }

  const targetUrl = redirectItem[parameter];

  window.location.href = targetUrl;

  return null;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:parameter" element={<RedirectComponent />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
