import Layout from '@components/Layout';
import { useSession } from 'next-auth/client';
import React from 'react';
import {
  Flex, Icon, Text, Button,
} from '@chakra-ui/react';
import { FaClipboardCheck, FaCheckCircle } from 'react-icons/fa';

export default function Success() {
  const [session] = useSession();
  return (
    <Layout title="Cart page">
      <Flex
        direction='column'
        maxWidth='400px'
      >
        <Flex
          padding='1em'
          justifyContent='center'
          alignItems='center'
        >
          <Icon
            as={FaCheckCircle}
            color='green.400'
            width='80%'
            height='80%'
          />
        </Flex>
        <Flex
          padding='1em'>
          <Text
            fontSize="lg"
            color='gray.500'
            align='center'
          >
            Your order is completed!
          </Text>
        </Flex>
        <Flex
          padding='1em'
          justifyContent='center'
        >
          <Button
            as='a'
            href='/orders'

            leftIcon={<FaClipboardCheck />}
            variant='solid'
            backgroundColor='red.400'
            color='white'
            _hover={{
              backgroundColor: 'red.500',
            }}
          >
            See more details
          </Button>
        </Flex>
      </Flex >
    </Layout>
  );
}
