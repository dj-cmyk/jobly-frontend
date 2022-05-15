import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "./CompanyList.css";

function CompanyCard({ company }) {
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="Card-Title">
            {company.name}
          </CardTitle>
          <CardText className="Card-Text">{company.description}</CardText>
          {/* <p>
            <b>Logo:</b> <img src={company.logourl} alt=""/>
          </p> */}
          <p className="Card-SubText">
            {company.numEmployees} Employees
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default CompanyCard;