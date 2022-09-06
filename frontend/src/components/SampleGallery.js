import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function SampleGallery() {
  return (
    <ImageList sx={{ width: 600, height: 500 }} variant="quilted" cols={4} rowHeight={121}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://source.unsplash.com/AFvUO61NlOU/600x300",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/7tDGb3HrITg/600x300",

    title: "Burger",
  },
  {
    img: "https://source.unsplash.com/kD9qprR6HBI/600x300",

    title: "Camera",
  },
  {
    img: "https://source.unsplash.com/EyrjiJAwLjQ/600x300",

    title: "Coffee",
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/3Z7vjpS8b6g/600x300",

    title: "Hats",
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/ooPx1bxmTc4/600x300",

    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/wsCwj455vh0/600x300",

    title: "Basketball",
  },
  {
    img: "https://source.unsplash.com/Yh9FrbN5Bts/600x300",
    title: "model",
  },
];
