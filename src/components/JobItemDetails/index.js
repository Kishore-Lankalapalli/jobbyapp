import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {RiExternalLinkFill} from 'react-icons/ri'
import SimilarJobItem from '../SimilarJobItem'

import Header from '../Header'
import './index.css'

const apiConstantsStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemObject: {},
    skillsList: [],
    companyLifeObj: {},
    similarJobsList: [],
    apiStatus: apiConstantsStatus.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const jwtToken = Cookies.get('jwtToken')
    const {history} = this.props

    const {location} = history

    const {pathname} = location

    this.setState({apiStatus: apiConstantsStatus.inProgress})

    const jobItemDetailsUrl = `https://apis.ccbp.in${pathname}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearers ${jwtToken}`,
      },
    }

    const response = await fetch(jobItemDetailsUrl, options)

    const jobItemDetailsData = await response.json()

    const data = jobItemDetailsData.job_details

    const updatedData = {
      companyLogoUrl: data.company_logo_url,
      companyWebsiteUrl: data.company_website_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      lifeAtCompany: data.life_at_company,
      location: data.location,
      packagePerAnnum: data.package_per_annum,
      rating: data.rating,
      skills: data.skills,
      title: data.title,
    }

    const similarJobs = jobItemDetailsData.similar_jobs

    const updatedSimilarJobs = similarJobs.map(item => ({
      companyLogoUrl: item.company_logo_url,
      employmentType: item.employment_type,
      id: item.id,
      jobDescription: item.job_description,
      location: item.location,
      title: item.title,
      rating: item.rating,
    }))

    const {skills} = updatedData

    const updatedSkills = skills.map(item => ({
      name: item.name,
      imageUrl: item.image_url,
    }))

    const {lifeAtCompany} = updatedData

    const updatedLifeAtCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }

    if (response.ok) {
      this.setState({
        jobItemObject: updatedData,
        skillsList: updatedSkills,
        companyLifeObj: updatedLifeAtCompany,
        similarJobsList: updatedSimilarJobs,
        apiStatus: apiConstantsStatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStatus.failure})
    }
  }

  onRetryApiCall = () => {
    this.setState(this.getJobItemDetails)
  }

  renderJobDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantsStatus.inProgress:
        return this.renderJobItemLoader()
      case apiConstantsStatus.success:
        return this.renderJobItemDetails()
      case apiConstantsStatus.failure:
        return this.renderJobsListFailureView()
      default:
        return null
    }
  }

  renderJobsListFailureView = () => (
    <div className="job-item-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-image"
      />
      <h1 className="job-item-failure-view-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-item-description">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.onRetryApiCall} className="job-item-retry-button">
        Retry
      </button>
    </div>
  )

  renderJobItemLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {
      jobItemObject,
      similarJobsList,
      skillsList,
      companyLifeObj,
    } = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemObject

    const {description, imageUrl} = companyLifeObj

    return (
      <>
        <div className="jobItem-card-container">
          <div className="company-actual-content-container">
            <div className="company-type-rating-logo-container">
              <img
                alt="job details company logo"
                src={companyLogoUrl}
                className="company-logo-image"
              />
              <div>
                <p className="company-title-text">{title}</p>
                <div className="rating-container">
                  <AiFillStar className="rating-star-image" />
                  <p className="company-title-text">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-package-container">
              <div className="location-jobtype-container">
                <div className="location-container">
                  <IoLocationSharp className="location-icon" />
                  <p className="company-location-text">{location}</p>
                </div>

                <div className="location-container">
                  <BsFillBriefcaseFill className="location-icon" />
                  <p className="company-location-text">{employmentType}</p>
                </div>
              </div>

              <p className="package-text">{packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
            <div className="description-text-anchor-container">
              <h1 className="description-heading"> Description</h1>
              <a className="anchor-element" href={companyWebsiteUrl}>
                <p>Visit</p>
                <RiExternalLinkFill className="anchor-icon" />
              </a>
            </div>
            <p className="company-job-description">{jobDescription}</p>
            <p className="description-heading skills-text">Skills</p>
            <ul className="skills-lists-container">
              {skillsList.map(skill => (
                <li className="skill-list-item">
                  <img
                    alt={skill.name}
                    src={skill.imageUrl}
                    className="skill-set-image"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
            </ul>
            <div className="company-life-container">
              <div className="desription-container">
                <p className="description-heading">Life at Company</p>
                <p className="company-life-description">{description}</p>
              </div>
              <img
                alt="life at company"
                src={imageUrl}
                className="company-office-image"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsList.map(job => (
            <SimilarJobItem job={job} key={job.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetailsView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
