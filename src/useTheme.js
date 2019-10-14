/**
 * @Author: Martin Adamko <martinadamko.sk@gmail.com>
 * @Date: 2019-10-13T12:10:00+02:00
 * @Copyright: Martin Adamko
 * @flow
**/

import * as React from 'react'

import { ThemeContext } from './ThemeContext'

const emptyContext = [Object.freeze({
  light: undefined,
  dark: undefined,
})]

export function useTheme () {
  const context = React.useContext(ThemeContext)

  const [theme] = context || emptyContext

  return [
    theme.light,
    theme.dark,
  ]
}
