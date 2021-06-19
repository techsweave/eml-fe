import { Models, Services } from 'utilities-techsweave';
import React from 'react';
import { Image, VStack } from '@chakra-ui/react';
import { Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';

const ProductDetail = (prop: { product: Models.Tables.IProduct }) => {
  const { product } = prop;
  const handleClick = async () => {
    const caller = new Services.Carts(`${process.env.NEXT_PUBLIC_API_ID_CART}`, `${process.env.NEXT_PUBLIC_API_REGION}`, `${process.env.NEXT_PUBLIC_API_STAGE}`, 'eyJraWQiOiJWSVA1Tk5QTm1HZHVNR244Tlo5OVBTM2JzWWNlSXpiRmx6STJYVEFuSkJnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNmJkZWNjZC1jM2NhLTRkNWUtYTg0Zi0yODBiMjMwYzI1NjAiLCJldmVudF9pZCI6ImUzZGFmYzkyLTQ2NTEtNDQ3NS1hNjgwLTYwYWQ4ZjFkMGU3YyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2MjQwMjUwNTksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbVwvZXUtY2VudHJhbC0xX2VjaUVVdnd6cCIsImV4cCI6MTYyNDAyODY1OSwiaWF0IjoxNjI0MDI1MDU5LCJ2ZXJzaW9uIjoyLCJqdGkiOiI2YThiMmM5MC0yZDYwLTRlNTUtYmViMC01N2VjNDlhNzBlMzgiLCJjbGllbnRfaWQiOiI3djA5ZGxkYTdyNXBqbmpjaXVsN2c4anJhaCIsInVzZXJuYW1lIjoidGVzdGN1c3RvbWVyIn0.6Y5P8V2CCY_ZPyHc2eUsqLGzMsA4vcUvdpqnHYI-FnpZAkwqQHsH5ShTJg2dI9mqPOzPtxlL_xP0Frp_HX9QkCiv2K7jJSZvPXKPH2hNLweIx0k5wbhWrSp1DadHEK20LoVOKqno2iJj8zIAxRxafG_wVOpm-C0_kvhQQa7u3sqboGx-wF_mrk_xBQxIQfwA8o6GQ7HzMy_sYjwZAO1PupvYUZgqqK_3XHVta83QyTL8W_tup_D1GYYmqlyu6UEfRwvv0UDjivX5hNr3A6u15sJAd_dpn-IXpOEfibD3wy4yqWtw6J6kPGV517qt1Z_ZWvTw_agCbSUIguvsblOK8w', 'eyJraWQiOiJiWENiOVF2cW9TWG1xaHBJanAyMHR6UkRBSDliT1dtZ200YjBQTDk0ekc0PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoidm1wMTBld184eXduTE9rV3R5UVNZQSIsInN1YiI6ImQ2YmRlY2NkLWMzY2EtNGQ1ZS1hODRmLTI4MGIyMzBjMjU2MCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYWRkcmVzcyI6eyJmb3JtYXR0ZWQiOiJ2aWEgbHVpZ2kgMjUifSwiYmlydGhkYXRlIjoiMDJcLzEyXC8xOTI1IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfZWNpRVV2d3pwIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6InRlc3RjdXN0b21lciIsImF1ZCI6Ijd2MDlkbGRhN3I1cGpuamNpdWw3ZzhqcmFoIiwiZXZlbnRfaWQiOiJlM2RhZmM5Mi00NjUxLTQ0NzUtYTY4MC02MGFkOGYxZDBlN2MiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTYyNDAyNTA1OSwibmFtZSI6IkN1c3RvbWVyIiwicGhvbmVfbnVtYmVyIjoiKzM5MzQ2MTIzNDU2NyIsImV4cCI6MTYyNDAyODY1OSwiaWF0IjoxNjI0MDI1MDU5LCJmYW1pbHlfbmFtZSI6IlJvc3NpIiwiZW1haWwiOiJwYXhpa2U5NTgwQGptcGFudC5jb20ifQ.mm-QzhRx-O49lJ6vfRc8mJN1-mESpsMrBXX2mOuVGQ5WTSVo5PINwI-j5UBfjwU6ogR2Vz9Hof2n7TtfAkSI23xlz6zBRszpUm9vYL9-yoqS783vGzBrawdbp7pJ3xdIdPDX-r5B-KCK5wq_MmoqAFjwnAZf8fkOaEhLzioNLUEurjB8Xb7m4fJpl8M_4kA_Z8y5sdHX_pGlt0sqa9fk0685G5keekst0kHHnR6n3g_TRzvoSqVwmCferAnbvDKRxKAY_Z1V-WfMY4R33d0PYwWpijk5HgBpJb23fvo7FK-KYy-L0ifXgjrKnTzWj70vZRMNuz80K5uhoZdYUj0FUg');
    const addProduct = caller.addProductAsync(product.id, 1);
  };
  return (
    <Flex w="95%" direction={['column', 'column', 'row', 'row']} alignSelf="center">
      <Button as="a" href="/products" ml={['0', '0', '2,5', '2,5']} mb={['5', '5', '0', '0']} w="100px" mr={['0', '0', '20', '20']} leftIcon={<ArrowBackIcon />} bg='gray.100'>back</Button>
      <Image src={product.imageURL} fallbackSrc='/images/fallback.png' alt={product.title} w="500px" h="300px" borderRadius="15px" fit='scale-down' />
      <VStack flexBasis="50%" alignSelf="center">
        <Heading as="h2">
          {product.title}
        </Heading>
        <p>
          {product.description}
        </p>
      </VStack>
      <VStack ml={['0', '0', '10', '10']} alignSelf="center">
        <p>
          Price:
          {product.price}
        </p>
        <Button onClick={handleClick}>Add to Cart</Button>
      </VStack>
    </Flex>
  );
};

export default ProductDetail;
