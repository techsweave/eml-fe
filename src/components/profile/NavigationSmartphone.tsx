import React from 'react';
import {
  Stack, Tooltip, Flex, Avatar, Heading, Button, HStack, Box, VStack,
} from '@chakra-ui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiTruck } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IconButton } from "@chakra-ui/react"

const NavigationSmartphone = () => (
    <VStack spacing={10}>
    <Stack
        direction="row"
        w="full"
        spacing={['10', '6']}
        >
        <Button
            as="a"
            href="/profile"
            leftIcon={<RiDashboardLine size={20} />}
            display={['none','flex']}
        >
            Dashboard
            </Button>
            <IconButton
                as="a"
                href="/profile"
                aria-label="Dashboard"
                icon={<RiDashboardLine size={30} />}
                display={['flex', 'none']}
            />
        <Button
            as="a"
            href="/cart"
            leftIcon={<AiOutlineShoppingCart size={20} />}
            display={['none','flex']}
        >
          Cart
            </Button>
            <IconButton
                as="a"
                href="/cart"
                aria-label="Cart"
                icon={<AiOutlineShoppingCart size={30} />}
                display={['flex', 'none']}
            />
        <Button
            as="a"
            href="/orders"
            leftIcon={<FiTruck size={20} />}
            display={['none','flex']}
        >
          Orders
            </Button>
            <IconButton
                as="a"
                href="/orders"
                aria-label="Orders"
                icon={<FiTruck size={30} />}
                display={['flex', 'none']}
            />
        <Button
            as="a"
            href="/profile/profileSettings"
            leftIcon={<IoSettingsOutline size={20} />}
            display={['none','flex']}
      >
        s
            </Button>
            <IconButton
                as="a"
                href="/profile/profileSettings"
                aria-label="Orders"
                icon={<IoSettingsOutline size={30} />}
                display={['flex', 'none']}
            />
        </Stack>
        <Flex
            w="full"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
        >
        <Avatar name="Name Surname" bg="gray.100" size="lg" borderWidth={1} borderColor="gray.400" />
        <VStack>
          <Heading size="sm" mt={2}>Hi, Name Surname</Heading>
        </VStack>
      </Flex>
        </VStack>
    
);

export default NavigationSmartphone;
