import { Stack, Typography } from "@mui/material";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Stack
      direction="row"
      spacing={4}
      width="100%"
      height="100px"
      alignItems="center"
      paddingX={10}
      sx={{ backgroundColor: "#EEF0EB" }}
    >
      <Typography variant="body1" fontSize={20}>
        <Link href="/">Arbo Woods</Link>
      </Typography>

      
    </Stack>
  );
};
