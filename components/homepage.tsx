"use client";

import React, { useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Search } from "@mui/icons-material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Navbar } from "@/components/ui/navbar";

import WoodFormSelectModal from "@/components/modals/wood-form-select-modal";

export default function HomePage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [woodFormModalOpen, setWoodFormModalOpen] = useState<boolean>(false);

  const itemOptions: { [key: string]: string[] } = {
    "Spruce": ["Spruce 75x75", "Spruce 22x32", "Spruce 125x175", "Spruce 44x150", "Spruce 38x200"],
    "Oak": ["Oak 27x180"],
    "Douglas": ["Douglas 38x120", "Douglas 45x200", "Douglas 50x70", "Douglas 50x100", "Douglas 80x130"],
    "Larch": ["Larch 100x100", "Larch 32x200", "Larch 50x200", "Larch 85x85", "Larch 160x260"],
    "Pine": ["Pine 150x200", "Pine 25x250", "Pine 38x250", "Pine 47x100", "Pine 75x175"],
    "Spruce SLS": ["Spruce SLS 38x89", "Spruce SLS 38x120", "Spruce SLS 38x140", "Spruce SLS 38x235", "Spruce SLS 38x285"],
    "Keruing": ["Keruing 33x155"],
    "Meranti-DR": ["Meranti-DR 80x155", "Meranti-DR 46x310", "Meranti-DR 65x90", "Meranti-DR 26x205", "Meranti-DR 80x310"],
    "Sapeli Mahonie": [
      "Sapeli Mahonie 63x125",
      "Sapeli Mahonie 80x130",
      "Sapeli Mahonie 20x105",
      "Sapeli Mahonie 52x105",
      "Sapeli Mahonie 26x305"
    ],
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleTreeItemClick = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const filterTreeItems = (items: string[]) => {
    return items.filter((item) =>
      item.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  };

  const handleOpenWoodFormModal = (selectedOption?: string) => {
    setSelectedItem(selectedOption || selectedItem);
    setWoodFormModalOpen(true);
  };

  const handleCloseWoodFormModal = () => {
    setWoodFormModalOpen(false);
  };

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
              autoComplete="none"
              placeholder="Search for Products"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchInputChange}
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
                {filterTreeItems([
                  "Douglas",
                  "Larch",
                  "Pine",
                  "Spruce",
                  "Spruce SLS",
                ]).map((item, index) => (
                  <TreeItem
                    key={index}
                    itemId={item.toLowerCase()}
                    label={item}
                    onClick={() => handleTreeItemClick(item)}
                  />
                ))}
              </TreeItem>
              <TreeItem itemId="hardwood" label="Hardwood">
                {filterTreeItems([
                  "Keruing",
                  "Meranti-DR",
                  "Oak",
                  "Sapeli Mahonie",
                ]).map((item, index) => (
                  <TreeItem
                    key={index}
                    itemId={item.toLowerCase()}
                    label={item}
                    onClick={() => handleTreeItemClick(item)}
                  />
                ))}
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
            </Stack>
          </Box>
          <ul className="list-wood">
            {selectedItem ? (
              (itemOptions[selectedItem] || [selectedItem]).map(
                (option, index) => (
                  <button
                    type="button"
                    key={index}
                    className="list-wood-button"
                    onClick={() => handleOpenWoodFormModal(option)}
                  >
                    <div className="list-wood-firstdiv">{option}</div>
                    <div className="list-wood-seconddiv">Select</div>
                  </button>
                )
              )
            ) : (
              <Typography
                style={{
                  marginTop: "10px",
                  marginLeft: "25px",
                  fontWeight: "bold",
                }}
              >
                Please select an item from the list
              </Typography>
            )}
          </ul>
        </Grid>
      </Grid>
      {woodFormModalOpen && (
        <WoodFormSelectModal
          openWood={woodFormModalOpen}
          handleCloseWoodForm={handleCloseWoodFormModal}
          selectedSoftwood={selectedItem}
        />
      )}
    </Box>
  );
}
