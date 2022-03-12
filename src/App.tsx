import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import "./App.css";
import { Button } from "@mui/material";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import PostDialog from "./components/PostDialog";
import artifact from "./abi/Burnable.json";
import MemoryView from "./components/MemoryView";
import Header from "./components/Header";

const contractAddress = "0xd3f1D0EeC419D436E94D0Ec88EdDC984DDE811B2";

function App() {
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const connectContract = async () => {
      // const provider = new ethers.providers.JsonRpcProvider();
      console.log(window.ethereum);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      console.log(provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        artifact.abi,
        provider
      );
      const contractWithSigner = contract.connect(signer);
      console.log(contractWithSigner);
      setContract(contractWithSigner);
      // const { burn, mintBurnable, tokenURI, ownerOf } =
      //   contractWithSigner.functions;
      // const { burn } = contract.functions;

      // const url =
      //   "https://ipfs.infura.io/ipfs/QmQpCpJgeMZ8UDqGgtkZX7PeoxLmyh2BcWBA28GXM9bYND";
      // const result = await mintBurnable(url, {
      //   value: ethers.utils.parseEther("1")
      // });
      // const result = await burn(2);
      // const result = await ownerOf(1);
      // const res = await fetch(result[0]);
      // const resJson = await res.json();
      // console.log(resJson);
      // console.log(result);
    };
    connectContract();
  }, []);

  const handlePostDialogOpen = () => {
    setPostDialogOpen(true);
  };

  const handlePostDialogClose = () => {
    setPostDialogOpen(false);
  };

  return (
    <div className="App">
      <Header />
      <Button
        variant="contained"
        color="success"
        startIcon={<CreateRoundedIcon />}
        onClick={handlePostDialogOpen}
        style={{
          minWidth: "200px",
          maxWidth: "200px",
          minHeight: "50px",
          maxHeight: "50px",
          float: "right",
          marginTop: "30px",
          marginRight: "70px"
        }}
      >
        Post
      </Button>
      <PostDialog
        open={postDialogOpen}
        onClose={handlePostDialogClose}
        contract={contract}
      />
      <MemoryView contract={contract} />
    </div>
  );
}

export default App;
