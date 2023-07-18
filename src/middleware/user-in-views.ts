// tslint:disable
export default function() {
  return function(req: any, res: any, next: any) {
    res.locals.user = req.user
    next()
  }
}
