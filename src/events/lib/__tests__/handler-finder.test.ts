import { lorem } from 'faker'
const { word } = lorem

import handlerFinder from '../handler-finder'

describe('`handlerFinder` function', () => {
  it('should return the export from an existing handler on a valid `cmd` argument', async () => {
    const result = await handlerFinder('about')
    expect(result.default.name).toBe('about')
  })

  it('should return a fallback handler on an invalid `cmd` argument', async () => {
    const invalid = word()
    const result = await handlerFinder(invalid)
    expect(result.default.name).toBe('fallback')
  })
})
