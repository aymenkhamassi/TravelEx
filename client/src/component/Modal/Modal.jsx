import React, { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";




const Modal = (_id, e) => {
  _id = _id['_id']

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [post, setPost] = useState([])
  const [loaded, setLoaded] = useState(false);
  const [com, setCom] = useState([])

  useEffect(() => {

    axios
      .get("http://localhost:8000/api/Post/" + _id)
      .then((res) => {
        setPost(res.data);
        setLoaded(true);
        console.log("resdata=", res.data);

      })
      .catch((err) => console.error(err));
  }, [loaded]);

  const hideModal = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
  };


  

  return (
    <>
      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-btn" onClick={hideModal}>
              &times;
            </span>
            <p>

              <div className='postModal'>
                <>
                  <img src={post.image} alt="image_post" className='post_image' />
                </>
                <div className="block2">
                  <img src="user-icon.jpg" alt="image_user" className='user_image' />

                  <p className='pos_style'>
                    <img src="positionlogo.gif" alt="positionlogo" className='position' />
                    <p>{post.localisation}</p>
                  </p>
                  <p>{post.rating}</p>
                  <p>{post.content}</p>
                  <p>❤ {post.likes}</p>
                  <div className="Comments">

                    {post.comments ?
                      post.comments.map((com) => {
                        return (

                          <h5>{com.creatorUserName}</h5>,
                          <p>{com.comment}</p>
                        )
                      }) : null
                    }
                   
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
