import React, {useState, useEffect} from 'react';
import {
  VStack, Tooltip, Flex, Avatar, Heading, Button,
} from '@chakra-ui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiTruck } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSession } from 'next-auth/client';
import { AuthenticatedUser } from 'utilities-techsweave';

const initLoading = true;

const NavigationDesktop = () => {
  const session = useSession()[0];
  const [error, setError] = useState<Error>();
  const [state, setState] = useState({
    email: '',
    username: '',
  });
  const [loading, setLoading] = useState(initLoading);
  async function fetchData(s) {
    const user = await AuthenticatedUser.fromToken(s?.accessToken as string);
    return {
      email: await user.getEmail(),
      username: await user.getUserId(),
    };
  }
  useEffect(() => {
    const s = session;
    // Avoid infinte loop render -> useEffect -> setState -> render
    if (!loading) return;
    if (error) return;

    fetchData(s)
      .then((data) => {
        setLoading(false);
        setState(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.error);
      });
  }, [state, setState, error, setError, loading, setLoading, fetchData]);
return    (
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
                    <Heading size="sm" mt={2}>Hi, {state.username}</Heading>
                    </VStack>
                </Flex>
            </VStack>
            <VStack>
                <Tooltip label="Dashboard" placement="right">
                    <Button
                        as="a"
                        href="/profile"
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
                        href="/orders"
                        leftIcon={<FiTruck size={20} />}
                    >
                        Orders
                    </Button>
                </Tooltip>
            </VStack>
            <Tooltip label="Settings" placement="right">
                <Button
                    as="a"
                    href="/profile/client/profileSettings"
                    leftIcon={<IoSettingsOutline size={20} />}
                >
                    Edit profile
                </Button>
            </Tooltip>
        </VStack>
    );
};

export default NavigationDesktop;
