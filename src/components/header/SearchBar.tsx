import React from 'react';
import {
  InputGroup, InputRightElement, Input, IconButton,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ ...props }) => (
  <InputGroup {...props}>
    <Input placeholder="Search products..." />
    <InputRightElement>
      <IconButton aria-label="Search" icon={<SearchIcon />} size="sm" />
    </InputRightElement>
  </InputGroup>
);
export default SearchBar;
