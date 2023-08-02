import React from "react";

const NweetFactory = () =>{
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