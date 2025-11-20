import {Box, CircularProgress, Grid, Pagination, Typography} from "@mui/material";
import OfferCard from "./OfferCard.tsx";
import {useGetAllOffersQuery} from "../../app/api/offerApi.ts";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {useEffect, useState} from "react";
import ErrorPage from "../../shared/ErrorPage.tsx";

interface Props {
    offersRequestParams:OffersRequest,
}

const OffersGrid = ({offersRequestParams}: Props) => {
    const [currentPage,setCurrentPage] = useState(1)

    useEffect(() => {
        setCurrentPage(1)
    }, [offersRequestParams]);

    const {data = {} as OffersResponse, isFetching} = useGetAllOffersQuery({
        ...offersRequestParams,
        pageNumber: currentPage - 1,
    })
    const firstOfferNumberOnPage = data.pageNumber * data.pageSize + 1
    const lastOfferNumberOnPage = data.pageNumber * data.pageSize + data.numberOfElements

    if (isFetching) return <CircularProgress color={"secondary"} size={'5rem'} sx={{mt: '8rem'}}/>

    return (
        <>
            {data.offers.length === 0 ?
                <ErrorPage message={'No products found'}/>
                :
                <>
                    <Typography color={'grey'} align={"left"} p={'1rem 0 0 1rem'}>
                        Showing {firstOfferNumberOnPage}-{lastOfferNumberOnPage} of {data.totalElements}
                    </Typography>
                    <Grid container spacing={3}
                          sx={{
                              p: '1rem',
                          }}>
                        <>
                            {data.offers.map((offer, idx) => <OfferCard key={idx} offer={offer}/>)}
                        </>
                    </Grid>
                    <Box
                        sx={{
                            display:'flex',
                            justifyContent:'center',
                            my:'1rem'
                        }}>
                        <Pagination
                            count={data.totalPages}
                            size={"large"}
                            color={"secondary"}
                            page={currentPage}
                            onChange={(_, page) => setCurrentPage(page)}
                        />
                    </Box>
                </>
            }
        </>
    );
};

export default OffersGrid;