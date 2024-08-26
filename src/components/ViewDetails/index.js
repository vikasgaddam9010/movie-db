import {Component} from 'react'
import Loader from 'react-loader-spinner'

class ViewDetails extends Component {
  state = {apiStatus: 'initial', movieDetails: {}, movieCredits: {}}

  componentDidMount() {
    this.getSIngleMovieDetails()
  }

  getSIngleMovieDetails = async () => {
    this.setState({apiStatus: 'loading'})
    const API_KEY = 'f5cda263f827a18c8363292aa0441e1c'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    const serverRes = await fetch(url)
    const jsonData = await serverRes.json()

    const url2 = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const s2 = await fetch(url2)
    const j2 = await s2.json()
    if (serverRes.ok) {
      this.setState({
        movieDetails: jsonData,
        movieCredits: j2,
        apiStatus: 'sucess',
      })
    }
  }

  renderSuccessView = () => {
    const {movieCredits, movieDetails} = this.state
    let cast = []
    if (movieDetails.cast !== undefined) {
      cast = movieDetails.cast.map(each => ({
        name: each.name,
        character: each.character,
      }))
    }

    let g = []
    if (movieCredits.genres !== undefined) {
      g = movieCredits.genres.map(each => each.name)
    }

    const color = movieCredits.vote_average >= 7.5 ? 'green' : 'red'
    return (
      <div className="p-5">
        <h1 className="mb-2" style={{fontWeight: '800'}}>
          Movie Details
        </h1>

        <div>
          <h3 className="text-center mt-3">
            Name:{' '}
            <span style={{color: 'brown', fontWeight: '700'}}>
              {movieCredits.title}
            </span>
          </h3>
          <div className="d-flex">
            <img
              alt={movieCredits.title}
              src={`https://image.tmdb.org/t/p/w500${movieCredits.backdrop_path}`}
            />
            <div className="pl-3">
              <p>
                Movie:{' '}
                <span style={{color: 'black', fontWeight: '700'}}>
                  {movieCredits.title}
                </span>
              </p>
              <p>
                Ratings:{' '}
                <span style={{color, fontWeight: '700'}}>
                  {movieCredits.vote_average}
                </span>
              </p>
              <p>
                Duration:{' '}
                <span style={{color: 'black', fontWeight: '700'}}>
                  {movieCredits.runtime}
                </span>
              </p>
              <p>
                Genres:{' '}
                <span style={{color: 'black', fontWeight: '700'}}>
                  {g.join(' ')}
                </span>
              </p>
              <p>
                Release_date:{' '}
                <span style={{color: 'black', fontWeight: '700'}}>
                  {movieCredits.release_date}
                </span>
              </p>
            </div>
          </div>
          <h1>Overview</h1>
          <p>{movieCredits.overview}</p>
        </div>
        <h1 className="text-center">Cast Details</h1>
        <ul
          className="p-0"
          style={{
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {cast.map(each => (
            <li
              className="m-1"
              style={{
                border: '1px solid lightgray',
                padding: '3px 6px',
                borderRadius: '7px',
              }}
              key={`${each.name}`}
            >
              <p className="mb-1">
                Actor/Actress:{' '}
                <span
                  style={{
                    color: 'grey',
                    fontWeight: '700',
                  }}
                >
                  {each.name}
                </span>
              </p>
              <p className="m-0">
                Character:{' '}
                <span style={{color: 'grey', fontWeight: '700'}}>
                  {each.character}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        {apiStatus === 'loading'
          ? this.renderLoadingView()
          : this.renderSuccessView()}
      </>
    )
  }
}

export default ViewDetails
