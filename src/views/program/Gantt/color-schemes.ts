type Color = NamedColor | DeprecatedSystemColor | 'currentcolor' | (string & {})
type NamedColor =
  | 'aliceblue'
  | 'antiquewhite'
  | 'aqua'
  | 'aquamarine'
  | 'azure'
  | 'beige'
  | 'bisque'
  | 'black'
  | 'blanchedalmond'
  | 'blue'
  | 'blueviolet'
  | 'brown'
  | 'burlywood'
  | 'cadetblue'
  | 'chartreuse'
  | 'chocolate'
  | 'coral'
  | 'cornflowerblue'
  | 'cornsilk'
  | 'crimson'
  | 'cyan'
  | 'darkblue'
  | 'darkcyan'
  | 'darkgoldenrod'
  | 'darkgray'
  | 'darkgreen'
  | 'darkgrey'
  | 'darkkhaki'
  | 'darkmagenta'
  | 'darkolivegreen'
  | 'darkorange'
  | 'darkorchid'
  | 'darkred'
  | 'darksalmon'
  | 'darkseagreen'
  | 'darkslateblue'
  | 'darkslategray'
  | 'darkslategrey'
  | 'darkturquoise'
  | 'darkviolet'
  | 'deeppink'
  | 'deepskyblue'
  | 'dimgray'
  | 'dimgrey'
  | 'dodgerblue'
  | 'firebrick'
  | 'floralwhite'
  | 'forestgreen'
  | 'fuchsia'
  | 'gainsboro'
  | 'ghostwhite'
  | 'gold'
  | 'goldenrod'
  | 'gray'
  | 'green'
  | 'greenyellow'
  | 'grey'
  | 'honeydew'
  | 'hotpink'
  | 'indianred'
  | 'indigo'
  | 'ivory'
  | 'khaki'
  | 'lavender'
  | 'lavenderblush'
  | 'lawngreen'
  | 'lemonchiffon'
  | 'lightblue'
  | 'lightcoral'
  | 'lightcyan'
  | 'lightgoldenrodyellow'
  | 'lightgray'
  | 'lightgreen'
  | 'lightgrey'
  | 'lightpink'
  | 'lightsalmon'
  | 'lightseagreen'
  | 'lightskyblue'
  | 'lightslategray'
  | 'lightslategrey'
  | 'lightsteelblue'
  | 'lightyellow'
  | 'lime'
  | 'limegreen'
  | 'linen'
  | 'magenta'
  | 'maroon'
  | 'mediumaquamarine'
  | 'mediumblue'
  | 'mediumorchid'
  | 'mediumpurple'
  | 'mediumseagreen'
  | 'mediumslateblue'
  | 'mediumspringgreen'
  | 'mediumturquoise'
  | 'mediumvioletred'
  | 'midnightblue'
  | 'mintcream'
  | 'mistyrose'
  | 'moccasin'
  | 'navajowhite'
  | 'navy'
  | 'oldlace'
  | 'olive'
  | 'olivedrab'
  | 'orange'
  | 'orangered'
  | 'orchid'
  | 'palegoldenrod'
  | 'palegreen'
  | 'paleturquoise'
  | 'palevioletred'
  | 'papayawhip'
  | 'peachpuff'
  | 'peru'
  | 'pink'
  | 'plum'
  | 'powderblue'
  | 'purple'
  | 'rebeccapurple'
  | 'red'
  | 'rosybrown'
  | 'royalblue'
  | 'saddlebrown'
  | 'salmon'
  | 'sandybrown'
  | 'seagreen'
  | 'seashell'
  | 'sienna'
  | 'silver'
  | 'skyblue'
  | 'slateblue'
  | 'slategray'
  | 'slategrey'
  | 'snow'
  | 'springgreen'
  | 'steelblue'
  | 'tan'
  | 'teal'
  | 'thistle'
  | 'tomato'
  | 'transparent'
  | 'turquoise'
  | 'violet'
  | 'wheat'
  | 'white'
  | 'whitesmoke'
  | 'yellow'
  | 'yellowgreen'

type DeprecatedSystemColor =
  | 'ActiveBorder'
  | 'ActiveCaption'
  | 'AppWorkspace'
  | 'Background'
  | 'ButtonFace'
  | 'ButtonHighlight'
  | 'ButtonShadow'
  | 'ButtonText'
  | 'CaptionText'
  | 'GrayText'
  | 'Highlight'
  | 'HighlightText'
  | 'InactiveBorder'
  | 'InactiveCaption'
  | 'InactiveCaptionText'
  | 'InfoBackground'
  | 'InfoText'
  | 'Menu'
  | 'MenuText'
  | 'Scrollbar'
  | 'ThreeDDarkShadow'
  | 'ThreeDFace'
  | 'ThreeDHighlight'
  | 'ThreeDLightShadow'
  | 'ThreeDShadow'
  | 'Window'
  | 'WindowFrame'
  | 'WindowText'
// type Color = CSS.DataType.Color

export type ColorScheme = {
  primary: Color
  secondary: Color
  ternary: Color
  quartenary: Color
  hoverHighlight: Color
  markerCurrentTime: Color
  text: Color
  background: Color
  toast?: Color
}

export const colorSchemes: Record<string, ColorScheme> = {
  default: {
    primary: '#eeeeee',
    secondary: '#E0E0E0',
    ternary: '#F5F5F5',
    quartenary: '#ededed',
    hoverHighlight: 'rgba(204, 216, 219, 0.5)',
    markerCurrentTime: '#000',
    text: '#404040',
    background: 'white'
  },

  creamy: {
    primary: '#ffe8d9',
    secondary: '#fcdcc5',
    ternary: '#fff6f0',
    quartenary: '#f7ece6',
    hoverHighlight: 'rgba(230, 221, 202, 0.5)',
    markerCurrentTime: '#000',
    text: '#542d05',
    background: 'white'
  },

  crimson: {
    primary: '#a82039',
    secondary: '#c41238',
    ternary: '#db4f56',
    quartenary: '#ce5f64',
    hoverHighlight: 'rgba(196, 141, 141, 0.5)',
    markerCurrentTime: '#000',
    text: 'white',
    background: 'white'
  },

  dark: {
    primary: '#404040',
    secondary: '#303030',
    ternary: '#353535',
    quartenary: '#383838',
    hoverHighlight: 'rgba(159, 160, 161, 0.5)',
    markerCurrentTime: '#fff',
    text: 'white',
    background: '#525252',
    toast: '#1f1f1f'
  },

  flare: {
    primary: '#e08a38',
    secondary: '#e67912',
    ternary: '#5e5145',
    quartenary: '#665648',
    hoverHighlight: 'rgba(196, 141, 141, 0.5)',
    markerCurrentTime: '#000',
    text: 'white',
    background: 'white'
  },

  fuchsia: {
    primary: '#de1d5a',
    secondary: '#b50b41',
    ternary: '#ff7da6',
    quartenary: '#f2799f',
    hoverHighlight: 'rgba(196, 141, 141, 0.5)',
    markerCurrentTime: '#000',
    text: 'white',
    background: 'white'
  },

  grove: {
    primary: '#3d9960',
    secondary: '#288542',
    ternary: '#72b585',
    quartenary: '#65a577',
    hoverHighlight: 'rgba(160, 219, 171, 0.5)',
    markerCurrentTime: '#000',
    text: 'white',
    background: 'white'
  },

  'material-blue': {
    primary: '#0D47A1',
    secondary: '#1565C0',
    ternary: '#42a5f5',
    quartenary: '#409fed',
    hoverHighlight: 'rgba(110, 165, 196, 0.5)',
    markerCurrentTime: '#000',
    text: 'white',
    background: 'white'
  },

  sky: {
    primary: '#b5e3ff',
    secondary: '#a1d6f7',
    ternary: '#d6f7ff',
    quartenary: '#d0edf4',
    hoverHighlight: 'rgba(193, 202, 214, 0.5)',
    markerCurrentTime: '#000',
    text: '#022c47',
    background: 'white'
  },

  slumber: {
    primary: '#2a2f42',
    secondary: '#2f3447',
    ternary: '#35394d',
    quartenary: '#2c3044',
    hoverHighlight: 'rgba(179, 162, 127, 0.5)',
    markerCurrentTime: '#fff',
    text: '#ffe0b3',
    background: '#38383b',
    toast: '#1f1f1f'
  },

  vue: {
    primary: '#258a5d',
    secondary: '#41B883',
    ternary: '#35495E',
    quartenary: '#2a3d51',
    hoverHighlight: 'rgba(160, 219, 171, 0.5)',
    markerCurrentTime: '#000',
    text: 'white',
    background: 'white'
  }
}

export type ColorSchemeKey = keyof typeof colorSchemes

export default colorSchemes
