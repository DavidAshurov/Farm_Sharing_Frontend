import {Grid} from "@mui/material";
import {offers} from "../../utils/constants.ts";
import OfferCard from "./OfferCard.tsx";

interface Props {
    searchRequest: string,
    chosenCategory: string
}

const OffersGrid = ({searchRequest, chosenCategory}: Props) => {

    // Фильтрация предложений по поисковому запросу и выбранной категории
    const filteredOffers = offers.filter(offer => {

        // Фильтр по категории (если выбрано "All products", показываем все)
        const categoryMatch = chosenCategory === 'All products' ||
            offer.category === chosenCategory;

        // Фильтр по поисковому запросу (ищем в заголовке и описании)
        const searchMatch = searchRequest === '' ||
            offer.title.toLowerCase().includes(searchRequest.toLowerCase()) ||
            offer.description.toLowerCase().includes(searchRequest.toLowerCase());

        return categoryMatch && searchMatch;
    });
// Возвращаем отфильтрованные предложения в виде карточек
    return (
        <Grid container spacing={3}
              sx={{
                  p:'1rem',
              }}>
            <>
                {filteredOffers.map((offer, idx) => <OfferCard key={idx} offer={offer}/>)}
            </>
        </Grid>
    );
};

export default OffersGrid;


// const OffersGrid = ({searchRequest, chosenCategory}: Props) => {
//     return (
//         <Grid container spacing={3}
//               sx={{
//                   p:'1rem',
//               }}>
//             <>
//                 {offers.map((offer, idx) => <OfferCard key={idx} offer={offer}/>)}
//             </>
//         </Grid>
//     );
// };
//
// export default OffersGrid;