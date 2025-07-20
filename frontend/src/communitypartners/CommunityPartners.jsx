// src/communitypartners/CommunityPartners.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import globalAI from "./images/global_ai_dehradun.jpg";
import javascripters from "./images/javascripters_community.jpg";
import "./CommunityPartners.css";

const partners = [
  {
    name: "Global AI Dehradun",
    location: "Dehradun, India",
    image: globalAI,
    description:
      "Global AI Dehradun is a part of the Global AI Community — a worldwide initiative focused on democratizing Artificial Intelligence through local chapters and events. This chapter actively hosts workshops, talks, and events to spread AI awareness in Dehradun.",
    website: "https://globalai.community/",
  },
  {
    name: "Javascripters Community",
    location: "India",
    image: javascripters,
    description:
      "The Javascripters Community is a tech-savvy group founded in 2015 that aims to unite JavaScript developers across India. With meetups, webinars, and open-source collaboration, they empower developers to grow through knowledge sharing and innovation.",
    website: "https://twitter.com/javascripters_?lang=en",
  },
];

const CommunityPartners = () => {
  return (
    <div className="community-wrapper py-5">
      <Container>
        <h2 className="text-center fw-bold mb-4 gradient-text mt-5">Our Community Partners</h2>
        <Row className="g-4">
          {partners.map((partner, index) => (
            <Col md={6} key={index}>
              <Card className="partner-card h-100 shadow-lg">
                <Card.Img variant="top" src={partner.image} className="partner-image" />
                <Card.Body>
                  <Card.Title className="fw-bold">{partner.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{partner.location}</Card.Subtitle>
                  <Card.Text>{partner.description}</Card.Text>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary mt-2">
                    Visit Website
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CommunityPartners;
