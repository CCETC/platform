
import routes from './admin'
import { match } from 'react-router'
import path from 'path'

const client = (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.sendFile(path.resolve('./src/public/index.html'))
    } else {
      res.status(404).send('Not found')
    }
  })
}

export default client
