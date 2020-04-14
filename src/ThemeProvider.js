/**
 * @Author: Martin Adamko <martinadamko.sk@gmail.com>
 * @Date: 2019-10-13T13:10:01+02:00
 * @Copyright: Martin Adamko
 * @flow
**/

import * as React from 'react'

import { ThemeContext } from './ThemeContext'

type ThemeProviderProps = $Exact<{
  children: React.Node,
  theme: string | [string, string],
}>

export function ThemeProvider ({ children, theme }: ThemeProviderProps) {
  const light = typeof theme === 'string' ? theme : theme[0]
  const dark = typeof theme === 'string' ? theme : theme[1]

  const value = React.useMemo(() => [{
    light,
    dark,
  }], [light, dark])

  return <ThemeContext.Provider
    value={value}
  >
    {children}
  </ThemeContext.Provider>
}
