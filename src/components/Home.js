import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
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
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getMovies, resetMovies, loadMore } from "../_actions/movies";

function App({ movies }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [preview, setPreview] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("Batman");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setPreview(data);
    setShow(true);
  };
  //   console.log("page", page);
  const innerHeigh = window.innerHeight;
  useEffect(() => {
    // console.log(scrollPosition, window.innerHeigth);
    dispatch(
      getMovies(
        history.location.state != undefined
          ? history.location.state.search
          : "Batman",
        page
      )
    );
    return () => dispatch(resetMovies());
  }, [history.location.state]);

  useEffect(() => {
    console.log("innerHeigh", innerHeigh);
  }, [innerHeigh]);

  const handleLoadMore = () => {
    console.log("Load More bos");
    // console.log("page", page);
    dispatch(
      loadMore(
        history.location.state != undefined
          ? history.location.state.search
          : "Batman",
        page
      )
    ).then((res) => {
      console.log("res", res);
    });
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>{preview.Title}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Image src={preview.Poster} />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>

      <Container>
        {movies.data.Search
          ? movies.data.Search.map((res) => {
              return (
                <Card key={res.imdbID} style={{ marginBottom: "5px" }}>
                  <Card.Body style={{ padding: "0", minHeight: "50px" }}>
                    <Card.Text>
                      <Image
                        style={{ height: "50px", maxWidth: "35px" }}
                        src={res.Poster}
                        fluid
                        onClick={() => handleShow(res)}
                      />
                      <span
                        onClick={() =>
                          history.push({
                            pathname: "/single",
                            state: { ID: res.imdbID },
                          })
                        }
                      >
                        {" " + res.Title} ({res.Year})
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })
          : movies.data.Error}
        <Button
          onClick={() => {
            setPage(page + 1);
            handleLoadMore();
          }}
        >
          Load More
        </Button>
      </Container>
    </div>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(App);
