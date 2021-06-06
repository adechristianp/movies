import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Card, Row, Col, Image, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getMovies, resetMovies } from "../_actions/movies";

function App({ listMovies }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [preview, setPreview] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [qtyMovies, setQtyMovies] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastBookElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true);
        handleLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  });

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setPreview(data);
    setShow(true);
  };
  useEffect(() => {
    setPage(1);
    setError("");
    setLoading(false);
    listMovies.data.Response === "False" && setError(listMovies.data.Error);
    dispatch(
      getMovies(
        history.location.state !== undefined
          ? history.location.state.search
          : "Batman",
        1,
        1
      )
    );
    return dispatch(resetMovies());
  }, [history.location.state]);

  useEffect(() => {
    setMovies(listMovies.data.Search);
    setTotalMovies(listMovies.data.totalResults);
    listMovies.data.Search && setQtyMovies(listMovies.data.Search.length);
  }, [listMovies]);

  const handleLoadMore = () => {
    setPage(page + 1);
    qtyMovies < parseInt(totalMovies)
      ? dispatch(
          getMovies(
            history.location.state !== undefined
              ? history.location.state.search
              : "Batman",
            page + 1,
            0
          )
        ).then((res) => {
          const newObj = res.Search;
          res.Response === "True" &&
            setQtyMovies(qtyMovies + res.Search.length);
          res.Response === "True"
            ? setMovies((old) => [...old, ...newObj])
            : setError("--Load more: " + res.Error);
          setLoading(false);
        })
      : setError("All data shown.");
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
        {movies
          ? movies.map((res, index) => {
              if (movies.length === index + 1) {
                return (
                  <div key={res.imdbID} ref={lastBookElementRef}>
                    <Card style={{ marginBottom: "5px" }}>
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
                  </div>
                );
              } else {
                return (
                  <div key={res.imdbID}>
                    <Card style={{ marginBottom: "5px" }}>
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
                  </div>
                );
              }
            })
          : listMovies.data.Error}
        {loading && "..."}
        {error}
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    listMovies: state.movies,
  };
};

export default connect(mapStateToProps)(App);
