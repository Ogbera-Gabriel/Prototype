"use client";

import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";

interface Offer {
  id: string;
  price: number;
  deliveryTime: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#314f32",
  color: "white",
  "&:hover": {
    backgroundColor: "#243c24",
  },
}));

const OfferPage: React.FC = () => {
  const offers: Offer[] = [
    { id: "a", price: 100, deliveryTime: "2 weeks" },
    { id: "b", price: 120, deliveryTime: "3 weeks" },
    { id: "c", price: 90, deliveryTime: "1 week" },
  ];

  const handleOfferSelect = (offerId: string) => {
    console.log(`Selected offer: ${offerId}`);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Received Offers
      </Typography>
      <Grid container spacing={3}>
        {offers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} key={offer.id}>
            <StyledCard variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Offer {offer.id.toUpperCase()}
                </Typography>
                <Typography variant="h5" color="primary" gutterBottom>
                  €{offer.price}
                </Typography>
                <Chip
                  label={`Delivery: ${offer.deliveryTime}`}
                  color="secondary"
                  size="small"
                />
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                <StyledButton
                  variant="contained"
                  onClick={() => handleOfferSelect(offer.id)}
                >
                  Select Offer
                </StyledButton>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OfferPage;