

import HomePage from "@/components/homepage";
import  WoodFormModal  from "@/components/modals/woods-form-modal";
import { Box, Container } from "@mui/material";


export default function Home() {
  return (
    
    <Box sx={{height: "100%", }}>
      {/* <WoodFormModal /> */}
      <HomePage />
    </Box>
    
  );
}
