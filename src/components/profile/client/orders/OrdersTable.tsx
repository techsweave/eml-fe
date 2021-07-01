import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  Box,
  useMediaQuery,
} from '@chakra-ui/react';
import { VscChevronRight } from 'react-icons/vsc';
import Link from 'next/link';
import { Models } from 'utilities-techsweave';
import { getTotal } from '@test/OrderedProductsMock';

function getTableSize() {
    const [isSmallerThan600] = useMediaQuery("(max-width: 600px)")
    if (isSmallerThan600)
        return "sm";
    else
        return "md";
}

const OrdersTable = (prop: { ordersList: Models.Tables.IOrder[] }) => {
    const { ordersList } = prop;
    const total = getTotal();
    return (
        <Box minW="full">
        <Table variant="simple" size={getTableSize()}>
            <TableCaption>Orders</TableCaption>
            <Thead>
                <Tr>
                    <Th>Order ID</Th>
                    <Th>Date</Th>
                    <Th>Total</Th>
                    <Th>Detail</Th>
                </Tr>
            </Thead>
            <Tbody>
                {ordersList.map((orders) => (
                    <Tr _hover={{backgroundColor:'blue.100'}}>
                        <Td>{orders.id}</Td>
                        {/* <Td>{orders.date.getDate()}-{orders.date.getMonth() + 1}-{orders.date.getFullYear()}</Td> */}
                        <Td>{orders.date}</Td>
                        <Td>{total}</Td>
                        <Td>
                            <Link href={{ pathname: '/profile/client/orders/[id]', query: { id: orders.id } }}>
                                <IconButton
                                    size="sm"
                                    rounded="md"
                                    aria-label="Order detail"
                                    icon={<VscChevronRight />} />
                            </Link>
                        </Td>
                    </Tr>                        
                ))}
            </Tbody>
        </Table>
        </Box>
    );
}
export default OrdersTable;