import React, { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Nweet from '../components/Nweet';
import { dbService, storageService } from '../fbase';
import NweetFactory from '../components/NweetFactory';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(dbService, 'nweets'), (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj}/>
      <div>
        {nweets.map((nweet) => (
          <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
