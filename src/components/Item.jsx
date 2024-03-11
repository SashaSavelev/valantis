import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Item = ({ id, product, price, brand }) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(255, 241, 241)' }}>
            <CardContent sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ pb: 2,  fontFamily: "Cormorant", fontWeight: 900 }}>
                    {product}
                </Typography>
                <Typography color="text.secondary">
                    <span className="boldText">ID:</span> {id} <br />
                    <span className="boldText">Цена:</span> {price} <br />
                    <span className="boldText"> Бренд:</span> {brand || 'Нет данных'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Item;