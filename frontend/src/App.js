import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    axios.get('/index.html')
      .then(response => setHtmlContent(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default App;
