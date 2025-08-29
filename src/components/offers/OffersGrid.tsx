import {CircularProgress, Grid, Typography} from "@mui/material";
import OfferCard from "./OfferCard.tsx";
import {useGetAllOffersQuery} from "../../app/api/offerApi.ts";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface Props {
    searchRequest: string,
    chosenCategory: string
}

const OffersGrid = ({searchRequest, chosenCategory}: Props) => {
    const {data = [], isLoading, error} = useGetAllOffersQuery()

    if (isLoading) return <CircularProgress color={"secondary"} size={'5rem'} sx={{mt: '8rem'}}/>

    return (
        <>
            {data.length === 0 ?
                <>
                    <Typography
                        variant={'h3'}
                        mt={'8rem'}
                        color={"secondary"}
                    >
                        No products found
                    </Typography>
                    <SentimentVeryDissatisfiedIcon color={"secondary"} fontSize={"large"}/>
                </>
                :
                <Grid container spacing={3}
                      sx={{
                          p: '1rem',
                      }}>
                    <>
                        {data.map((offer, idx) => <OfferCard key={idx} offer={offer}/>)}
                    </>
                </Grid>
            }
        </>
    );
};

export default OffersGrid;