import {moveElementDown} from './array-helper';

describe('Array helper', () => {
  it('should move element correctly down', () => {
    // Arrange
    const list = ['A', 'B', 'C', 'D'];

    // Act
    const result = moveElementDown(list, 'B');

    // Assert
    expect(result).toEqual(['A', 'C', 'B', 'D']);
  });

  it('should not move last element down', () => {
    // Arrange
    const list = ['A', 'B', 'C', 'D'];

    // Act
    const result = moveElementDown(list, 'D');

    // Assert
    expect(result).toEqual(['A', 'B', 'C', 'D']);
  });

  it('should not fail when moving not existing element down', () => {
    // Arrange
    const list = ['A', 'B', 'C', 'D'];

    // Act
    const result = moveElementDown(list, 'Z');

    // Assert
    expect(result).toEqual(['A', 'B', 'C', 'D']);
  });

  it('should not fail when moving element down on empty list', () => {
    // Arrange
    const list: string[] = [];

    // Act
    const result = moveElementDown(list, 'D');

    // Assert
    expect(result).toEqual([]);
  });
});
