import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Alert, Row, Col, Form, InputGroup } from 'react-bootstrap';
import router from 'next/router';
import Head from 'next/head';
export default function index() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (document.body) document.body.classList.add('authentication-bg');

        return () => {
            if (document.body) document.body.classList.remove('authentication-bg');
        };
    }, []);

    async function handleSubmit(e) {
        setLoading(true);

        e.preventDefault();
        const login = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                username: e.target[0].value,
                password: e.target[1].value,
            }),
        });
        if (login.status == 200) {
            document.cookie = await login.text();
            router.push('/');
        } else {
            setLoading(false);
            setError(true);
        }
    }
    return (
        <>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
                <Head>
                    <title>JWI TRACKING - ADDING VALUES TO YOUR CARGO</title>
                    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
                    <meta charSet="utf-8" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="theme-color" content="#000000" />
                    <meta property="og:title" content="JWI TRACKING, ADDING VALUES TO YOUR CARGO!"></meta>
                    <meta
                        name="description"
                        content="James Worldwide moves your cargo in the safest and fastest way possible, keeping you informed every step of the way and providing customized and innovative solutions."></meta>
                    <meta
                        property="og:description"
                        content="James Worldwide moves your cargo in the safest and fastest way possible, keeping you informed every step of the way and providing customized and innovative solutions."></meta>
                    <meta content="Coderthemes" name="author" />
                </Head>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} xxl={4}>
                            <Card>
                                {/* logo */}
                                <Card.Header className="pt-4 pb-4 text-center">
                                    <a href="/">
                                        <span>
                                            <img src="/assets/images/logo-dark.png" alt="" height="25" />
                                        </span>
                                    </a>
                                </Card.Header>
                                <Card.Body className="p-4">
                                    {loading && (
                                        <div className="preloader">
                                            <div className="status">
                                                <div className="bouncing-loader">
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-center w-75 m-auto">
                                        <h4 className="text-dark-50 text-center mt-0 fw-bold">Sign In</h4>
                                        <p className="text-muted mb-4">
                                            Enter your email address and password to access admin panel.
                                        </p>
                                    </div>
                                    {error && (
                                        <Alert variant="danger" className="my-2">
                                            Wrong password. Try again!
                                        </Alert>
                                    )}
                                    <form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="email">Email Address</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address"></Form.Control>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="password">Password</Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"></Form.Control>
                                            </InputGroup>
                                        </Form.Group>

                                        <div className="mb-3 mb-0 text-center">
                                            <Button variant="primary" type="submit">
                                                Log In
                                            </Button>
                                        </div>
                                    </form>
                                </Card.Body>
                            </Card>

                            {/* bottom links */}
                        </Col>
                    </Row>
                </Container>
            </div>
            <footer className="footer footer-alt">2021 © JWITRACKING.COM</footer>
        </>
    );
}
