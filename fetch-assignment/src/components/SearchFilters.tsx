import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBreeds } from "../services/dogs";
import { type SortOrder } from "../types";

interface SearchFiltersProps {
  onApply: (filters: {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    sort?: string;
  }) => void;
  onClear: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onApply, onClear }) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCode, setZipCode] = useState("");
  const [ageMin, setAgeMin] = useState<number | "">("");
  const [ageMax, setAgeMax] = useState<number | "">("");
  const [sortField, setSortField] = useState("breed");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await getBreeds();
        setBreeds(res.data);
      } catch (error) {
        console.error("Failed to fetch breeds", error);
      }
    };

    fetchBreeds();
  }, []);

  const handleApply = () => {
    if ((ageMin !== "" && ageMin < 1) || (ageMax !== "" && ageMax < 1)) {
      alert("Please enter an age of at least 1 year.");
      return;
    }

    onApply({
      breeds: selectedBreeds.length ? selectedBreeds : undefined,
      zipCodes: zipCode ? [zipCode] : undefined,
      ageMin: ageMin !== "" ? Number(ageMin) : undefined,
      ageMax: ageMax !== "" ? Number(ageMax) : undefined,
      sort: `${sortField}:${sortOrder}`,
    });
  };

  const handleClear = () => {
    setSelectedBreeds([]);
    setZipCode("");
    setAgeMin("");
    setAgeMax("");
    setSortField("breed");
    setSortOrder("asc");
    onClear();
  };

  const handleBreedChange = (value: string[]) => {
    if (value.includes("ALL")) {
      setSelectedBreeds(
        selectedBreeds.length === breeds.length ? [] : breeds
      );
    } else {
      setSelectedBreeds(value);
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Filters
      </Typography>

      <Stack spacing={3}>
         {/* Row 1: Breeds, Zip, Age Min/Max */}
         <Stack direction="row" spacing={2} flexWrap="wrap">
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel>Breed</InputLabel>
            <Select
              multiple
              value={selectedBreeds}
              onChange={(e) => handleBreedChange(e.target.value as string[])}
              renderValue={(selected) =>
                selected.length === breeds.length
                  ? "All Breeds"
                  : selected.join(", ")
              }
              label="Breed"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 40 * 10,
                    overflowY: "auto",
                  },
                },
              }}
            >
              <MenuItem value="ALL">
                <em>
                  {selectedBreeds.length === breeds.length
                    ? "Deselect All"
                    : "Select All"}
                </em>
              </MenuItem>
              {breeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            sx={{ minWidth: 160 }}
          />

          <TextField
            label="Age Min"
            type="number"
            value={ageMin}
            onChange={(e) =>
              setAgeMin(
                e.target.value === ""
                  ? ""
                  : Math.max(1, Number(e.target.value))
              )
            }
            inputProps={{ min: 1 }}
            sx={{ minWidth: 120 }}
          />

          <TextField
            label="Age Max"
            type="number"
            value={ageMax}
            onChange={(e) =>
              setAgeMax(
                e.target.value === ""
                  ? ""
                  : Math.max(1, Number(e.target.value))
              )
            }
            inputProps={{ min: 1 }}
            sx={{ minWidth: 120 }}
          />
        </Stack>

        {/* Row 2: Sorting */}
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Sort Field</InputLabel>
            <Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <MenuItem value="breed">Breed</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="age">Age</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 160 }}>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Row 3: Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleClear} sx={{ px: 3 }}>
            Clear Filters
          </Button>
          <Button variant="contained" onClick={handleApply} sx={{ px: 3 }}>
            Apply Filters
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchFilters;
