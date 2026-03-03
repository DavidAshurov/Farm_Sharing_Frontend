import {Box, IconButton, TableCell, TableRow, Typography} from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDeleteOfferMutation} from "../../../app/api/offerApi.ts";
import {useSnackBar} from "../../../shared/SnackBar.tsx";
import {useState} from "react";
import type {Offer} from "../../../utils/types/offerTypes.ts";
import EditOfferDialog from "./EditOfferDialog.tsx";

interface Props {
    offer: Offer,
    onDeleted: () => void,
}

const OffersListItem = ({offer, onDeleted}: Props) => {
    const [deleteOffer] = useDeleteOfferMutation()
    const {showSnackBar} = useSnackBar()
    const [updateOfferDialogOpened, setUpdateOfferDialogOpened] = useState(false)

    const handleDeleteOfferClick = async () => {
        try {
            await deleteOffer(offer.id).unwrap()
            onDeleted()
            showSnackBar('The offer is successfully deleted.', 'success', 1500)
        } catch {
            showSnackBar('Something went wrong.', 'error')
        }
    }

    return (
        <TableRow>
            <TableCell>
                <Typography fontWeight={'bold'}>
                    {offer.title}
                </Typography>
            </TableCell>
            <TableCell align={'center'}>{offer.category}</TableCell>
            <TableCell align={'center'}>{'₪' + offer.price}</TableCell>
            <TableCell align={'center'}>{offer.amount + ' ' + offer.units}</TableCell>
            <TableCell align={'right'}>
                <Box>
                    <IconButton color={'secondary'}
                                onClick={() => setUpdateOfferDialogOpened(true)}>
                        <EditSquareIcon/>
                    </IconButton>
                    <EditOfferDialog open={updateOfferDialogOpened} setOpen={setUpdateOfferDialogOpened}
                                     triggerScrollToBottom={null} existingOffer={offer}/>
                    <IconButton
                        sx={{color: 'red'}}
                        onClick={handleDeleteOfferClick}>
                        <DeleteIcon/>
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default OffersListItem;