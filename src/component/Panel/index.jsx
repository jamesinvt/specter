import React, { useEffect, useState } from "react";

import { Box, Card, Image, Flex } from "rebass";

const Movie = ({ item }) => {
  const imgSrc = `/t/p/w500/${item.poster_path}`;
  return (
    <Box minWidth={150}>
        <Card
        sx={{
            p: 1,
            borderRadius: 2,
            boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
        }}
        >
        <Image src={imgSrc} />
        </Card>
    </Box>
  );
};

const Panel = ({ panel, group }) => {
  const [items, setItems] = useState([]);
  useEffect(async () => {
    const response = await fetch(`/remote/panel?panel=${panel}&group=${group}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    setItems(body.data.results);
    console.log(body.data.results);
  }, []);
  return (
    <Flex width={1} overflowX="scroll">
      {items.map((item) => (
        <Movie key={item.id} item={item} />
      ))}
    </Flex>
  );
};

export default Panel;
