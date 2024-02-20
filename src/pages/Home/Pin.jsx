import { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const Pin = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        // Construct the complete URL for the image based on your Firebase Storage configuration
        const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/';
        const imageUrl = `${storageUrl}${encodeURIComponent(post.photo_content)}?alt=media`;
        setImageSrc(imageUrl);
    }, [post.photo_content]);

    return (
        <Card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardMedia
                component="img"
                height={isHovered ? 300 : 140}
                image={imageSrc}
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
