import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [songdata, setSongData] = useState([]);
  const [songinput, setSongInput] = useState("");

  const Song_Data = async (name) => {
    const url = `https://saavn.me/search/songs?query=${name}&limit=200`;
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data.data.results);
        setSongData(response.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleclick = () => {
    Song_Data(songinput);
  };

  const handlechange = (e) => {
    setSongInput(e.target.value);
  };

  useEffect(() => {
    Song_Data();
  }, []);
  return (
    <div>
      
      <div className="searching-song">
        <h3>Song Downloader</h3>
        <input
          type="search"
          className="songname"
          placeholder="Enter the Song Name"
          onChange={handlechange}
        />
        <button className="song-btn" onClick={handleclick}>
          Search
        </button>
      </div>

      <div className="display-song">
        {songdata?.map((items) => (
          <>
            <div className="container">
              <div className="content">
                <div className="song-title">
                  <h1>{items?.label}</h1>
                </div>
                <div className="song-pic">
                  <img src={items?.image[1]?.link} alt="" />
                </div>
                <div className="songplaying">
                  <audio
                    className="audiosong"
                    src={items?.downloadUrl[4]?.link}
                    controls
                    type="mp3/mpeg"
                  />
                </div>
              </div>
            </div>
          </>
        ))}
      </div> 
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1146878428958065"
     crossorigin="anonymous"></script> 
    </div>

  );
};

export default Home;
