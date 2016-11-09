import rest from 'rest'
import mime from 'rest/interceptor/mime'
import defaultRequest from 'rest/interceptor/defaultRequest'
import errorCode from 'rest/interceptor/errorCode'
import params from 'rest/interceptor/params'

type optionsType = {
  method: string,
  action: string,
  params: Object,
  entity: Object
}

class Api {

  constructor(): void {
    this.client = rest.wrap(params).wrap(mime).wrap(defaultRequest).wrap(errorCode)
  }

  get(options: optionsType): any {
    options['method'] = 'GET'
    return this.request(options)
  }

  patch(options: optionsType): any {
    options['method'] = 'PATCH'
    return this.request(options)
  }

  post(options: optionsType): any {
    options['method'] = 'POST'
    return this.request(options)
  }

  destroy(options: optionsType): any {
    options['method'] = 'DELETE'
    return this.request(options)
  }

  request(options: optionsType): any {
    options.requestCallback = options.request ? options.request : () => {}
    options.successCallback = options.success ? options.success : () => {}
    options.failureCallback = options.failure ? options.failure : () => {}

    let config = {
      method: options.method,
      path: this._path(options.endpoint),
      headers: { 'Content-Type': 'application/json' },
      mixin: { withCredentials: true }
    }

    if(options.params) {
      if(options.method == 'GET') {
        config.params = options.params
      } else  {
        config.entity = options.params
      }
    }

    return dispatch => {

      let request = {}

      if(options.params) {
        request.params = options.params
      }

      dispatch(options.requestCallback(request))

      return this.client(config)
        .then(response => response.entity)
        .then(json => {

          let success = {
            entity: json
          }

          dispatch(options.successCallback(success))

        }, response => {

          let failure = {
            entity: response.entity
          }

          dispatch(options.failureCallback(failure))

        })
    }
  }

  _path(endpoint: string): string {
    return '/api' + endpoint
  }

}

const api = new Api()

export default api
