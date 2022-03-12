import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";

const MemoryCard = (props: {
  title: string;
  src: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onBtnClick: Function;
}) => {
  const { title, src, onBtnClick } = props;

  return (
    <Card>
      <CardMedia component="img" image={src} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={() => onBtnClick()}
        >
          BURN
        </Button>
      </CardActions>
    </Card>
  );
};

export default MemoryCard;
