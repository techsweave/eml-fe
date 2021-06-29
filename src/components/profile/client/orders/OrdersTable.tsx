import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { VscChevronRight } from 'react-icons/vsc';
import Link from 'next/link';
import OrderDetail from '@components/profile/client/orders/OrderDetail';
import { Models } from 'utilities-techsweave';
import OrderedProductsMock from '@test/OrderedProductsMock';
import { getTotal } from '@test/OrderedProductsMock';

const OrdersTable = (prop: { ordersList: Models.Tables.IOrder[] }) => {
    const { ordersList } = prop;
    const total = getTotal();
    return (
        <Table variant="simple">
            <TableCaption>Orders</TableCaption>
            <Thead>
                <Tr>
                    <Th>Order ID</Th>
                    <Th>Date</Th>
                    <Th>Total €</Th>
                    <Th>Detail</Th>
                </Tr>
            </Thead>
            <Tbody>
                {ordersList.map((orders) => (
                    <Tr>
                        <Td>{orders.id}</Td>
                        <Td>{orders.date.getDate()}-{orders.date.getMonth() + 1}-{orders.date.getFullYear()}</Td>
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
    );
}
export default OrdersTable;

{/* <Accordion defaultIndex={[1]} allowMultiple>
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left" mr={10}>
                                            {orders.id} order's detail
                                        </Box>
                                        <Box flex="1" display={['flex','none','none','none']}>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                    <AccordionPanel>
                                        <OrderDetail products={orders.products} />
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion> */}