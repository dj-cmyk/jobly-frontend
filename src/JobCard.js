import React, {useContext, useState, useEffect} from 'react';
import UserContext from './UserContext';
import JoblyApi from './Api';
import { Card, CardBody, CardTitle, CardText } from "reactstrap";


function JobCard({ job }) {
  const user = useContext(UserContext)
  const username = user.username
  const id = job.id
  const [applied, setApplied] = useState(false);
  


  useEffect(() => {
    const alreadyApplied = (id) => {
      try {
        const result = user.applications.find(jobid => jobid === id)
        result ? setApplied(true) : setApplied(false)
      } catch(err) {
        err === `duplicate key value violates unique constraint "applications_pkey"` ? setApplied(true) : setApplied(false)
        console.error(err);
      }
    }
    alreadyApplied(id);
  }, [user.applications]);
  
  const apply = async () => {
    try {
      let application = await JoblyApi.applyToJob(username, id)
      setApplied(true);
      user.applications.push(application.applied)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <section>
       <Card className="Card">
            <CardBody>
                <CardTitle className="Card-Title">
                  {job.title}
                </CardTitle>
                <CardText className="Card-Text">{job.companyName}</CardText>
                <p className="Card-SubText">
                  <b>Salary:</b> ${job.salary}
                </p>
                {job.equity ? <p className="Card-SubText">
                  <b>Equity:</b> {job.equity}
                </p> : ""}
                
                {/* <p>
                  <b>Id:</b> {job.id}
                </p> */}
                {/* <p>
                  <b>Applied For: </b> {user.applications.find(jobid => jobid === job.id)}
                </p> */}
                <button 
                  className="btn btn-success btn-sm"
                  onClick={apply}
                  disabled={applied}>
                  {applied ? "Applied" : "Apply"}
                </button>
                
            </CardBody>
        </Card>
    </section>
  );
}

export default JobCard;