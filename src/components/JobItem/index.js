import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobsList} = props

  const {
    companyLogoUrl,
    id,
    title,
    employementType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = jobsList

  return (
    <Link to={`/jobs/${id}`} className="link-element">
      <li className="jobs-list-item">
        <div className="company-list-item-container">
          <div className="company-details-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo-image"
            />
            <div className="job-role-ratings-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="job-title">{rating}</p>
              </div>
            </div>
          </div>

          <div className="company-location-employetype-container">
            <div className="company-location-type-container">
              <div className="location-container">
                <IoLocationSharp className="location-icon" />
                <p className="location-text">{location}</p>
              </div>
              <div className="location-container">
                <BsFillBriefcaseFill className="location-icon" />
                <p className="location-text">{employementType}</p>
              </div>
            </div>
            <p className="package-text">{packagePerAnnum}</p>
          </div>

          <hr className="hr-line" />
          <h1 className="company-description">Description</h1>
          <p className="company-description job-description">
            {jobDescription}
          </p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
