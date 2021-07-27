import React, { useState } from 'react';
import {
  InputGroup, InputRightElement, Input, IconButton, Link,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ ...props }) => {
  const [state, setState] = useState<string>('');
  const handleChange = async (e) => {
    setState(e.target.value);
  };
  return (
    <InputGroup {...props}>
      <Input placeholder="Search products..." value={state} onChange={handleChange} />
      <InputRightElement>
        <Link href={`/products?search=${state}`}>
          <IconButton aria-label="Search" icon={<SearchIcon />} size="sm" />
        </Link>
      </InputRightElement>
    </InputGroup>
  );
};
export default SearchBar;
