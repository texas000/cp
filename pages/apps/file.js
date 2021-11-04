// @flow
import React from 'react';
import { Row, Col, Card, Dropdown, ButtonGroup, ProgressBar } from 'react-bootstrap';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import QuickAccess from '../../Component/File/QuickAccess';
import Recent from '../../Component/File/Recent';
import Layout from '../../Component/Layout';

// dummy data
// import { quickAccessFiles, recentFiles } from './data';

const quickAccessFiles = [
    {
        icon: 'mdi mdi-folder-zip font-16',
        name: 'Hyper-sketch.zip',
        size: '2.3 MB',
    },
    {
        icon: 'mdi mdi-folder font-16',
        name: 'Compile Version',
        size: '87.2 MB',
    },
    {
        icon: 'mdi mdi-folder-zip-outline font-16',
        name: 'admin.zip',
        size: '45.1 MB',
    },
    {
        icon: 'mdi mdi-file-pdf-outline font-16',
        name: 'Docs PDF',
        size: '7.5 MB',
    },
    {
        icon: 'mdi mdi-file-pdf-outline font-16',
        name: 'License-details.pdf',
        size: '784 KB',
    },
    {
        icon: 'mdi mdi-folder-account font-16',
        name: 'Purchase Verification',
        size: '87.2 MB',
    },
    {
        icon: 'mdi mdi-folder-account font-16',
        name: 'Hyper Integrations',
        size: '874 MB',
    },
];

const recentFiles = [
    {
        name: 'App Design & Development',
        modifiedDate: 'Jan 03, 2020',
        modifiedBy: 'Andrew',
        size: '128 MB',
        owner: 'Danielle Thompson',
        members: [
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Mat Helme',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'James Anderson',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Username',
            },
        ],
    },
    {
        name: 'Hyper-sketch-design.zip',
        modifiedDate: 'Feb 13, 2020',
        modifiedBy: 'Coderthemes',
        size: '521 MB',
        owner: 'Coder Themes',
        members: [
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Mat Helme',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'James Anderson',
            },
        ],
    },
    {
        name: 'Annualreport.pdf',
        modifiedDate: 'Dec 18, 2019',
        modifiedBy: 'Alejandro',
        size: '7.2 MB',
        owner: 'Gary Coley',
        members: [
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Mat Helme',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'James Anderson',
            },
        ],
    },
    {
        name: 'Wireframes',
        modifiedDate: 'Nov 25, 2019',
        modifiedBy: 'Dunkle',
        size: '54.2 MB',
        owner: 'Jasper Rigg',
        members: [
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Mat Helme',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Michael Zenaty',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'James Anderson',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Username',
            },
        ],
    },
    {
        name: 'Documentation.docs',
        modifiedDate: 'Feb 9, 2020',
        modifiedBy: 'Justin',
        size: '8.3 MB',
        owner: 'Cooper Sharwood',
        members: [
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Mat Helme',
            },
            {
                image: '/assets/images/users/avatar-1.jpg',
                name: 'Michael Zenaty',
            },
        ],
    },
];

import PageTitle from '../../Component/PageTitle';

// left side panel
const LeftSide = () => {
    return (
        <>
            <ButtonGroup className="d-block mb-2">
                <Dropdown>
                    <Dropdown.Toggle className="btn btn-success dropdown-toggle w-100">
                        <i className="mdi mdi-plus"></i> Create New{' '}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <i className="mdi mdi-folder-plus-outline me-1"></i> Folder
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="mdi mdi-file-plus-outline me-1"></i> File
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="mdi mdi-file-document me-1"></i> Document
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="mdi mdi-upload me-1"></i> Choose File
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonGroup>

            <div className="email-menu-list mt-3">
                <a href="/apps/file">
                    <i className="mdi mdi-folder-outline font-18 align-middle me-2"></i>My Files
                </a>
                <a href="/apps/file">
                    <i className="mdi mdi-google-drive font-18 align-middle me-2"></i>Google Drive
                </a>
                <a href="/apps/file">
                    <i className="mdi mdi-dropbox font-18 align-middle me-2"></i>Dropbox
                </a>
                <a href="/apps/file">
                    <i className="mdi mdi-share-variant font-18 align-middle me-2"></i>Share with me
                </a>
                <a href="/apps/file">
                    <i className="mdi mdi-clock-outline font-18 align-middle me-2"></i>Recent
                </a>
                <a href="/apps/file">
                    <i className="mdi mdi-star-outline font-18 align-middle me-2"></i>Starred
                </a>
                <a href="/apps/file">
                    <i className="mdi mdi-delete font-18 align-middle me-2"></i>Deleted Files
                </a>
            </div>

            <div className="mt-5">
                <h4>
                    <span className="badge rounded-pill p-1 px-2 badge-secondary-lighten">FREE</span>
                </h4>
                <h6 className="text-uppercase mt-3">Storage</h6>
                <ProgressBar variant="success" now={46} className="my-2 progress-sm" />
                <p className="text-muted font-13 mb-0">7.02 GB (46%) of 15 GB used</p>
            </div>
        </>
    );
};

export async function getServerSideProps({ req }) {
    const cookies = cookie.parse(req ? req.headers.cookie || '' : window.document.cookie);
    try {
        const token = jwt.verify(cookies.jwitracking, process.env.JWT_KEY);
        return {
            props: {
                token: token,
            },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
        };
    }
}

// FileManager
const FileManager = ({ token }) => {
    return (
        <Layout token={token} title="File Manager">
            <PageTitle
                breadCrumbItems={[
                    { label: 'Apps', path: '/apps/file' },
                    { label: 'File Manager', path: '/apps/file', active: true },
                ]}
                title={'File Manager'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="page-aside-left">
                                <LeftSide />
                            </div>

                            <div className="page-aside-right">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="app-search">
                                        <form>
                                            <div className="mb-2 position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search files..."
                                                />
                                                <span className="mdi mdi-magnify search-icon"></span>
                                            </div>
                                        </form>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-sm btn-light">
                                            <i className="mdi mdi-format-list-bulleted"></i>
                                        </button>
                                        <button type="submit" className="btn btn-sm">
                                            <i className="mdi mdi-view-grid"></i>
                                        </button>
                                        <button type="submit" className="btn btn-sm">
                                            <i className="mdi mdi-information-outline"></i>
                                        </button>
                                    </div>
                                </div>

                                <QuickAccess quickAccessFiles={quickAccessFiles} />

                                <Recent recentFiles={recentFiles} />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
};

export default FileManager;
