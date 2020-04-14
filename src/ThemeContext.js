/**
 * @Author: Martin Adamko <martinadamko.sk@gmail.com>
 * @Date: 2019-10-13T13:10:98+02:00
 * @Copyright: Martin Adamko
 * @flow
**/

import * as React from 'react'

type Theme = {
  dark: string,
  light: string,
}

type ThemeContextType = [
  Theme,
]

export const ThemeContext = React.createContext<ThemeContextType | typeof undefined>(undefined)
