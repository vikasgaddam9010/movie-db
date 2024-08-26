import {createContext} from 'react'

const ReactContext = createContext({
  searchResponse: {},
  onTriggerSearchingQuery: () => {},
})

export default ReactContext
