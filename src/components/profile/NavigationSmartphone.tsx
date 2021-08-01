import React, {useState, useEffect} from 'react';
import {
Flex, Avatar, Heading, Button, VStack, SimpleGrid
} from '@chakra-ui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiTruck } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSession } from 'next-auth/client';
import { AuthenticatedUser } from 'utilities-techsweave';
const initLoading = true;
const NavigationSmartphone = () => {
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
  return (
    <VStack spacing={10}>
      <SimpleGrid
        columns={2} spacing={10}
      >
        <Button
          as="a"
          href="/profile"
          leftIcon={<RiDashboardLine size={20} />}
          display={['none', 'flex']}
        >
          Dashboard
        </Button>
        <Button
          as="a"
          href="/cart"
          leftIcon={<AiOutlineShoppingCart size={20} />}
          display={['none', 'flex']}
        >
          Cart
        </Button>
        <Button
          as="a"
          href="/orders"
          leftIcon={<FiTruck size={20} />}
          display={['none', 'flex']}
        >
          Orders
        </Button>
        <Button
          as="a"
          href="/profile/profileSettings"
          leftIcon={<IoSettingsOutline size={20} />}
          display={['none', 'flex']}
        >
          Edit profile
        </Button>
      </SimpleGrid>
      <Flex
        w="full"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
         <Avatar name={state.username} color='inherit' bg="gray.100" size="lg" borderWidth={1} borderColor="gray.400" />
        <Heading size="sm" textAlign='center' mt={2}>Hi, {state.username}</Heading>
      </Flex>
    </VStack>
    
  );
};

export default NavigationSmartphone;
