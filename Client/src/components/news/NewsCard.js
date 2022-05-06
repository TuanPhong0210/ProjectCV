import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from '@mui/material';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';


export default function NewsCard({ news }) {
  return (
    <Card sx={{
      height: {xs:'auto', sm: '37vh'},
      maxWidth: '100%',
      borderRadius: 0,
      boxShadow: 'none',
      filter: 'grayscale(1)',
      transition: 'filter 0.3s',
      ':hover': {
        filter: 'grayscale(0)',
      }
    }}>
      <Link href={`/news/${news.slug}`}>
        <CardMedia sx={{
          height: {xs:'35vh', sm: '30vh'},
        }}
          component="img"
          alt={news.title}

          image={`${process.env.REACT_APP_IMAGE_URL}/${news.image}`}
        />
      </Link>
      <CardContent sx={{ padding: "4px 0" }}>
        <CardActions sx={{ padding: "0" }}>
          <Link href={`/news/${news.slug}`} sx={{
            color: '#000000',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontWeight: '300',
            fontSize: '12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth:'100%',
            
            textJustify: 'distribute',
            lineHeight: '16px',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '2',
            ":hover": {
              color: '#6D6D6D'
            }
          }}>{news.title}</Link>
        </CardActions>
        {/* <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '10px',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: {xs: '2', lg: '3'},
            overflow: 'hidden',
            textAlign: 'justify',
            textJustify: 'distribute'
          }}>
          <div dangerouslySetInnerHTML={{ __html: `${news.description}` }}></div>
        </Typography> */}
         <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '10px',
            display: {xs: 'none', xl: '-webkit-box'},
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '3',
            overflow: 'hidden',
            textAlign: 'justify',
            textJustify: 'distribute'
          }}>
          <div dangerouslySetInnerHTML={{ __html: `${news.description}` }}></div>
        </Typography>
      </CardContent>
    </Card>
  );
}

NewsCard.propTypes = {
  news: PropTypes.object.isRequired
};
