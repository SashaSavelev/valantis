import React from "react";
import { Grid, Container } from '@mui/material';
import Item from "./Item";

const Items = ({items}) => {
  return ( <div> <Container>
    <Grid container spacing={3} justifyContent="center">
      {items.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
          <Item {...item} />
        </Grid>
      ))}
    </Grid>
  </Container></div>
   
  ); 
}

 
export default Items;