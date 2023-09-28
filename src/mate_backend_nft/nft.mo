import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class NFT (name: Text, owner: Principal, content: [Nat8]) = this {
  
  let itemName = name;
  let nftOwner = owner;
  let imageBytes = content;

  public query func getName() : async Text{
    return itemName;
  };

  public query func getOwner() : async Principal {
    return nftOwner;
  };

  public query func getAsset() : async [Nat8] {
    return imageBytes;
  };

  public query func getCanisterId() : async Principal {
    return Principal.fromActor(this);
  };

};

// actor class NFT (name: Text, owner: Principal, content: [Nat8]) = this {
  
//   let itemName = name;
//   let nftOwner = owner;
//   let imageBytes = content;
//   var editions : Nat = 1; // Initialize with 1 edition (the original NFT).

//   public query func getName() : async Text {
//     return itemName;
//   };

//   public query func getOwner() : async Principal {
//     return nftOwner;
//   };

//   public query func getAsset() : async [Nat8] {
//     return imageBytes;
//   };

//   public query func getEditions() : async Nat {
//     return editions;
//   };

//   public query func getCanisterId() : async Principal {
//     return Principal.fromActor(this);
//   };

//   // Function to increment the number of editions when a copy is minted.
//   public shared(msg) func mintCopy() : async () {
//     // assert msg.caller == nftOwner;
//     editions += 1;
//   };
// };
