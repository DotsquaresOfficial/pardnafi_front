import React, { useEffect, useState } from 'react'
import PageHeader from '../Widgets/PageHeader'
import { useSetGroupManagementMutation, useSetInviteGroupMemberMutation } from '../../redux/groupApi'
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';

const AddMember = () => {
    const [setGroupManagement, { data }] = useSetGroupManagementMutation()

    const [setInviteGroupMember] = useSetInviteGroupMemberMutation()


    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchGroupManagement = async () => {
            const groupId = localStorage.getItem("groupId");

            if (groupId) {
                try {
                    const data = await setGroupManagement({ id: groupId });
                    // setGroupData(data);
                    console.log(data, "Fetched Group Data");
                } catch (error) {
                    console.error("Error fetching group data:", error);
                }
            }
        };

        fetchGroupManagement();
    }, []);


    const inviteGroupMemberHandler = async (e) => {
        e.preventDefault();
        const groupId = localStorage.getItem("groupId");


        const data = await setInviteGroupMember({ id: groupId, email });
        console.log(data.data, "data===")
        if (data.data.success) {
            toast.success(data.message)
            handleClose()

        } else {
            console.log("cll")
            toast.error(data.data.message)
            handleClose()
        }

    }



    return (
        <>
            <PageHeader title="Group Management" text="Group Management" />
            <section className="Invitations-sentuser">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="user-datajoin">
                                <div className="addmember-user">
                                    <button onClick={handleShow}><i className="fa-solid fa-plus" /> Add Memeber</button>
                                </div>
                                <div className="group-started">
                                    <div className="group-notstarted">
                                        <h6>Group Started:<span> {data && !data.data.isStarted ? "Not Started" : "Started"} </span></h6>
                                    </div>
                                    <div className="group-notstarted">
                                        {data && !data.data.isStarted && <button> Start</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="active-usertable">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="user-datajoin">
                                <div className="member-user">
                                    <h2>Invitations Sent</h2>
                                </div>
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th> Name</th>
                                                <th>Wallet Address</th>
                                                <th>Email</th>
                                                <th>Is Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data &&
                                                data?.data?.invitedMembers?.map((item) => {
                                                    return <tr>
                                                        <td>{item.name
                                                        }</td>
                                                        <td>{item.memberAddress}</td>
                                                        <td>{
                                                            item.email}</td>
                                                        <td>{
                                                            item.isJoined ? "Yes" : "No"
                                                        }</td>
                                                    </tr>

                                                })}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Your Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={inviteGroupMemberHandler}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddMember
