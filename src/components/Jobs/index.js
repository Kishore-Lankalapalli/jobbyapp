import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import ProfileSection from '../ProfileSection'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  intial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const EmployementType = props => {
  const {item, onChangeType} = props

  const onChangeTypeInput = event => {
    onChangeType(event.target.value)
  }
  return (
    <li className="list-item-type-container">
      <input
        type="checkbox"
        value={item.employmentTypeId}
        className="checkbox-input"
        onChange={onChangeTypeInput}
        id={item.employmentTypeId}
      />
      <label htmlFor={item.employmentTypeId} className="label-type">
        {item.label}
      </label>
    </li>
  )
}

const SalaryPackage = props => {
  const {item, onChangePackage} = props

  const onSelectPakage = event => {
    onChangePackage(event.target.value)
  }

  return (
    <li className="list-item-type-container">
      <input
        id={item.salaryRangeId}
        type="radio"
        name="package"
        value={item.salaryRangeId}
        onChange={onSelectPakage}
        className="checkbox-input"
      />
      <label htmlFor={item.salaryRangeId} className="label-type">
        {item.label}
      </label>
    </li>
  )
}

class Jobs extends Component {
  state = {
    profileDetails: {},
    searchInput: '',
    employeementId: '',
    packageId: '',
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    apiJobsStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  onSearchRole = event => {
    this.setState({searchInput: event.target.value})
  }

  getProfileDetails = async () => {
    this.setState({apiJobsStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {employeementId, packageId, searchInput} = this.state

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeementId}&minimum_package=${packageId}&search=${searchInput}`

    const options1 = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const jobsResponse = await fetch(jobsApiUrl, options1)

    const jobsData = await jobsResponse.json()

    const updatedJobsData = jobsData.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employementType: eachJob.employment_type,
      jobDescription: eachJob.job_description,
      id: eachJob.id,
      packagePerAnnum: eachJob.package_per_annum,
      location: eachJob.location,
      title: eachJob.title,
      rating: eachJob.rating,
    }))

    if (jobsResponse.ok) {
      this.setState({
        jobsList: updatedJobsData,
        apiJobsStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiJobsStatus: apiStatusConstants.failure})
    }
  }

  onSearchInput = () => {
    this.setState(this.getProfileDetails)
  }

  onChangeType = value => {
    this.setState({employeementId: value}, this.getProfileDetails)
  }

  onChangePackage = value => {
    this.setState({packageId: value}, this.getProfileDetails)
  }

  renderReactLoader = () => (
    <div testid="loader" className="loader-container loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {jobsList} = this.state

    return (
      <>
        {jobsList.length !== 0
          ? this.renderJobList()
          : this.renderNoResultsView()}
      </>
    )
  }

  renderJobList = () => {
    const {searchInput, jobsList, employeementId, packageId} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(item => (
          <JobItem jobsList={item} key={item.id} />
        ))}
      </ul>
    )
  }

  onRetryApiCall = () => {
    this.setState(this.getProfileDetails)
  }

  renderJobsFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong </h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.onRetryApiCall}
        className="failure-view-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderJobsView = () => {
    const {apiJobsStatus} = this.state

    switch (apiJobsStatus) {
      case apiStatusConstants.inProgress:
        return this.renderReactLoader()
      case apiStatusConstants.success:
        return this.renderJobs()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  renderNoResultsView = () => (
    <div className="no-jobs-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-found-text">No Jobs Found</h1>
      <p className="no-jobs-suggestion">
        We could not any find any jobs.Try other filters.{' '}
      </p>
    </div>
  )

  render() {
    const {profileDetails, onChangePackage, onChangeType, jobsList} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <>
        <Header />
        <div className="job-portal-bg-container">
          <div className="search-input-container">
            <input
              placeholder="search"
              type="search"
              className="search-input"
              onChange={this.onSearchRole}
            />
            <div>
              <button
                testid="searchButton"
                type="button"
                className="search-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
          </div>
          <div className="sidebar-container">
            <ProfileSection />
            <hr className="line" />
            <h1 className="employement-types-heading">Type of Employment</h1>
            <ul className="employement-types-lists-container">
              {employmentTypesList.map(item => (
                <EmployementType
                  onChangeType={this.onChangeType}
                  item={item}
                  key={item.id}
                />
              ))}
            </ul>
            <hr className="line" />
            <h1 className="employement-types-heading">Salary Range</h1>
            <ul className="employement-types-lists-container">
              {salaryRangesList.map(item => (
                <SalaryPackage
                  onChangePackage={this.onChangePackage}
                  item={item}
                  key={item.salaryRangeId}
                />
              ))}
            </ul>
          </div>
          <div className="jobItems-container">
            <div className="search-input-large-container">
              <input
                type="search"
                id="searchid"
                placeholder="Search"
                className="search-input-large"
                onChange={this.onSearchRole}
              />
              <button
                onClick={this.onSearchInput}
                className="search-large-button"
                testid="searchButton"
                type="button"
              >
                <BsSearch />
              </button>
            </div>
            {this.renderJobsView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
