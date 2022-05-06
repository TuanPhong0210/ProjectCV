import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const BannerArrow = styled('button')(({ side }) => ({
    width: '50px',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
    top: '0',
    left: side === 'back' ? 0 : 'calc(100% - 50px)',
    outline: 'none',
    border: 'none',
    zIndex: 99,
    opacity: 0,
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: 'rgba(255,255,255,0.8)'
    }
}));
const CustomeBannerArrow = ({ currentSlide, slideCount, side, children, ...props }) => {
    return (
        <BannerArrow side={side} {...props}>
            {children}
        </BannerArrow>
    );
};

const Dots = styled('ul')({
    display: 'flex',
    position: 'absolute',
    left: 'calc(50% - 25px)',
    bottom: '20px'
});

const Dot = styled('div')({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    margin: '0 5px',
    backgroundColor: 'rgba(255,255,255,0.3)',
    cursor: 'pointer'
});

// Banners
export const settingBanners = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2500,
    prevArrow: <CustomeBannerArrow side='back'><ArrowBackIosOutlined /></CustomeBannerArrow>,
    nextArrow: <CustomeBannerArrow side='forward'><ArrowForwardIosOutlined /></CustomeBannerArrow>,
    appendDots: dots => (
        <Dots>
            {dots}
        </Dots>
    ),
    customPaging: i => (
        <Dot />
    )
}
