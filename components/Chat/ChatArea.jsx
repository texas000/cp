import { createRef } from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  Media,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import SimpleBar from "simplebar-react";

const Loader = () => (
  <div className="preloader">
    <div className="status">
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default function ChatArea(props) {
  const messageEnd = createRef(null)
  const scrollToBottom = () => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" })
  }

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
    scrollToBottom()
  }, [props]);
  return (
    <Card>
      <CardBody className="position-relative">
        {!isLoaded ? (
          <Loader />
        ) : (
          <SimpleBar style={{ maxHeight: "556px", width: "100%" }}>
            <ul className="conversation-list">
              
              <li className="clearfix">
                <div className="chat-avatar">
                  <img
                    src="/assets/images/users/avatar-2.jpg"
                    className="rounded"
                    alt=""
                  />
                  <i>10:10</i>
                </div>

                <div className="conversation-text">
                  <div className="ctext-wrap">
                    <i>Jone Doe</i>
                    <p>Hello World</p>
                  </div>
                </div>

                <UncontrolledDropdown className="conversation-actions">
                  <DropdownToggle
                    tag="button"
                    className="btn btn-sm btn-link no-arrow p-0"
                  >
                    <i className="uil uil-ellipsis-v"></i>
                  </DropdownToggle>

                  <DropdownMenu>
                    <DropdownItem>Copy Message</DropdownItem>
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>

              <li className="clearfix odd">
                <div className="chat-avatar">
                  <img
                    src="/assets/images/users/avatar-3.jpg"
                    className="rounded"
                    alt=""
                  />
                  <i>10:10</i>
                </div>
                <div className="conversation-text">
                  <div className="ctext-wrap">
                    <i>Jone Doe</i>
                    <p>Hello World</p>
                  </div>
                  <Card className="mt-2 mb-1 shadow-none border text-left">
                    <div className="p-2">
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <div className="avatar-sm">
                            <span className="avatar-title rounded">
                              <i className="uil uil-file-upload-alt font-20"></i>
                            </span>
                          </div>
                        </Col>
                        <Col className="pl-0">
                          <a href="#" className="text-muted font-weight-bold">
                            File Name
                          </a>
                          <p className="mb-0">1.5G</p>
                        </Col>
                        <Col className="col-auto">
                          <a
                            href="#"
                            className="btn btn-link btn-lg text-muted"
                          >
                            <i className="dripicons-download"></i>
                          </a>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </div>
              </li>
              {props.conversation && props.conversation.length>0 &&
                props.conversation.map((ga, i) => (
                  <li className="clearfix" key={i}>
                    <div className="chat-avatar">
                      <img
                        src={ga.PHOTO||"/assets/images/users/avatar-2.jpg"}
                        className="rounded"
                        alt=""
                      />
                      <i>10:10</i>
                    </div>

                    <div className="conversation-text">
                      <div className="ctext-wrap">
                        <i>{ga.NAME}</i>
                        <p>{ga.MESSAGE_BODY}</p>
                      </div>
                    </div>

                    <UncontrolledDropdown className="conversation-actions">
                      <DropdownToggle
                        tag="button"
                        className="btn btn-sm btn-link no-arrow p-0"
                      >
                        <i className="uil uil-ellipsis-v"></i>
                      </DropdownToggle>

                      <DropdownMenu>
                        <DropdownItem>Copy Message</DropdownItem>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                ))}
                <li className="clearfix" ref={messageEnd}></li>
            </ul>
          </SimpleBar>
        )}
        <Row>
          <Col>
            <div className="mt-2 bg-light p-3 rounded">
              <Form
                className="needs-validation"
                noValidate
                name="chat-form"
                id="chat-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  props.sendMessage();
                  props.setMsg("")
                }}
              >
                <Row>
                  <Col className="mb-2 mb-sm-0">
                    <Input
                      type="text"
                      name="newMessage"
                      className="border-0"
                      onChange={(e) => props.setMsg(e.target.value)}
                      value={props.msg}
                      required
                    ></Input>
                  </Col>
                  <Col className="col-sm-auto">
                    <div className="btn-group">
                      <a href="#" className="btn btn-light">
                        <i className="uil uil-paperclip"></i>
                      </a>
                      {/* <a href="#" className="btn btn-light">
                        {" "}
                        <i className="uil uil-smile"></i>{" "}
                      </a> */}
                      <button
                        type="submit"
                        className="btn btn-success chat-send btn-block"
                      >
                        <i className="uil uil-message"></i>
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
