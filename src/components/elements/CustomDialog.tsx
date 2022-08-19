import React from "react";
import {Dialog, DialogContent, DialogProps, DialogTitle} from "@mui/material";
import SvgIconStyle from "./SvgIconStyle";

type CloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick';
interface CustomDialogProps extends DialogProps {
    onClose: (reason: CloseReason) => void;
}

const CustomDialog = ({ children, open, onClose, title, ...other }:CustomDialogProps) => {
    return(
        <Dialog open={open} onClose={(_, reason) => onClose(reason)} {...other}>
            <DialogTitle>
                {title}
                <button onClick={() => onClose('closeButtonClick')} className="shrink-click"
                    style={{ position: 'absolute', right: '1rem', top: '1rem', zIndex: '2' }}
                >
                    <SvgIconStyle src="/assets/icons/icon_close.svg" sx={{ width: '1.6rem', height: '1.6rem' }} />
                </button>

            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog;