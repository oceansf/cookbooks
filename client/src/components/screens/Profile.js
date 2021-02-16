import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";
import Nav from "../Nav";

const ProfileWrapper = styled.div`
  width: 975px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem 0;
  border-bottom: 1px solid lightgrey;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const ProfilePicture = styled.img`
  height: 140px;
  width: 140px;
  border-radius: 99px;
  object-fit: cover;

  @media only screen and (max-width: 600px) {
    width: 77px;
    height: 77px;
  }
`;

const ProfileImageUpload = styled.input`
  color: rgba(0, 0, 0, 0);
  width: 131px;
  padding: 0;
  margin: 1rem;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
  :before {
    color: black;
    content: "Edit Profile Image";
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
  :hover::before {
    border-color: black;
  }
  :active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`;

const ProfileInfo = styled.section`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    align-items: center;
  }
`;

const ProfileStats = styled.section`
  display: flex;
  margin: 1rem 0;
`;

const Gallery = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.25rem;
  justify-items: center;
  padding-top: 0.5rem;
`;

const Image = styled.div`
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  :hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {
    width: 123px;
    height: 123px;
  }
`;

const Profile = () => {
  const [mypics, setMyPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setMyPics(result.myposts);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "cnq");
      fetch("https://api.cloudinary.com/v1_1/oceansf/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATE_PIC", payload: result.pic });
              window.location.reload();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //eslint-disable-next-line
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <React.Fragment>
      <Nav />
      {state ? (
        <ProfileWrapper>
          <ProfileHeader>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ProfilePicture
                src={state ? state.pic : "Loading..."}
                alt="profile-pic"
              />
              <ProfileImageUpload
                type="file"
                onChange={(e) => updatePhoto(e.target.files[0])}
              />
            </div>
            <ProfileInfo>
              <h2 style={{ fontSize: "35px", fontWeight: "500" }}>
                {state ? state.name : "loading"}
              </h2>
              <ProfileStats>
                <div style={{ marginRight: "1rem" }}>
                  <h3 style={{ fontWeight: "400" }}>
                    <span style={{ fontSize: "1rem", fontWeight: "600" }}>
                      {mypics.length}
                    </span>{" "}
                    {mypics.length === 1 ? "post" : "posts"}
                  </h3>
                </div>
                <div style={{ marginRight: "1rem" }}>
                  <h3 style={{ fontWeight: "400" }}>
                    <span style={{ fontSize: "1rem", fontWeight: "600" }}>
                      {state.followers.length > 0
                        ? state.followers.length
                        : "0"}
                    </span>{" "}
                    {state.followers.length === 1 ? "follower" : "followers"}
                  </h3>
                </div>
                <div style={{ marginRight: "1rem" }}>
                  <h3 style={{ fontWeight: "400" }}>
                    <span style={{ fontSize: "1rem", fontWeight: "600" }}>
                      {state.followers.length > 0
                        ? state.followers.length
                        : "0"}
                    </span>{" "}
                    following
                  </h3>
                </div>
              </ProfileStats>
            </ProfileInfo>
          </ProfileHeader>
          <Gallery>
            {mypics.map((post) => (
              <Image image={post.photo} key={post.title}></Image>
            ))}
          </Gallery>
        </ProfileWrapper>
      ) : (
        <h4>Loading...</h4>
      )}
    </React.Fragment>
  );
};

export default Profile;
