import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, listParams } from 'models';
import * as React from 'react';

export interface IStudentFiltersProps {
  filter: listParams;
  cityList: City[]
  onSearchChange: (filter: listParams) => void;
  onCityChange: (filter: listParams) => void;
}

export default function StudentFilters(props: IStudentFiltersProps) {
  // const [inputValue, setInputValue] = React.useState('')
  const { filter, onSearchChange, cityList, onCityChange } = props;

  const handleChange = (e: any) => {
    // console.log(e.target.value)
    const newFilter = {
      ...filter,
      _page: 1,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };

  const handleCityChange = (e: any) => {
    // console.log(e.target.value);
    const newFilter = {
      ...filter, 
      _page: 1,
      city: e.target.value || undefined,
    }
      onCityChange(newFilter)
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <FormControl
            fullWidth
            size="small"
            // className={}
            variant="outlined"
          >
            <InputLabel htmlFor="search">Search By Name</InputLabel>
            <OutlinedInput
              id="searchByName"
              onChange={handleChange}
              endAdornment={<Search />}
              label="Search By Name"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={3} md={6}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">City</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="City"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {
                cityList.map((city, index) => (
                  <MenuItem key={index} value={city.code}>{city.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
