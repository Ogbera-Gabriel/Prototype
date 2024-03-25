"use client";

import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

interface Offer {
  id: string;
  price: number;
  deliveryTime: string;
}

const OfferPage: React.FC = () => {
  //   const [offers, setOffers] = useState<Offer[]>([]); for api
  const offers: Offer[] = [
    { id: "a", price: 100, deliveryTime: "2 weeks" },
    { id: "b", price: 120, deliveryTime: "3 weeks" },
    { id: "c", price: 90, deliveryTime: "1 week" },
  ];

  const handleOfferSelect = (offerId: string) => {
    console.log(`Selected offer: ${offerId}`);
  };

  //   useEffect(() => {
  //     const fetchOffers = async () => {
  //       try {
  //         const response = await fetch('api-endpoint');
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch offers');
  //         }
  //         const data = await response.json();
  //         setOffers(data);
  //       } catch (error) {
  //         console.error('Error fetching offers:', error);
  //       }
  //     };

  //     fetchOffers();
  //   }, []); for api

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Typography variant="h4" gutterBottom align="center">
          Recieved Offers
        </Typography>
        {offers.map((offer) => (
          <Card
            key={offer.id}
            variant="outlined"
            style={{ marginBottom: "20px" }}
          >
            <CardContent>
              <Typography variant="h6">
                Offer {offer.id.toUpperCase()}
              </Typography>
              <Typography variant="body1">
                Total Price: €{offer.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Delivery Time: {offer.deliveryTime}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#314f32", color: "white" }}
                onClick={() => handleOfferSelect(offer.id)}  // id to be changed
              >
                Select Offer
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OfferPage;