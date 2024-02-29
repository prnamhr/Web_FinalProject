import { useState, useEffect } from 'react';
import { Card, CardMedia, Button } from '@mui/material';

const Pin = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [newRandomHeight, setNewRandomHeight] = useState('');

    useEffect(() => {
        // Construct the complete URL for the image based on your Firebase Storage configuration
        const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/';
        const imageUrl = `${storageUrl}${encodeURIComponent(post.photo_content)}?alt=media`;
        setImageSrc(imageUrl);

        const sizes = [400, 260, 320];
        const randomHeight = sizes[Math.floor(Math.random() * sizes.length)];
        setNewRandomHeight(randomHeight);

    }, [post.photo_content]);


    return (
        <div
            className="pin"
            style={{
                marginBottom: '15px',
                position: 'relative',
                borderRadius: '40px',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card style={{ borderRadius: '20px', position: 'relative' }}>
                <CardMedia
                    component="img"
                    height={newRandomHeight}
                    image={imageSrc}
                />
                {isHovered && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            borderRadius: '20px',
                            background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start',
                            padding: '10px',
                        }}
                    >
                        <Button
                            variant="contained"

                            style={{
                                borderRadius: '120px',
                                backgroundColor:'#8e3b13'
                            }}
                        >
                            Save
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Pin;
