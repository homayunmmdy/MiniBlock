// Method to update the inventory slot
export const UpdateInventorySlot = (
  Count : number,
  name: string,
): void => {
  const Slot = document.querySelector(
    `.slot[data-${name}-count]`
  ) as HTMLElement;
  if (Slot) {
    Slot.dataset.bushCount = Count.toString();
    const Element = Slot.querySelector(`.${name}-count`) as HTMLElement;
    if (Element) {
      Element.textContent = Count.toString();
    }
  }
};
