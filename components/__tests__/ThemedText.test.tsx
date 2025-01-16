import React from 'react';
import {render} from '@testing-library/react-native';
import {ThemedText} from '../ThemedText';
import {useThemeColor} from '../../hooks/theme/useThemeColor';

jest.mock('../../hooks/theme/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('ThemedText', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default type and applies correct color', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#000000');

    const {getByText} = render(<ThemedText>Default Text</ThemedText>);

    const textElement = getByText('Default Text');
    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([{color: '#000000'}]),
    );
  });

  it('renders with title type and applies correct styles', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#000000');

    const {getByText} = render(
      <ThemedText type="title">Title Text</ThemedText>,
    );

    const textElement = getByText('Title Text');
    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        {fontSize: 32, fontWeight: 'bold', lineHeight: 32},
      ]),
    );
  });

  it('renders with subtitle type and applies correct styles', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#000000');

    const {getByText} = render(
      <ThemedText type="subtitle">Subtitle Text</ThemedText>,
    );

    const textElement = getByText('Subtitle Text');
    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([{fontSize: 20, fontWeight: 'bold'}]),
    );
  });

  it('applies custom light and dark colors', () => {
    (useThemeColor as jest.Mock)
      .mockReturnValueOnce('#ffffff')
      .mockReturnValueOnce('#000000');

    const {getByText, rerender} = render(
      <ThemedText lightColor="#ffffff" darkColor="#000000">
        Themed Color Text
      </ThemedText>,
    );

    const textElement = getByText('Themed Color Text');

    expect(textElement.props.style).toContainEqual({color: '#ffffff'});

    rerender(
      <ThemedText lightColor="#ffffff" darkColor="#000000">
        Themed Color Text
      </ThemedText>,
    );

    expect(textElement.props.style).toContainEqual({color: '#000000'});
  });

  it('accepts additional styles', () => {
    (useThemeColor as jest.Mock).mockReturnValue('#000000');

    const {getByText} = render(
      <ThemedText style={{margin: 10}}>Styled Text</ThemedText>,
    );

    const textElement = getByText('Styled Text');

    expect(textElement.props.style).toContainEqual({margin: 10});
  });
});
