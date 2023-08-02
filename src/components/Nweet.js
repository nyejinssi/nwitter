import React, { useState } from 'react';
import { getFirestore, addDoc, doc, updateDoc, deleteDoc, getDocs, collection, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { dbService, authService, storageService } from "../fbase";
import { useNavigate } from "react-router-dom";
import { deleteObject, ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const [attachment, setAttachment] = useState("");
    const onDeleteClick = async () => {
    //if (ok) {
    //  await dbService.doc(`nweets/${nweetObj.id}`).delete();
    //  if (nweetObj.attachmentUrl !== '') {
    //    await deleteObject(ref(storageService, nweetObj.attachmentUrl));
    //  }}
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
            if(nweetObj.attachmentURL !== "") {
                await deleteDoc(doc(dbService, nweetObj.attachmentURL));
            }
        }
    };
  const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
        target: { value },
        } = event;
        setNewNweet(value);
        console.log(setNewNweet(value));
    };

  const onSubmit = async (event) => {
    event.preventDefault();
    //await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {text: newNweet});
    //setEditing(false);
    let attachmentURL = "";
    if (attachment !== ""){
        const attachmentRef = ref(storageService, `${isOwner.uid}/${uuidv4()}`);
        const response = await uploadString(attachmentRef, attachment, 'data_url');
    attachmentURL = await getDownloadURL(response.ref); }
    const updateContent = {
        text: newNweet,
        reviewimage: attachmentURL };

    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), updateContent);
    setEditing(false); 
    setAttachment("");
  };
    
    const onFileChange = (event) => {  // 사진 미리보기 만들기
    const { target: {files} } = event; 
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent)  => {
        const {
            currentTarget: {result}
        } = finishedEvent;
        setAttachment(result);
    };
    reader.readAsDataURL(theFile);
};
    const onClearAttachment = () => { 
        setAttachment("");
    };

    return (
    <div>
        {editing ? (
            <>
                <form onSubmit={onSubmit}>
                    수정하기
                    <input onChange={onChange} value={newNweet} required />
                    <input type="file" accept="image/*" onChange={onFileChange} style={{marginTop:"3%"}}/>
                    <input type="submit" value="수정" />
                </form>
                <button onClick={toggleEditing}>취소</button>
            </>
        ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentURL&& <img src={nweetObj.attachmentURL} width="50px" height="50px" alt="Attachment" />}
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>삭제</button>
                    <button onClick={toggleEditing}>수정</button>
                </>
            )}
            </>
        )}
        </div>
  );
};

export default Nweet;
