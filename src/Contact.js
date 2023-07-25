import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const Contact = () => {
  const downloadFile = () => {
    const apiUrl = 'http://localhost:4000/downloadfile'; // Replace with your API endpoint

    // Make a GET request to the API to download the file
    axios({
      url: apiUrl,
      method: 'GET',
      responseType: 'blob', // Set the response type to 'blob' to handle binary data
    })
      .then((response) => {
        // Create a temporary URL to download the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'filename.ext'); // Set the desired file name and extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
      });
  };

  return (
    <div>
       <button onClick={downloadFile}>Download File</button>
    </div>
  )
}

export default Contact