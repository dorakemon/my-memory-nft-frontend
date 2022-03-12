import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
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

const MemoryView = (props: { contract: ethers.Contract | null }) => {
  const { contract } = props;

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const getCards = async () => {
      if (contract) {
        const _cards: Card[] = [];
        const { tokenURI } = contract.functions;
        for (let i = 1; i < 7; i++) {
          const result = await tokenURI(i);
          console.log(result);
          const { name, image } = await fetchMetadata(result);
          _cards.push({ id: String(i), title: name, image });
        }
        setCards(_cards);
      }
    };
    console.log("getCa");
    getCards();
  }, []);

  const burnPost = (id: string) => {
    console.log(id);
  };
  return (
    <>
      <Grid container spacing={4} px="5vw">
        {cards.map((card, key) => (
          <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
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
