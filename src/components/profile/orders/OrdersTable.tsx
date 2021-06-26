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
import OrderDetail from '@components/profile/orders/OrderDetail';
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
                        <Td display={['none','none','none','flex']}>
                            <Accordion defaultIndex={[1]} allowMultiple>
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
                            </Accordion>
                            {/* <IconButton /> */}
                        </Td>
                        <Td display={['flex','flex','flex','none']}>
                            <Popover placement="auto" arrowSize={15}>
                            <PopoverTrigger>
                                <Td><IconButton aria-label="Detail" icon={<VscChevronRight />} size="sm" /></Td>
                            </PopoverTrigger>
                            <PopoverContent ml={10} w="fit-content">
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>{orders.id} Detail</PopoverHeader>
                                <PopoverBody><OrderDetail products={orders.products}/></PopoverBody>
                            </PopoverContent>
                        </Popover>
                        </Td>
                    </Tr>                        
                ))}
            </Tbody>
        </Table>
    );
}
export default OrdersTable;

