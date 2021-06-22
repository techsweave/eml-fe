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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { VscChevronRight } from 'react-icons/vsc';
import OrderDetail from '@components/profile/orders/OrderDetail';
import { Models } from 'utilities-techsweave';
import OrderedProductsMock from '@test/OrderedProductsMock';

const OrdersTable = (prop: { ordersList: Models.Tables.IOrder[] }) => {
    const { ordersList } = prop;
    return (
        <Table variant="simple" mt={5}>
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
                        <Td>{orders.date.getDate()}-{orders.date.getMonth()+1}-{orders.date.getFullYear()}</Td>
                        <Td>totale</Td>
                        <Td><Popover placement="right" arrowSize={15}>
                            <PopoverTrigger>
                                <Td><IconButton aria-label="Detail" icon={<VscChevronRight />} size="sm" /></Td>
                            </PopoverTrigger>
                            <PopoverContent ml={10} w="fit-content">
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>{orders.id} Detail</PopoverHeader>
                                <PopoverBody><OrderDetail /></PopoverBody>
                            </PopoverContent>
                        </Popover></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}
export default OrdersTable;
