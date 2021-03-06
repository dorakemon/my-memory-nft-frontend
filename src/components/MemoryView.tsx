import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import MemoryCard from "./MemoryCard";
import { ethers } from "ethers";

interface Card {
  id: string;
  title: string;
  image: string;
}

const fetchMetadata = async (url: string) => {
  const res = await fetch(url);
  const resJson = await res.json();
  return { name: resJson.name, image: resJson.image };
};

const MemoryView = (props: {
  contract: ethers.Contract | null;
  address: string;
}) => {
  const { contract, address } = props;

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const getCards = async () => {
      if (contract) {
        const _cards: Card[] = [];
        try {
          const { getTokenIdBySender, tokenURI } = contract.functions;
          console.log(ethers.utils.getAddress(address));
          const result = await getTokenIdBySender();
          // const result = await tokenURI(2);
          const nums = result[0];
          console.log(result);
          // for (const bigNum in result[0]) {
          for (let i = 0; i < result[0].length; i++) {
            const resultURI = await tokenURI(nums[i]);
            console.log(resultURI);
            const { name, image } = await fetchMetadata(resultURI);
            _cards.push({ id: String(nums[i].toNumber()), title: name, image });
          }
        } finally {
          setCards(_cards);
        }
      }
    };
    console.log("getCards");
    getCards();
  }, [contract]);

  const handleRefreshBtn = () => {
    window.location.reload();
  };

  const burnPost = async (id: string) => {
    console.log(id);
    const getCards = async () => {
      if (contract) {
        const { burn } = contract.functions;
        const result = await burn(id);
        console.log(result);
      }
    };
    console.log("burn");
    getCards();
  };
  return (
    <>
      <Button onClick={handleRefreshBtn}>REFRESH</Button>
      <Grid container spacing={4} px="5vw">
        {cards.map((card, key) => (
          <Grid key={key} item xs={12} sm={12} md={6} lg={4}>
            <MemoryCard
              title={card.title}
              src={card.image}
              onBtnClick={() => burnPost(card.id)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const initCards = [
  {
    id: "0",
    title: "tmptmptmptile",
    image:
      "https://ipfs.infura.io/ipfs/QmcVwqbAS3UVDGgVMAXgkZXPbq6WEJWNF9UJ4DdcaxLwP3"
  },
  {
    id: "1",
    title: "tmptmptmptile",
    image:
      "https://ipfs.infura.io/ipfs/QmcVwqbAS3UVDGgVMAXgkZXPbq6WEJWNF9UJ4DdcaxLwP3"
  },
  {
    id: "2",
    title: "tmptmptmptile",
    image:
      "https://ipfs.infura.io/ipfs/QmcVwqbAS3UVDGgVMAXgkZXPbq6WEJWNF9UJ4DdcaxLwP3"
  },
  {
    id: "3",
    title: "tmptmptmptile",
    image:
      "https://ipfs.infura.io/ipfs/QmcVwqbAS3UVDGgVMAXgkZXPbq6WEJWNF9UJ4DdcaxLwP3"
  }
];

export default MemoryView;
