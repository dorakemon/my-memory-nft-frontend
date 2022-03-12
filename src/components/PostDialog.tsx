import { useEffect, useRef, useState } from "react";
import { create } from "ipfs-http-client";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import LoadingButton from "./LoadingButton";
import { ethers } from "ethers";

const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

const canvasToFile = async (canvas: HTMLCanvasElement, filename: string) => {
  return new Promise<File>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        console.log(blob);
        const file = new File([blob], `${filename}.jpeg`);
        // check if image can be generated successflully
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = () => console.log(reader.result);
        // console.log(file);
        resolve(file);
      }
    }, "image/jpeg");
  });
};

const metadataToFile = (metadata: object) => {
  const bytes = new TextEncoder().encode(JSON.stringify(metadata));
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8"
  });
  return new File([blob], "metadata.json");
};

const PostDialog = (props: {
  open: boolean;
  onClose: () => void;
  contract: ethers.Contract | null;
}) => {
  const { onClose, open, contract } = props;

  const [cardTitle, setCardTitle] = useState("");
  const [cardText, setCardText] = useState("");
  const [cardColor, setCardColor] = useState("white");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = "#666666";
        const date = new Date();
        context.fillText(date.toLocaleDateString("ja-JP"), 130, 90);
      }
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext("2d");
      if (context) {
        // select card color
        if (cardColor === "blue") context.fillStyle = "#CCCCFF";
        else if (cardColor === "green") context.fillStyle = "#CCFFCC";
        else if (cardColor === "white") context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = "#000000";
        // write card text
        context.fillText(cardText, 20, 40, 150);
        context.fillStyle = "#666666";
        // write date
        const date = new Date();
        context.fillText(date.toLocaleDateString("ja-JP"), 130, 90);
      }
    }
  }, [cardText, cardColor]);

  const handleClose = () => {
    if (!loading) onClose();
  };

  const handlePost = async () => {
    setLoading(true);
    if (canvasRef.current) {
      const file = await canvasToFile(canvasRef.current, cardTitle);
      try {
        const addedImage = await client.add(file);
        const imageUrl = `https://ipfs.infura.io/ipfs/${addedImage.path}`;
        // mock
        // const imageUrl =
        //   "https://ipfs.infura.io/ipfs/QmcVwqbAS3UVDGgVMAXgkZXPbq6WEJWNF9UJ4DdcaxLwP3";
        //
        console.log(imageUrl);

        const metadata = {
          name: cardTitle,
          description: "memorial card",
          image: imageUrl
        };
        const metadataFile = metadataToFile(metadata);
        const addedMetadata = await client.add(metadataFile);
        const metadataUrl = `https://ipfs.infura.io/ipfs/${addedMetadata.path}`;
        // mock
        // const metadataUrl =
        //   "https://ipfs.infura.io/ipfs/QmQpCpJgeMZ8UDqGgtkZX7PeoxLmyh2BcWBA28GXM9bYND";
        if (contract) {
          const { mintBurnable } = contract.functions;
          const result = await mintBurnable(metadataUrl, {
            value: ethers.utils.parseEther("0.5")
          });
          console.log(result);
          setLoading(false);
          handleClose();
        } else {
          console.log("contract not found");
        }
      } catch (error) {
        console.log("Error uploading file: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <canvas
        id="postImageCanvas"
        width="200"
        height="100"
        style={{ border: "1px solid #d3d3d3", margin: 10 }}
        ref={canvasRef}
      >
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <DialogTitle>Create Memorial Card!!</DialogTitle>
      <DialogContent>
        <TextField
          label="title"
          disabled={loading}
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
          fullWidth
          style={{ marginTop: 10 }}
        />
        <FormLabel>Color</FormLabel>
        <RadioGroup
          row
          value={cardColor}
          onChange={(e) => {
            setCardColor((e.target as HTMLInputElement).value);
          }}
        >
          <FormControlLabel
            value="blue"
            control={<Radio />}
            label="Blue"
            disabled={loading}
          />
          <FormControlLabel
            value="green"
            control={<Radio />}
            label="Green"
            disabled={loading}
          />
          <FormControlLabel
            value="white"
            control={<Radio />}
            label="White"
            disabled={loading}
          />
        </RadioGroup>
        <TextField
          label="content"
          fullWidth
          disabled={loading}
          value={cardText}
          onChange={(e) => setCardText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          color="info"
          onClick={handlePost}
          loading={loading}
          disable={false}
        >
          Post
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
