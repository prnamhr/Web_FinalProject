import{ useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const Pin = ({ post, imageSize }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getImageHeight = () => {
        switch (imageSize) {
            case 'small':
                return 100;
            case 'medium':
                return 200;
            case 'large':
                return 300;
            default:
                return 140;
        }
    };

    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* CardMedia component to display the post image */}
            <CardMedia
                component="img"
                alt={post.title}
                height={getImageHeight()}
                image={post.photo_url}
            />
            {isHovered && (
                <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2">{post.description}</Typography>
                    <Typography variant="caption">{post.board_name}</Typography>
                </CardContent>
            )}
        </Card>
    );
};

export default Pin;
