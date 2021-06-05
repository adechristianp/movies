import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Container,
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Card,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillStar } from "react-icons/ai";
import { getDetailMovies, resetDetailMovies } from "../_actions/movies";

function SingleMovieDetail({ detailMovies }) {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getDetailMovies(history.location.state.ID));
    return () => dispatch(resetDetailMovies());
  }, []);

  console.log("cek detaulMov", detailMovies);
  const data = detailMovies.data;
  return (
    <Container>
      <Row>
        <Col xs={12} md={4} lg={3}>
          <Image src={data.Poster} fluid />
        </Col>
        <Col xs={12} md={8} lg={9}>
          <h1>
            {data.Title}
            {"  "}
            <span style={{ fontSize: "30px" }}>
              <AiFillStar />
              {data.imdbRating}
            </span>
            <span style={{ fontSize: "15px" }}>/10</span>
            <span style={{ fontSize: "15px" }}>({data.imdbVotes})</span>
          </h1>
          <p>{data.Plot}</p>
          <p>
            <strong>Director : </strong>
            {data.Director}
            <br />
            <strong>Writer : </strong>
            {data.Writer}
            <br />
            <strong>Stars : </strong>
            {data.Actors}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col xs={5}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    detailMovies: state.detailMovies,
  };
};

export default connect(mapStateToProps)(SingleMovieDetail);
