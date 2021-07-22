import React, { useEffect, useState } from 'react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';

interface Item {
  label: string;
  value: string;
}
const init: Array<Item> = [];
const SelectWithText = (prop: { items: Item[] }) => {
  const { items } = prop;
  const [pickerItems, setPickerItems] = React.useState(items);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  return (
    <CUIAutoComplete
      label="Choose preferred work locations"
      placeholder="Type a Category"
      onCreateItem={handleCreateItem}
      items={pickerItems}
      selectedItems={selectedItems}
      onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
    />
  );
};
export default SelectWithText;
