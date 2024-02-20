import { useState, useEffect } from 'react';
import { Card, CardMedia } from '@mui/material';

const Pin = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [newRandomHeight, setNewRandomHeight] = useState(''); // State to store random height

    useEffect(() => {
        // Construct the complete URL for the image based on your Firebase Storage configuration
        const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/';
        const imageUrl = `${storageUrl}${encodeURIComponent(post.photo_content)}?alt=media`;
        setImageSrc(imageUrl);

        const sizes = [400, 450, 500,300,350];
        const randomHeight = sizes[Math.floor(Math.random() * sizes.length)];
        setNewRandomHeight(randomHeight);

    }, [post.photo_content]);

    return (
        <div className="pin" style={{ marginBottom: '15px' }}>
            <Card
                style={{ borderRadius: '20px' }}>
                <CardMedia
                    component="img"
                    height={newRandomHeight}
                    image={imageSrc}

                />
            </Card>
        </div>
    );
};

export default Pin;
