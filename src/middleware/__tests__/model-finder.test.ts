import modelFinder from '../model-finder'

describe('modelFinder', () => {
  const req: any = { params: { model: 'app-info' } }
  const res: any = {}
  const next: any = jest.fn()

  beforeAll(() => {
    modelFinder(req, res, next)
  })

  it('should append an object to the request as a `model` property', () => {
    expect(req.model).toBeDefined()
  })

  it('should call the `next` function', () => {
    modelFinder(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
