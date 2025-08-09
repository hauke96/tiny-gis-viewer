/**
 * Moves the given element one place down in the given array. This creates a shallow copy of the input array and returns
 * the array with the given element moved one index down. If the element doesn't exist, the original array is returned.
 */
export function moveElementDown<T>(elements: T[], elementToMoveDown: T): T[] {
  let elementsCopy = elements.slice();
  let indexOfElementToMove = elementsCopy.indexOf(elementToMoveDown);

  // When last element should be moved -> Return original array
  if (indexOfElementToMove === elements.length - 1) {
    return elements;
  }

  // If element not found -> Return original array
  if (indexOfElementToMove === -1 || indexOfElementToMove == elementsCopy.length - 1) {
    return elements;
  }

  // Swap elements
  elementsCopy[indexOfElementToMove] = elementsCopy[indexOfElementToMove + 1];
  elementsCopy[indexOfElementToMove + 1] = elementToMoveDown;

  return elementsCopy;
}
