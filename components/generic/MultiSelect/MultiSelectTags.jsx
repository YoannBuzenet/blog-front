import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

// TODO : difficulté à passer en typescript car MenuItem veut un string en value
// Et les elements sont des Tags

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, tags, theme) {
  const isTagSelected = tags.filter((tag) => tag.name === name).length > 0;

  return {
    fontWeight: isTagSelected
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChipTags({
  totalListElements,
  selectedElements,
  setSelectedElements,
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;

    setSelectedElements(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedElements}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {totalListElements.map((tag) => (
            <MenuItem
              key={tag.id}
              value={tag}
              style={getStyles(tag.language, selectedElements, theme)}
            >
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
