import React, {useState, useEffect} from 'react';
import { 
    Card, 
    CardBody, 
    CardTitle, 
    CardText, 
    ListGroup,  
} from "reactstrap";
import JoblyApi from './Api';
import JobCard from './JobCard';

function CompanyDetail({handle}) {
  const [company, setCompany] = useState();

  useEffect(() => {
    async function getCompanyDetail() {
      try {
        let company = await JoblyApi.getCompany(handle);
        setCompany(company);
      } catch (e) {
        console.log(e)
      }
      
    }
    getCompanyDetail();
  }, []);


if (!company) return <p>Loading &hellip;</p>;

  return (
    <section className="List">
      <Card className="Card">
        <CardBody>
          <CardTitle className="Card-Title">
            {company.name}
          </CardTitle>
          <CardText className="Card-Text">{company.description}</CardText>
          
            <h5>All Jobs for {company.name}:</h5>
            <ListGroup>
            {company.jobs.map(job => (
                    <JobCard job={job} key={job.id}/>
            ))}
        </ListGroup>
        
        </CardBody>
      </Card>
    </section>
  );
}

export default CompanyDetail;