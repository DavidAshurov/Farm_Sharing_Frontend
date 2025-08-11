import type {Dispatch, SetStateAction} from "react";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    InputBase,
    Typography
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GradeIcon from "@mui/icons-material/Grade";
import {useState} from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    offer: Offer,
}

const CardExtraInfo = ({open, setOpen, offer}: Props) => {
    const [amount, setAmount] = useState(1)

    const handleInputChange = (event) => {
        const val = event.target.value
        if (/^\d*$/.test(val)) {
            if (val === '' || parseInt(val) === 0) {
                setAmount(1)
            } else if (parseInt(val) >= offer.amount) {
                setAmount(offer.amount)
            } else {
                setAmount(parseInt(val))
            }
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle fontWeight={"bold"}>
                {offer.title}
                <IconButton
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 3,
                        top: 3,
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box display={{xs:'block',sm:'flex'}} gap={2}>
                    <Box width={'50%'}>
                        <img alt={'product image'} src={'/src/assets/card image.jpg'}
                             style={{
                                 width: "100%",
                                 borderRadius: '1rem',
                             }}/>
                    </Box>
                    <Box width={'50%'}>
                        <Box pb={'1rem'} borderBottom={'1px solid #C7C2C1'}>
                            <Box display={"flex"} alignItems={"center"} color={'grey'} gap={1} mb={'1rem'}>
                                <PersonIcon fontSize={"small"}/>
                                <Typography fontWeight={"bold"}>{offer.farm.nickname}</Typography>
                            </Box>
                            <Box display={"flex"} alignItems={"center"} color={'grey'} gap={1} mb={'1rem'}>
                                <LocationOnOutlinedIcon fontSize={"small"}/>
                                <Typography>{offer.farm.city}</Typography>
                            </Box>
                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                <GradeIcon fontSize={"small"} sx={{color: '#f9ca09'}}/>
                                <Typography fontWeight={"bold"}>{offer.farm.rating}</Typography>
                            </Box>
                        </Box>
                        <Box py={'1rem'} borderBottom={'1px solid #C7C2C1'}>
                            <Typography mb={'0.5rem'} fontWeight={"bold"}>Description</Typography>
                            <Typography variant={'body2'} color={'grey'}>{offer.description}</Typography>
                        </Box>
                        <Box>
                            <Box display={"flex"} gap={1} alignItems={"baseline"} py={'1rem'}>
                                <Typography color={"secondary"} variant={'h4'} fontWeight={"bold"}>
                                    ₪{offer.price}
                                </Typography>
                                <Typography color={'grey'}>
                                    per {offer.units}
                                </Typography>
                            </Box>
                            <Box display={"flex"} gap={2} alignItems={"center"}>
                                <Typography fontWeight={"bold"}>Quantity:</Typography>
                                <ButtonGroup sx={{
                                    border: '1px solid #C7C2C1',
                                    height: '1.8rem',
                                    borderRadius: '0.5rem',
                                }}>
                                    <Button
                                        disabled={amount <= 1}
                                        onClick={() => setAmount(prev => Math.max(1, prev - 1))}
                                        sx={{
                                            color: 'black',
                                            minWidth:'1rem',
                                            p:'0',
                                            '&:hover': {
                                                backgroundColor: '#FFF9E8',
                                                borderColor: 'black'
                                            }
                                        }}>
                                        <RemoveIcon fontSize={'small'}/>
                                    </Button>
                                    <InputBase
                                        value={amount}
                                        onChange={handleInputChange}
                                        inputProps={{
                                            style: {
                                                width: '2.5rem',
                                                textAlign: "center",
                                                padding:'3px'
                                            }
                                        }}
                                    />
                                    <Button
                                        onClick={() => setAmount(prev => Math.min(prev + 1,offer.amount))}
                                        disabled={amount >= offer.amount}
                                        sx={{
                                            color: 'black',
                                            minWidth:'1rem',
                                            p:'0',
                                            '&:hover': {
                                                backgroundColor: '#FFF9E8',
                                                borderColor: 'black'
                                            }
                                        }}>
                                        <AddIcon fontSize={'small'}/>
                                    </Button>
                                </ButtonGroup>
                            </Box>
                            <Typography mt={'0.5rem'} ml={'6.5rem'} color={'grey'} fontSize={"small"}>
                                Available: {offer.amount}
                            </Typography>
                            <Typography my={'1rem'} fontWeight={"bold"}>Total: ₪{amount*offer.price}</Typography>
                            <Button
                                sx={{
                                    backgroundColor: `#4b9b4b`,
                                    borderRadius:'8px',
                                    px:'20px',
                                    py:'10px',
                                    width:'100%',
                                    fontWeight:'bold',
                                    '&:hover': {
                                        backgroundColor:'secondary.dark'
                                    }
                                }}>
                                <ShoppingCartOutlinedIcon fontSize={"small"}/>
                                Add {amount} to cart
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CardExtraInfo;