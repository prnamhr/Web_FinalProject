import { useState, useEffect } from 'react';
import { Card, CardMedia, Button } from '@mui/material';
import {useParams} from "react-router-dom";


const Pin = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [newRandomHeight, setNewRandomHeight] = useState('');
    const [isSaved, setIsSaved] = useState(true);
    const [userData, setUserData] = useState(null);
    const [username,setUsername] =useState();
    const handleSave = async () => {
        if(!userData.user_id){
            return;
        }
        const requestBody = {
            user_id:userData.user_id
        };
        try {

            const response = await fetch(`http://localhost:3000/post/${post.post_id}/savePost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to update follow status');
            }

            const save = await response.json();


            setIsSaved(save.isFollowing);
        } catch (error) {
            console.error('Error updating follow status:', error);
        }
    };

    useEffect(() => {
        console.log(post)
        // Construct the complete URL for the image based on your Firebase Storage configuration
        const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/images-a532a.appspot.com/o/';
        const imageUrl = `${storageUrl}${encodeURIComponent(post.photo_content)}?alt=media`;
        setImageSrc(imageUrl);

        const sizes = [400, 260, 320];
        const randomHeight = sizes[Math.floor(Math.random() * sizes.length)];
        setNewRandomHeight(randomHeight);

    }, [post.photo_content]);

    useEffect(() => {
        const userAuth= JSON.parse(localStorage.getItem("userAuth"))
        setUsername(userAuth.username)
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/${userAuth.username}/finduser`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data[0])
                const saveResponse = await fetch(`http://localhost:3000/post/${data[0].user_id}/${post.post_id}/isSaved`);
                if (!saveResponse.ok) {
                    throw new Error('Failed to fetch follow status');
                }

                const saveData = await saveResponse.json();
                console.log(saveData)
                setIsSaved(saveData.isSaved);

            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [post.post_id]);
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
                                backgroundColor: isSaved ? '#c6815a' : '#8e3b13',
                            }}
                            onClick={handleSave}
                        >
                            {isSaved ? 'saved' : 'save'}
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Pin;