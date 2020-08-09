import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Button, message, Upload } from "antd";
import Loader from "../../../components/loader";
import StudioSteps from "../../../components/studio-steps";
import { history } from "../../../store";

const mapDispatchToProps = ({ user, media, studio }) => {
    return {
        ...user, ...media, ...studio
    };
};

const mapStateToProps = ({ user, media, studio }) => {
    return {
        ...user, ...media, ...studio
    };
};



class AddStudioPhotos extends Component {
    constructor(props) {
        super(props)
        this.state = { Btndisable: false }
    }
    handleSubmit = e => {
        this.setState({ Btndisable: true })
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values, this.props);
                if (values && values.apt && values.apt.fileList)
                    await this.props.uploadMedia({
                        files: values.apt.fileList,
                        docId: this.props.studioDetails && this.props.studioDetails.id, images: this.props.studioDetails && this.props.studioDetails.images ?
                            this.props.studioDetails.images : []
                    })
                history.push("/my-studios")
            }
        })
    }
    async componentDidMount() {
        console.log(this.props, "PROPSSSLocation")
        if (this.props.match && this.props.match.params && this.props.match.params.studioId) {
            await this.props.getStudio(this.props.match.params.studioId)
        }
    }
    render() {
        console.log(this.props)
        const { loading, onGoingProcess } = this.props;
        if (loading) return <Loader />;

        const { getFieldDecorator } = this.props.form;
        const { Dragger } = Upload;
        const uploadProps = {
            name: "file",
            listType: "picture",
            multiple: true,
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            onChange(info) {
                const { status } = info.file;
                if (status !== "uploading") {
                    console.log(info.file, info.fileList);
                }
                if (status === "done") {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        console.log(this.props, "INSode render")
        return (
            <main className="main-inner-wrapper">
                <section className="add-studio-wrapper">
                    <div className="container">
                        <StudioSteps currentStep={6} />
                        <h1 className="main-title">Upload Photos</h1>
                        <p className="main-para-block">Choose the photos of your studio from different angles in a good light that really show the space and equipment.</p>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="basic-form">
                            <Row type="flex" gutter={20}>
                                <Col xs={24}>
                                    <Form.Item>
                                        {getFieldDecorator("apt", {
                                            rules: [{ required: false, message: "" }],
                                        })(
                                            <Dragger {...uploadProps} className="uploader-block">
                                                <span className="icon-plus add-icon-block" />
                                                <div className="upload-label-text">.JPG, .GIF or .PNG. Max. 10 MB</div>
                                            </Dragger>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={24} style={{ paddingTop: 24 }}>
                                    <Form.Item>
                                        <Button disabled={this.state.Btndisable} loading={this.state.Btndisable} htmlType="submit" type="primary" className="submit-btn btn-has-icon uppercase btn-width-auto">
                                            <span className="text-block">Continue</span>
                                            <span className="icon-long-arrow-right icon-block"></span>
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>

                        {onGoingProcess && onGoingProcess.images && onGoingProcess.images.length > 0 &&
                            <div style={{ display: "flex", overflowX: "scroll", overflow: "overlay" }}>
                                {onGoingProcess.images.map((item, i) => (<img style={{ width: " 25%", marginLeft: i !== 0 && "16px" }} src={item} alt="loading" />))}
                            </div>
                        }

                    </div>
                </section>
            </main >
        )
    }
}

const FormWrap = Form.create()(AddStudioPhotos);

export default connect(mapStateToProps, mapDispatchToProps)(FormWrap);
