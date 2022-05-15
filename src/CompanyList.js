import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import SearchBar from "./SearchBar";
import JoblyApi from "./Api";
import "./CompanyList.css";

import {
  ListGroup,
  ListGroupItem
} from "reactstrap";

function CompanyList() {
    const [companies, setCompanies] = useState();

    useEffect(() => {
        async function getCompaniesData() {
          let companies = await JoblyApi.getAllCompanies();
          setCompanies(companies);
        }
        getCompaniesData();
      }, []);

      const filterCompanies = async (searchTerm) => {
        let filteredCompanies = await JoblyApi.searchCompanies(searchTerm)
        setCompanies(filteredCompanies)
      }
  

      if (!companies) return <p>Loading &hellip;</p>;
      

  return (
    <section className="List">
        <h2>All Companies</h2>
        <div>
        <SearchBar filterItems={filterCompanies}/>
        </div>
        
        <ListGroup>
            {companies.map(co => (
              <Link to={`/companies/${co.handle}`} key={co.handle} className="Card">
                    <CompanyCard company={co} />
              </Link>
            ))}
        </ListGroup>
        
    </section>
  );
}

export default CompanyList;