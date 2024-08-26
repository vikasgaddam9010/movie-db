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
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="d-flex mb-3">
            <input
              type="text"
              className="me-2 search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="ml-2 btn btn-primary"
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
    <nav className="d-flex flex-column align-items-center p-2">
      <h1 className="m-3">movieDB</h1>
      {renderSearchBar()}
      <ul className="ul-container p-0 d-flex " style={{listStyleType: 'none'}}>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Popular
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/top-rated">
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
