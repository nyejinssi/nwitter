import React, { useEffect, useState } from 'react';
import { dbService, storageService } from '../fbase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({userObj}) =>{
    const [nweet, setNweet] = useState('');
    const [attachment, setAttachment] = useState('');
    

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = '';
        if (attachment !== '') {
          const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(attachmentRef, attachment, 'data_url');
          attachmentUrl = await getDownloadURL(response.ref);
        }
        await addDoc(collection(dbService, 'nweets'), {
          text: nweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          attachmentUrl,
        });
        setNweet('');
        setAttachment('');
      };
    
      const onChange = (event) => {
        event.preventDefault();
        const {
          target: { value },
        } = event;
        setNweet(value);
      };
    
      const onFileChange = (event) => {
        const {
          target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
          const {
            currentTarget: { result },
          } = finishedEvent;
          setAttachment(result);
        };
        reader.readAsDataURL(theFile);
      };
    
      const onClearAttachment = () => setAttachment('');

    return (
        <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} /><br/>
        <input type="submit" value="Nweet"/>
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="Attachment" />
            <button onClick={onClearAttachment}>삭제</button>
          </div>
        )}
      </form>
    )
}
export default NweetFactory;