import React from 'react';
import {render} from '@testing-library/react-native';
import {ThemedView} from '../ThemedView';
import {useThemeColor} from '../../hooks/theme/useThemeColor';

jest.mock('../../hooks/theme/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('ThemedView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default light color', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#ffffff');

    const {getByTestId} = render(<ThemedView testID="themed-view" />);

    const viewElement = getByTestId('themed-view');
    expect(viewElement).toBeTruthy();

    expect(viewElement.props.style).toEqual(
      expect.arrayContaining([{backgroundColor: '#ffffff'}]),
    );
  });

  it('renders with default dark color', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#000000');

    const {getByTestId} = render(<ThemedView testID="themed-view" />);

    const viewElement = getByTestId('themed-view');
    expect(viewElement).toBeTruthy();

    expect(viewElement.props.style).toEqual(
      expect.arrayContaining([{backgroundColor: '#000000'}]),
    );
  });

  it('applies custom light and dark colors', () => {
    (useThemeColor as jest.Mock)
      .mockReturnValueOnce('#ffffff')
      .mockReturnValueOnce('#000000');

    const {getByTestId, rerender} = render(
      <ThemedView
        lightColor="#ffffff"
        darkColor="#000000"
        testID="themed-view"
      />,
    );

    const viewElement = getByTestId('themed-view');

    expect(viewElement.props.style).toEqual(
      expect.arrayContaining([{backgroundColor: '#ffffff'}]),
    );

    rerender(
      <ThemedView
        lightColor="#ffffff"
        darkColor="#000000"
        testID="themed-view"
      />,
    );

    expect(viewElement.props.style).toEqual(
      expect.arrayContaining([{backgroundColor: '#000000'}]),
    );
  });

  it('accepts additional styles', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#ffffff');

    const {getByTestId} = render(
      <ThemedView style={{padding: 20}} testID="themed-view" />,
    );

    const viewElement = getByTestId('themed-view');

    expect(viewElement.props.style).toEqual(
      expect.arrayContaining([{padding: 20}, {backgroundColor: '#ffffff'}]),
    );
  });
});
