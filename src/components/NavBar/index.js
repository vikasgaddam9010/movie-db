import {Link, withRouter} from 'react-router-dom'

import ReactContext from '../../ReactContext'

import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <ReactContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
          apiStatus,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="me-2 search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="btn btn-outline-info"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </ReactContext.Consumer>
  )

  return (
    <nav>
      <h1>Movie DB</h1>
      {renderSearchBar()}
      <ul>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Popular
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/top-rated">
            Top Rated
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/upcoming">
            Upcoming
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(NavBar)
