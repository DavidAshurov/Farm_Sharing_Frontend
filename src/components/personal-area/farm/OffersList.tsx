import {
    Box,
    Button,
    CircularProgress,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {useGetMyOffersQuery} from "../../../app/api/offerApi.ts";
import OffersListItem from "./OffersListItem.tsx";
import EditOfferDialog from "./EditOfferDialog.tsx";
import type {OffersResponse} from "../../../utils/types/offerTypes.ts";

const OffersList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [addOfferDialogOpened, setAddOfferDialogOpened] = useState(false)
    const {data = {} as OffersResponse, isLoading, isFetching} = useGetMyOffersQuery({
        pageNumber: currentPage - 1,
        pageSize: 5,
    })
    const offers = data?.offers ?? []

    const shouldShowEmptyState = offers.length === 0 && currentPage === 1 && !isFetching

    const bottomRef = useRef<HTMLDivElement | null>(null)
    const shouldScrollRef = useRef(false)
    const triggerScrollToBottom = () => shouldScrollRef.current = true
    useEffect(() => {
        if (!shouldScrollRef.current) return
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        })
        shouldScrollRef.current = false
    }, [offers.length]);

    useEffect(() => {
        if (offers.length === 0 && currentPage > 1) {
            setCurrentPage(prev => prev - 1)
            triggerScrollToBottom()
        }
    }, [currentPage, offers.length]);

    if (isLoading) return <CircularProgress color={"secondary"} size={'5rem'}/>

    return (
        <>
            <Paper elevation={1} sx={{m: '1rem', p: '1rem', textAlign: 'left'}}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant={'h5'}>Product management</Typography>
                    <Button className={'green-button'}
                            onClick={() => setAddOfferDialogOpened(true)}>
                        Add product
                    </Button>
                </Box>
                <EditOfferDialog open={addOfferDialogOpened} setOpen={setAddOfferDialogOpened}
                                 triggerScrollToBottom={triggerScrollToBottom} existingOffer={null}/>
                <Table size={'small'}>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography color={'grey'}>Title</Typography></TableCell>
                            <TableCell align={'center'}>
                                <Typography color={'grey'}>Category</Typography>
                            </TableCell>
                            <TableCell align={'center'}>
                                <Typography color={'grey'}>Price per unit</Typography>
                            </TableCell>
                            <TableCell align={'center'}>
                                <Typography color={'grey'}>Stock</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {shouldShowEmptyState ?
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{py: '4rem'}}>
                                        <Typography variant="h6" color="secondary">
                                            You don't have offers yet
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                :
                                <>
                                    {offers.map((offer) => <OffersListItem key={offer.id} offer={offer}
                                                                           onDeleted={triggerScrollToBottom}/>)}
                                </>
                            }
                        </>
                    </TableBody>
                </Table>
                <>
                    {data.totalPages > 1 &&
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: '1rem',
                        }}>
                            <Pagination
                                count={data.totalPages}
                                color={'secondary'}
                                page={currentPage}
                                onChange={(_, page) => {
                                    setCurrentPage(page)
                                    triggerScrollToBottom()
                                }}
                            />
                        </Box>
                    }
                </>
            </Paper>
            <div ref={bottomRef}/>
        </>
    );
};

export default OffersList;