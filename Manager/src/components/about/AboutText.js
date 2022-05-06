import { useState, useEffect, useRef } from 'react';
import { Container, Button } from '@mui/material';

// apis
import aboutApi from '../../apis/aboutApi';
// editor
import QuillEditor from '../editor/quill';
// hooks
import useSnackbar from '../../hooks/useSnackbar';

const AboutText = () => {
    const { setSnackbar } = useSnackbar();
    const [text, setText] = useState('');
    const textRef = useRef(null);
    useEffect(() => {
        const getAbout = async () => {
            const about = await aboutApi.findByKey();
            const text = about?.text || '';
            setText(text);
        };
        getAbout();
    }, []);
    const handleChange = value => {
        // Debounce
        if (textRef.current) clearTimeout(textRef.current);
        textRef.current = setTimeout(() => {
            setText(value);
        }, 500);
    };
    const handleSubmit = async () => {
        const res = await aboutApi.edit(text);
        const { statusText, message } = res;
        setSnackbar({
            isOpen: true,
            type: statusText,
            message: message,
            anchor: 'bottom-center'
        });
    };
    return (
        <Container>
            <QuillEditor
                id='about-text'
                value={text}
                onChange={handleChange}
            />
            <Button
                variant='contained'
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit}
            >
                Lưu
            </Button>
        </Container>
    );
};

export default AboutText;
