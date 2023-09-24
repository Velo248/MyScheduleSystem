import MyIcon from "../../icon/MyIcon"
import { 
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Avatar,
    IconButton,
    Typography,
    Button,
} from "@mui/material";

const MyCard = () => {
    return (
        <Card>
            <CardHeader
                avatar={<Avatar sx={avatarStyle}>T</Avatar>}
                action={<IconButton><MyIcon name="pencil" /></IconButton>}
            />
            <CardMedia
                component="img"
                height="200"
                image=""
            />
            <CardContent>
                <Typography 
                    color="text.secondary"
                >
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardContent>
                <Button><MyIcon name='heart' /></Button>
                <Button><MyIcon name='expand' /></Button>
            </CardContent>
        </Card>
    )
}

const avatarStyle = {
    bgColor: 'red[500]',
}

export default MyCard