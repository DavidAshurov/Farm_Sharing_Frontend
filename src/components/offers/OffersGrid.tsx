import {Grid} from "@mui/material";
import {offers} from "../../utils/constants.ts";
import OfferCard from "./OfferCard.tsx";

interface Props {
    searchRequest: string,
    chosenCategory: string
}

const OffersGrid = ({searchRequest, chosenCategory}: Props) => {
    return (
        <Grid container spacing={3}
              sx={{
                  p:'1rem',
              }}>
            <>
                {offers.map((offer, idx) => <OfferCard key={idx} offer={offer}/>)}
            </>
        </Grid>
    );
};

export default OffersGrid;