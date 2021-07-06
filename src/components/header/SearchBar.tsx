import React from 'react';
import {
    InputGroup, InputRightElement, Input, IconButton
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Link from 'next/link'

const SearchBar = ({ ...props }) => {
    return (
        <InputGroup {...props}>
            <Input placeholder="Search products..." />
            <InputRightElement>
                {/* <Link href={{ pathname: '/products', query: { id: state} }}> */}
                <Link href='/products?filter=ciaoBello'>
                    <IconButton aria-label="Search" icon={<SearchIcon />} size="sm" />
                </Link>
            </InputRightElement>
        </InputGroup >
    );
}
export default SearchBar;
