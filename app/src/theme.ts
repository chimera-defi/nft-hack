import { mergePartial, RecursivePartial } from '@kibalabs/core';
import { buildTheme, IButtonTheme, IIconButtonTheme, ITheme, mergeTheme, mergeThemePartial, ThemeMap } from '@kibalabs/ui-react';

export const defaultTheme = buildTheme();
export const buildMDTPTheme = (): ITheme => {
  const colors = {
    ...defaultTheme.colors,
    // brandPrimary: '#B5179E',
    // brandSecondary: '#4895EF',
  };

  const textThemes = {
    ...defaultTheme.texts,
    default: mergeTheme(defaultTheme.texts.default, {
      'font-family': "'Roboto Slab', sans-serif",
      'font-weight': '400',
      'overflow-wrap': 'anywhere',
    }),
    header6: {
      'font-size': '1em',
      color: '$colors.textLight25',
    },
    light: {
      color: 'rgba(255, 255, 255, 0.95)',
    },
    preheading: {
      'text-transform': 'uppercase',
      'font-weight': 'bold',
    },
    uppercase: {
      'text-transform': 'uppercase',
    },
  };

  const overlayBoxTheme = {
    'background-color': 'rgba(255, 255, 255, 0.65)',
    'backdrop-filter': 'blur(3px)',
    'border-radius': '0.75em',
    margin: '0.5em',
  };

  const boxThemes = {
    ...defaultTheme.boxes,
    overlay: overlayBoxTheme,
    overlayDialog: mergePartial(overlayBoxTheme, {
      'background-color': 'rgba(255, 255, 255, 0.85)',
    }),
    horizontal: {
      padding: '0.5em 1em',
    },
    fomoBar: {
      'border-radius': '0',
      'background-color': 'black',
    },
    fomoBarFill: {
      'border-radius': '0',
      'background-image': 'linear-gradient(to right, #B5179E, #4895EF)',
    },
    fomoBarPartial: {
      'border-radius': '0 0.2em 0.2em 0',
    },
    vertical: {
      padding: '1em 0.5em',
    },
    topLeftCutoff: {
      'border-radius': '1em 0 0 0',
    },
    bottomLeftCutoff: {
      'border-radius': '0 0 0 1em',
    },
    tokenHeader: mergeThemePartial(defaultTheme.boxes.card, {
      'border-radius': '0',
      margin: '0',
    }),
    homePanel: {
      'background-color': '$colors.background',
      'border-radius': '0 1em 1em 0',
      'box-shadow': 'rgb(50 50 93 / 25%) 13px 0 27px -5px, rgb(0 0 0 / 30%) 8px 0 16px -8px',
    },
    panelButtonHolder: {
      margin: '0.5em 1em',
    },
  };

  const imageThemes = {
    ...defaultTheme.images,
    tokenPageHeaderGrid: {
      background: {
        'border-radius': '0',
      },
    },
  };

  const buttonThemes: RecursivePartial<ThemeMap<IButtonTheme>> = {
    default: {
      disabled: {
        default: {
          background: {
            'border-color': '$colors.backgroundDark25',
          },
          text: {
            color: '$colors.backgroundDark25',
          },
        },
      },
    },
    overlay: {
      normal: {
        default: {
          background: mergeThemePartial(overlayBoxTheme, {
            'background-color': 'rgba(255, 255, 255, 0.75)',
            margin: '0',
          }),
        },
        hover: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.85)',
          },
          text: {
            color: '$colors.text',
          },
        },
        press: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.95)',
          },
          text: {
            color: '$colors.text',
          },
        },
      },
    },
  };

  const iconButtonThemes: RecursivePartial<ThemeMap<IIconButtonTheme>> = {
    default: {
      normal: {
        default: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.75)',
            'backdrop-filter': overlayBoxTheme['backdrop-filter'],
          },
        },
        hover: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },
    secondary: {
      normal: {
        default: {
          background: {
            'background-color': 'transparent',
            'border-width': '0',
            'backdrop-filter': 'none',
          },
        },
        hover: {
          background: {
            'background-color': 'rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },
  };

  const theme = buildTheme({
    colors,
    fonts: {
      main: {
        url: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700,800,900&display=swap',
      },
    },
    texts: textThemes,
    boxes: boxThemes,
    images: imageThemes,
    buttons: buttonThemes,
    iconButtons: iconButtonThemes,
  });
  return theme;
};
