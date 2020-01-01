import { MouseEvent } from "react";

export type Selectable<I extends string | number> = { id: I };

const findLastIndex = <T extends {}>(
  arr: Array<T>,
  predicate: (value: T, index: number) => boolean
) => {
  if (arr.length === 0) {
    return -1;
  }

  let index = arr.length - 1;

  do {
    if (predicate(arr[index], index)) {
      return index;
    }
  } while ((index -= 1) > 0);

  return -1;
};

export const createSelectionHandler = <
  T extends Selectable<I>,
  I extends string | number,
  E extends HTMLElement
>(
  items: T[],
  selection: I[],
  selectionMap: { [key: string]: boolean; [key: number]: boolean },
  updateSelection: (selectedIds: I[]) => void,
  parseId: (id: string) => I = id => id as I
) => (event: MouseEvent<E>) => {
  const clickedId = parseId(event.currentTarget.id);

  if (event.ctrlKey) {
    return updateSelection(toggleSelection(selection, selectionMap, clickedId));
  }

  if (event.shiftKey) {
    return resizeSelection(items, selectionMap, clickedId);
  }

  updateSelection([clickedId]);
};

const toggleSelection = <I extends string | number>(
  selection: I[],
  selectionMap: { [key: string]: boolean; [key: number]: boolean },
  id: I
) =>
  selectionMap[id] ? selection.filter(cmp => cmp !== id) : [...selection, id];

const resizeSelection = <T extends Selectable<I>, I extends string | number>(
  items: T[],
  selectionMap: { [key: string]: boolean; [key: number]: boolean },
  id: I
) => {
  const clickedIndex = items.findIndex(item => item.id === id);
  const firstSelectedIndex = items.findIndex(item => selectionMap[item.id]);
  const lastSelectedIndex = findLastIndex(items, item => selectionMap[item.id]);

  if (clickedIndex < firstSelectedIndex || clickedIndex > lastSelectedIndex) {
    return growSelection(
      items,
      clickedIndex,
      firstSelectedIndex,
      lastSelectedIndex
    );
  }

  return shrinkSelection(
    items,
    clickedIndex,
    firstSelectedIndex,
    lastSelectedIndex
  );
};

const growSelection = <T extends Selectable<I>, I extends string | number>(
  items: T[],
  clickedIndex: number,
  first: number,
  last: number
) =>
  items
    .slice(Math.min(clickedIndex, first), Math.max(clickedIndex, last) + 1)
    .map(item => item.id);

const shrinkSelection = <T extends Selectable<I>, I extends string | number>(
  items: T[],
  clickedIndex: number,
  first: number,
  last: number
) => {
  // Shrink selection based on shortest delta
  let deltaStart = clickedIndex - first;
  let deltaEnd = last - clickedIndex;

  if (deltaStart < deltaEnd) {
    return items.slice(clickedIndex, last + 1).map(photo => photo.id);
  }

  return items.slice(first, clickedIndex + 1).map(photo => photo.id);
};
