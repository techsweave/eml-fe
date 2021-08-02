import React, { useState, useEffect } from 'react';
import {
  InputGroup, InputRightElement, Input, IconButton, Link,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { route } from 'next/dist/next-server/server/router';

type Props = {
  display: string[]
  ml?: string
  mr?: string
  mb?: string
  mt?: string
  search: string
};

type State = {
  data?: string,
  firstLoad: boolean
};

const SearchBar = ({ ...props }: Props) => {
  const search = props.search === '' ? undefined : props.search;
  const router = useRouter();
  const [state, setState] = useState<State>({
    firstLoad: true,
  });
  const handleChange = async (e) => {
    setState({
      data: e.target.value,
      firstLoad: false,
    });
  };

  // const gotoSearch = (e) => {
  //   if (e.code === 'Enter') {
  //     router.push({
  //       pathname: '/products',
  //       query: {
  //         search: state.data,
  //       },
  //     }, undefined, {
  //       shallow: true,
  //       locale: false,
  //     });
  //   }
  // };

  useEffect(() => {
    if (state.firstLoad && search) {
      setState({
        data: search,
        firstLoad: false,
      });
    }
  }, [state, setState, search]);

  return (
    <InputGroup {...props}>
      <Input
        placeholder="Search products..."
        value={state.data}
        onChange={handleChange}
      // onKeyPress={gotoSearch}
      />
      <InputRightElement>
        <Link href={`/products?search=${state.data}`}>
          <IconButton aria-label="Search" icon={<SearchIcon />} size="sm" />
        </Link>
      </InputRightElement>
    </InputGroup>
  );
};

SearchBar.defaultProps = {
  ml: '10',
  mr: '10',
  mb: '5',
  mt: '5',
};

export default SearchBar;
