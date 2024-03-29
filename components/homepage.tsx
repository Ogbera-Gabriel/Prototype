"use client";

import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Navbar } from "./ui/navbar";
import { Search } from "@mui/icons-material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function HomePage() {
  return (
    <Box height="100%" sx={{ height: "100%", width: "100%" }}>
      <Navbar />

      <Grid container spacing={2}>
        <Grid item lg={4} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: 10,
              pt: 4,
              gap: 2,
            }}
          >
            <Typography fontWeight={700} fontSize={20}>
              Filter
            </Typography>
            <TextField
              fullWidth
              placeholder="Search for Products"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <SimpleTreeView>
              <TreeItem itemId="sawn timber" label="Sawn Timber">
                <TreeItem itemId="douglas" label="Douglas" />
                <TreeItem itemId="larch" label="Larch" />
                <TreeItem itemId="pine" label="Pine" />
              </TreeItem>
              <TreeItem itemId="hardwood" label="Hardwood">
                <TreeItem itemId="keruing" label="Keruing" />
                <TreeItem itemId="meranti-dr" label="Meranti-DR" />
              </TreeItem>
            </SimpleTreeView>
          </Box>
        </Grid>
        <Grid item lg={8} xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: 4,
              pt: 4,
              gap: 2,
              flexGrow: 1,
              width: "100%",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Typography>All Products</Typography>

              <Button variant="contained">Previous Purchases</Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}