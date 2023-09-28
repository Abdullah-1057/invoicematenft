import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Item from "./Item";
// import homeImage from "../../assets/home-image.png";
import Minter from "./Minter";
import CURRENT_USER_ID from "../index";
import { mate_backend } from "../../../declarations/mate_backend/index";
import Gallery from "./Gallery";
function App() {
  const [userOwnedGallery, setOwnedGallery] = useState();

  async function getNFTs() {
    const userNFTIds = await mate_backend.getOwnedNFTs(CURRENT_USER_ID);
    console.log(userNFTIds);
    setOwnedGallery(<Gallery title="My NFTs" ids={userNFTIds} />);
  }
  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <div className="App">
      <Header />
      <h1>O bhaiiii</h1>
      <hr />
      {/* <Item/> */}
      {/* <Minter/> */}
      {userOwnedGallery}
      <hr />
      {/* <img className="bottom-space" src={homeImage} /> */}
      <Footer />
    </div>
  );
}

export default App;
