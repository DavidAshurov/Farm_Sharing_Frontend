import {Grid} from "@mui/material";
import OfferCard from "./OfferCard.tsx";
import {useGetAllOffersQuery} from "../../app/api/offerApi.ts";

interface Props {
    searchRequest: string,
    chosenCategory: string
}

const OffersGrid = ({searchRequest, chosenCategory}: Props) => {
    const {data = []} = useGetAllOffersQuery()
    return (
        <Grid container spacing={3}
              sx={{
                  p:'1rem',
              }}>
            <>
                {data.map((offer, idx) => <OfferCard key={idx} offer={offer}/>)}
            </>
        </Grid>
    );
};

export default OffersGrid;