# react-dual-theme
A dual theme context for React (Native) apps to support dark mode purposes.

## ✨ Installation

Install package:

```
yarn add react-dual-theme
```

or

```
npm install react-dual-theme
```

---

## 📖 Reference

### ThemeProvider

> A component used to set theme for its children.

Prop  | Type                          | Required
------|-------------------------------|---------
theme |`string` or `[string, string]` | yes

Passing a single `string` to the `theme` prop is considered same as
passing a tuple of the same string as `[string, string]`.

### useTheme(): [string, string]

> A React hook to be used in functional components to get theme
> from the nearest ThemeProvider parent.

Returns tuple of strings.

\#    | Type     | Description
------|----------|------------------
`[0]` | `string` | First theme name
`[1]` | `string` | Second theme name

---

## 🚀 Usage

1. Wrap your app in `<ThemeProvider>...</ThemeProvider>`:

```js
// ./App.js
// Example with Dark Mode
import { ThemeProvider } from 'react-dual-theme'
import { DarkModeProvider } from 'react-native-dark-mode'

import { Text, View } from './ThemedComponents'

const App = () => {
  return (
    <DarkModeProvider>
      <ThemeProvider theme={['red-on-light', 'red-on-dark']}>
        <View>
          <Text>Hello themed text!</Text>
        </View>
      </ThemeProvider>
    </DarkModeProvider>
}
```

2. Create component to consume the theme context:

```js
// ./ThemedComponents.js
// @flow
import * as React from 'react'
import {
  StyleSheet,
  View as RNView,
  Text as RNText,
} from 'react-native'
import { useTheme } from 'react-dual-theme'
import { useDarkMode } from 'react-native-dark-mode'

const viewStyles = StyleSheet.create({
  'red-on-dark': { backgroundColor: 'black' },
  'red-on-light': { backgroundColor: 'white' },
})

// Type just for example purposes:
declare type Style = null | Object | (null | Object | Style)[];

type Props = {
  children?: React.Node,
  style?: Style,
}

export const View = ({ children, style, ...rest }: Props) => {
  const [light, dark] = useTheme()
  const isDarkMode: boolean = useDarkMode()

  // Add some theming logic..
  const themeStyle = isDarkMode ? viewStyles[dark] : viewStyles[light]

  return <RNView
    {...rest}
    style={[themeStyle, style]}
  >
    {children}
  </RNView>
}

const textStyles = StyleSheet.create({
  'red-on-dark': { color: 'red' },
  'red-on-light': { color: 'red' },
})

export const Text = ({ children, style, ...rest }: Props) => {
  const [light, dark] = useTheme()
  const isDarkMode: boolean = useDarkMode()

  // Add some theming logic..
  const themeStyle = isDarkMode ? textStyles[dark] : textStyles[light]

  return <RNText
    {...rest}
    style={[themeStyle, style]}
  >
    {children}
  </RNText>
}

```

3. **Extra:** View as a _ThemeProvider_

You can simply make a `<View />` component a theme provider in the same time:

```js
import { ThemeProvider, useTheme } from 'react-dual-theme'

type Props = {
  children?: React.Node,
  style?: Style,
  theme: string | [string, string],
}

export const View = ({ children, style, theme, ...rest }: Props) => {
  const Component = <RNView
      // ...
    />

  return theme // Provide new theme context when needed
    ? <ThemeProvider theme={theme}><Component /></ThemeProvider>
    : <Component />
}
```

---

## 🔧 Using Flow definitions & Setting up your .flowconfig

**This package has `.js.flow` files to let Flow use type definitions. However, most projects ignore everything under `node_modules` to skip type-checking dependencies.**

To be able to use types included inside of packages, consider moving `<PROJECT_ROOT>/node_modules/.*` from `[ignore]` to `[untyped]` section. This way Flow can wak through the `node_modules` but exports as `any`.

Best part is you don't need to generate empty definitions using [flow-typed create-stub](https://github.com/flow-typed/flow-typed/wiki/CLI-Commands-and-Flags#create-stub) anymore.


### Edit your .flowconfig

1. Remove `node_modules` from the `[ignore]` section:

   ```ini
   [ignore]
   ; <PROJECT_ROOT>/node_modules/.* ; <<< you should not need this
   ```

1. Add `node_modules` to `[untyped]` section:

   ```ini
   [untyped]
   <PROJECT_ROOT>/node_modules/.* ; <<< export every module as any by default
   !<PROJECT_ROOT>/node_modules/react-dual-theme/.* ; <<< exception
   ```

1. Add `react-dual-theme` to `[declarations]` section:

   ```ini
   [declarations]
   <PROJECT_ROOT>/node_modules/react-dual-theme/.* ; <<< use types from .flow.js files
   ```
1. Flow should be now able to get through the package typings.
1. Profit 🎉

---

## 🚧 Typescript _(needs testing)_

This package includes TypeScript definition `index.d.ts` file.

---

## Licence: MIT

 [@martin_adamko](https://twitter.com/martin_adamko) 🐤
