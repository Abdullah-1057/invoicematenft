import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory } from "../../../declarations/mate_backend_nft/index";
import { mate_backend_nft } from "../../../declarations/mate_backend_nft/index";
function Item(props) {
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();
  const [imageDataURL, setImageDataURL] = useState('');
  console.log(props.id);

  const id = Principal.fromText(props.id);
  // const id = "cldba-ylt76-hogaw-sluvf-btjuq-6ohr2-enuq3-fpoxt-uxz75-vbzw2-iae";
  const localHost = "http://127.0.0.1:4943";
  const agent = new HttpAgent({ host: localHost });

  async function loadNFT() {
    const NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });
    console.log(NFTActor);
    // const name = await mate_backend_nft.getName();
    // const owner = await mate_backend_nft.getOwner();
   
    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();

    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);

    const imageBlob = new Blob([imageContent], { type: 'image/jpeg' }); // You may need to specify the correct MIME type

    const reader = new FileReader();

    reader.onload = function (event) {
      const dataURL = event.target.result;
      setImageDataURL(dataURL);
    };

    reader.readAsDataURL(imageBlob);

    setName(name);
    console.log(name);
    setOwner(owner.toText());
    console.log(owner);
    // setImage(image);
    // console.log(image);
  }

  useEffect(async () => {
    loadNFT();
    // const imageData = await mate_backend_nft.getAsset();
    // const imageContent = new Uint8Array(imageData);
    // console.log(imageContent);
    // const image = URL.createObjectURL(
    //   new Blob([imageContent.buffer])
    // );

  
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={imageDataURL}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}
            <span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;