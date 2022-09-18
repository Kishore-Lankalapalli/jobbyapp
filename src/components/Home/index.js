import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props

  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="home-banner-section">
          <div className="banner-content-container">
            <h1 className="banner-section-heading">
              Find The Job That Fits Your Life
            </h1>
            <p className="jobportal-description">
              Millions of people are searching for jobs,salary
              information,company reviews.Find the job that fits your abilities
              and potential
            </p>
            <Link to="/jobs">
              <button type="button" className="find-jobs-button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
