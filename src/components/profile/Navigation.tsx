import React from 'react';
import {
  VStack, Tooltip, Flex, Avatar, Heading, Button,
} from '@chakra-ui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiTruck } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navigation = () => (
  <VStack p={6} justifyContent="space-between" alignItems="center" w="full">
    <VStack spacing={4}>
      <Flex
        w="full"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Avatar name="Name Surname" bg="gray.100" size="lg" borderWidth={1} borderColor="gray.400" />
        <VStack>
          <Heading size="sm" mt={2}>Hi, Name Surname</Heading>
        </VStack>
      </Flex>
    </VStack>
    <VStack>
      <Tooltip label="Dashboard" placement="right">
        <Button
          as="a"
          href="/profile/profileDashboard"
          leftIcon={<RiDashboardLine size={20} />}
        >
          Dashboard
        </Button>
      </Tooltip>
      <Tooltip label="Cart" placement="right">
        <Button
          as="a"
          href="/cart"
          leftIcon={<AiOutlineShoppingCart size={20} />}
        >
          Cart
        </Button>
      </Tooltip>
      <Tooltip label="Orders" placement="right">
        <Button
          as="a"
          href="/profile/profileOrders"
          leftIcon={<FiTruck size={20} />}
        >
          Orders
        </Button>
      </Tooltip>
      {/* <Tooltip label="Notifications" placement="right">
        <Button
          as="a"
          href="#"
          leftIcon={<IoNotificationsOutline size={20} />}
        >
          Notifications
        </Button>
      </Tooltip>
      <Tooltip label="Messages" placement="right">
        <Button
          as="a"
          href="#"
          leftIcon={<FiMail size={20} />}
        >
          Messages
        </Button>
      </Tooltip> */}
    </VStack>
    <Tooltip label="Settings" placement="right">
      <Button
        as="a"
        href="#"
        leftIcon={<IoSettingsOutline size={20} />}
      >
        Privacy and settings
      </Button>
    </Tooltip>
  </VStack>
);

export default Navigation;
