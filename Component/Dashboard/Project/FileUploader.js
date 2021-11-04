// @flow
import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

const FileUploader = (props) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    /**
     * Handled the accepted files and shows the preview
     */
    const handleAcceptedFiles = (files) => {
        // var allFiles = files;

        // files.map((file) =>
        //     Object.assign(file, {
        //         // preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
        //         preview: true,
        //         formattedSize: formatBytes(file.size),
        //     })
        // );

        // allFiles = selectedFiles;
        // allFiles.push(...files);
        // setSelectedFiles(allFiles);

        setSelectedFiles((prev) => [...prev, ...files]);
        // props.onFileUpload(allFiles);
    };

    /**
     * Formats the size
     */
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    /*
     * Removes the selected file
     */
    const removeFile = (file) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(newFiles.indexOf(file), 1);
        setSelectedFiles(newFiles);
    };

    return (
        <>
            <Dropzone {...props} onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                        <div className="dz-message needsclick" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <i className="h3 text-muted dripicons-cloud-upload"></i>
                            <h5>Drop files here or click to upload.</h5>
                            <span className="text-muted font-13">
                                (This is just a demo dropzone. Selected files are <strong>not</strong> actually
                                uploaded.)
                            </span>
                        </div>
                    </div>
                )}
            </Dropzone>

            <div className="dropzone-previews mt-3" id="uploadPreviewTemplate">
                {selectedFiles.map((f, i) => {
                    return (
                        <Card className="mt-1 mb-0 shadow-none border" key={i + '-file'}>
                            <div className="p-2">
                                <Row className="align-items-center">
                                    <Col className="col-auto">
                                        {f['type'].split('/')[0] === 'image' ? (
                                            <img
                                                data-dz-thumbnail=""
                                                className="avatar-sm rounded bg-light"
                                                alt={f.name}
                                                src={URL.createObjectURL(f)}
                                            />
                                        ) : (
                                            <div className="avatar-sm">
                                                <span className="avatar-title bg-primary rounded">
                                                    {f.type.split('/')[1] || f.type.split('/')[0]}
                                                </span>
                                            </div>
                                        )}
                                    </Col>
                                    <Col className="ps-0">
                                        <a
                                            href="#"
                                            className="text-muted fw-bold"
                                            onClick={() => {
                                                window.open(URL.createObjectURL(f), '_blank');
                                            }}>
                                            {f.name}
                                        </a>
                                        <p className="mb-0">
                                            <strong>{formatBytes(f.size)}</strong>
                                        </p>
                                    </Col>
                                    <Col className="text-end">
                                        <a href="#" className="btn btn-link btn-lg text-muted shadow-none">
                                            <i className="dripicons-cross" onClick={() => removeFile(i)}></i>
                                        </a>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </>
    );
};

export default FileUploader;
