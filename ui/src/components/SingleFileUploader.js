import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Papa from 'papaparse';

const BACKEND_API = 'http://localhost:3000';

const SingleFileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    // We will fill this out later
    console.log(file); // POST TO your backed here


    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete:  async function (results) {
        console.log(results.data);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(results.data)
        };
        const res = fetch(`${BACKEND_API}/Products`, requestOptions)
        console.log(await res);
      }
    });
  }


  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <div>
            <p>Name: {file.name}</p>
            <p>Type: {file.type}</p>
            <p>Size: {file.size} bytes</p>
          </div>
        </section>
      )}

      {file && (
        <Button
          onClick={handleUpload}
          className="submit"
        >Process CSV data file</Button>
      )}
    </>
  );
};

export default SingleFileUploader;