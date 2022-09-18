import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {job} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = job

  return (
    <div className="similar-job-item-card-container">
      <div className="similar-job-content-container">
        <div className="similar-job-title-rating-container">
          <img
            alt="similar job company logo"
            src={companyLogoUrl}
            className="similar-job-company-logo"
          />
          <div>
            <p className="company-title">{title}</p>
            <div className="similar-job-rating-container">
              <AiFillStar className="similar-job-rating-star-image" />
              <p className="company-title">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="similar-job-description-heading">Description</h1>
        <p className="similar-job-job-description">{jobDescription}</p>
        <div className="similar-job-location-job-type-container">
          <div className="similar-job-location-container">
            <IoLocationSharp className="location-icon" />
            <p className="similar-job-location-text">{location}</p>
          </div>
          <div className="similar-job-location-container">
            <BsFillBriefcaseFill className="location-icon" />
            <p className="similar-job-location-text">{employmentType}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobItem
