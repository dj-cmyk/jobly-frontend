import React, {useState, useEffect} from 'react';

import { ListGroup } from "reactstrap";
import JoblyApi from './Api';
import SearchBar from './SearchBar';
import JobCard from './JobCard';

const JobList = () => {
  const [jobs, setJobs] = useState();

  useEffect(() => {
      async function getJobsData() {
        let jobs = await JoblyApi.getAllJobs();
        setJobs(jobs);
      }
      getJobsData();
    }, []);

    const filterJobs = async (searchTerm) => {
      let filteredJobs = await JoblyApi.searchJobs(searchTerm)
      setJobs(filteredJobs)
    }


    if (!jobs) return <p>Loading &hellip;</p>;
    
    
    return (
        <section className="List">
            <h2>All Jobs</h2>
            <SearchBar filterItems={filterJobs} />

            <ListGroup>
            {jobs.map(job => (
                    <JobCard job={job} key={job.id}/>
            ))}
        </ListGroup>
      
    </section>
    )
}

export default JobList;