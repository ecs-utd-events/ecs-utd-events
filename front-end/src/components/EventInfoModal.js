import { Container } from "react-bootstrap/esm";
import CloseIcon from '@iconify/icons-mdi/close';
import Slide from '@material-ui/core/Slide';
import { AppBar, Dialog, Toolbar } from "@material-ui/core";

import EventInfoContent from "./EventInfoContent";
import IconButton from "./IconButton";

// functional component to render a modal for event info on mobile devices/small screens
export default function EventInfoModal({ mobileModalOpen, setMobileModalOpen, event, orgs }) {
    const handleClose = () => setMobileModalOpen(false);
    return (
        <Dialog
            style={{ overflowY: 'auto', overflowX: 'hidden', maxWidth: '100vw', maxHeight: '100vh' }}
            open={mobileModalOpen}
            onClose={handleClose}
            closeAfterTransition>
            <Slide direction="up" in={mobileModalOpen} mountOnEnter unmountOnExit>
                <div className="modal-wrapper">
                    <AppBar className="modal-appbar">
                        <Toolbar>
                            <IconButton
                                size="lg"
                                icon={CloseIcon}
                                onClick={handleClose}
                                style={{ backgroundColor: 'var(--primary1)', boxShadow: 'none', margin: 0 }}
                            />
                        </Toolbar>
                    </AppBar>
                    <Container className="modal-container" fluid>
                        <EventInfoContent event={event} orgs={orgs} mobile />
                        {/* <div className="close-btn-wrapper">
                        <IconButton size="lg" icon={CloseIcon} onClick={handleClose} style={{ backgroundColor: 'var(--primary1)', boxShadow: "box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);" }} />
                    </div> */}
                    </Container>
                </div>
            </Slide>
        </Dialog>
    )
}