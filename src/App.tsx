import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import "./App.css";
import { Button } from "@mui/material";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import PostDialog from "./components/PostDialog";
import artifact from "./abi/Burnable.json";

const contractAddress = "0xd3f1D0EeC419D436E94D0Ec88EdDC984DDE811B2";

function App() {
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  useEffect(() => {
    const getTaskCount = async () => {
      // const provider = new ethers.providers.JsonRpcProvider();
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
      const { burn, mintBurnable } = contractWithSigner.functions;
      // const { burn } = contract.functions;

      const url =
        "https://ipfs.infura.io/ipfs/QmQpCpJgeMZ8UDqGgtkZX7PeoxLmyh2BcWBA28GXM9bYND";
      // const result = await mintBurnable(url, {
      //   value: ethers.utils.parseEther("1")
      // });
      const result = await burn(2);
      console.log(result);
    };
    getTaskCount();
  }, []);

  const handlePostDialogOpen = () => {
    setPostDialogOpen(true);
  };

  const handlePostDialogClose = () => {
    setPostDialogOpen(false);
  };

  return (
    <div className="App">
      <Button
        variant="contained"
        color="success"
        startIcon={<CreateRoundedIcon />}
        onClick={handlePostDialogOpen}
      >
        Post
      </Button>
      <PostDialog
        postImage={"temtemptempteptemptep"}
        open={postDialogOpen}
        onClose={handlePostDialogClose}
      ></PostDialog>
    </div>
  );
}

export default App;
