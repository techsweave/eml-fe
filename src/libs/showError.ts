import { useToast } from '@chakra-ui/react';

export default function showError(error?: Error): void {
  const toast = useToast();
  if (!error) return;
  toast({
    title: error.name,
    description: error.message,
    status: 'error',
    duration: 10000,
    isClosable: true,
    position: 'top-right',
  });
}
